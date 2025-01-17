const express = require('express');
const Sorteio = require('../models/sorteio');
const SorteioRegras = require('../models/sorteio_regras');
const SorteioCategoria = require('../models/sorteio_categorias');
const Bilhete = require('../models/bilhete');
const Fatura = require('../models/fatura');
const SorteioImagens = require("../models/sorteio_imagens");
const { validateOrigin } = require('../middlewares/CorsMiddleware');
const Utils = require('../utils');
const { Op } = require('sequelize');
const router = express.Router();
const database = require('../database');
const SorteioInformacoes = require('../models/sorteio_informacoes');
var axios = require("axios");
require('dotenv').config();


const asaasUri = process.env.ASAAS_API_URI;
const apiKey = process.env.ASAAS_API_KEY;
const wallet_id = process.env.ASAAS_WALLET_ID;

const https = require('https');
const User = require('../models/users');

const httpsAgent = new https.Agent({
    minVersion: 'TLSv1.3',
    maxVersion: 'TLSv1.3'
});

const getCustomer = async (cpf) => {
    try {
        const response = await axios.get(asaasUri + 'v3/customers', {
            params: {
                cpfCnpj: cpf
            },
            headers: {
                accept: 'application/json',
                access_token: apiKey
            }
        });
        return response.data?.data[0];
    } catch (error) {
        return null;
    }
};

const createCustomer = async (name, cpfCnpj, email) => {
    try {
        const response = await axios.post(asaasUri + 'v3/customers', { name: name, cpfCnpj: cpfCnpj, email: email, notificationDisabled: true }, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: apiKey
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

const getQrCodePix = async (id) => {
    try {

        const response = await axios.get(asaasUri + 'v3/payments/' + id + '/pixQrCode', {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: apiKey
            }
        });

        return response.data;
    } catch (err) {
        return null;
    }
}

const payPix = async ({ customer, fatura }) => {
    try {
        const response = await axios.post(asaasUri + 'v3/payments/', {
            billingType: 'PIX',
            customer: customer,
            value: Number(fatura?.total),
            dueDate: Utils.getFutureDate(process.env.PIX_FATURA_DIAS_VENCIMENTO),
            description: "Fatura TicketDigital",
            externalReference: fatura?.id_remessa,
            split: [],
        }, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                access_token: apiKey
            }
        });
        let data = await getQrCodePix(response.data?.id);
        data["id"] = response.data?.id
        return data;
    } catch (error) {
        console.error('Erro na chamada para a API do Asaas:', error.response?.data || error.message);
        return null;
    }
}

const createFatura = async ({ user_id, sorteio_id, id_remessa, valor, transaction }) => {
    try {
        const agora = Utils.getDateNow();

        const user = await User.findOne({ where: {id : user_id} })

        let customer = await getCustomer(user?.cpf);

        if(customer == null){
            customer = await createCustomer(user?.name, user?.cpf, user?.email);
        }

        let faturaObject = {
            user_id,
            sorteio_id,
            id_remessa,
            subtotal: valor,
            desconto: 0,
            total: valor,
            data_compra: agora,
            status: "AGUARDANDO_PAGAMENTO",
            createdAt: agora,
            updatedAt: agora,
        }

        const novaFatura = await Fatura.create(faturaObject, { transaction });

        let pay = null;

        pay = await payPix({
            customer: customer,
            fatura: faturaObject
        })

        console.log(pay)

        if(pay != null){
            await database.query(`UPDATE tb_faturas SET api_payment_response=?, id_payment_response=? WHERE id_remessa=?`, { replacements: [pay?.id, JSON.stringify(pay), id_remessa], type: Sequelize.QueryTypes.UPDATE });
        }

        return novaFatura;
    } catch (error) {
        console.error('Erro ao criar fatura:', error);
        throw error;
    }
};

router.get('/get-by-keybind/:keybind', async (req, res) => {
    const { keybind } = req.params;

    try {
        const sorteio = await Sorteio.findOne({ where: { keybind: keybind } });

        if (!sorteio) {
            return res.status(404).json(null);
        }

        const sorteioInformacoes = await SorteioInformacoes.findOne({ where: { sorteio_id: sorteio.id } });
        const sorteioRegras = await SorteioRegras.findAll({
            where: { id: sorteio.sorteio_regras_id },
        });
        const sorteioImagens = await SorteioImagens.findAll({
            where: { sorteio_id: sorteio.id },
            attributes: ['id']
        });

        if (sorteioInformacoes) {
            const sorteioPlano = sorteio.toJSON();
            sorteioPlano.info = sorteioInformacoes;
            sorteioPlano.imagens = sorteioImagens;
            sorteioPlano.regra = sorteioRegras[0];

            return res.status(200).json(sorteioPlano);
        } else {
            return res.status(404).json(null);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/imagem/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar a imagem no banco de dados pelo ID
        const imagem = await SorteioImagens.findOne({
            where: { id: id },
        });

        if (!imagem) {
            return res.status(404).send('Imagem não encontrada');
        }

        const imagemData = imagem.payload;
        let contentType = 'application/octet-stream'; // Tipo padrão

        // Detectar o tipo de imagem
        if (imagem.tipo === 'BANNER' || imagem.tipo === 'LOGO' || imagem.tipo === 'RODAPE') {
            const buffer = Buffer.from(imagemData);
            if (buffer.toString('hex', 0, 2) === 'ffd8') {
                contentType = 'image/jpeg';
            } else if (buffer.toString('hex', 0, 4) === '89504e47') {
                contentType = 'image/png';
            }
        }

        // Configurar os cabeçalhos de cache
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');  // Cache por 1 dia (24h)
        res.setHeader('Expires', new Date(Date.now() + 86400 * 1000).toUTCString());  // Data de expiração

        // Enviar a imagem
        res.send(imagemData);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar a imagem');
    }
});

router.post('/reservar-bilhete-quantidade', validateOrigin, async (req, res) => {
    const t = await database.transaction();
    try {
        let { sorteio_id, quantidade, user_id } = req.body;

        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id }, transaction: t });
        const sorteioRegras = await SorteioRegras.findOne({
            where: { id: sorteio.sorteio_regras_id },
        });

        let valorUnitarioCota = Number(sorteio?.valor_por_bilhete);

        const bilhetesCompradosOuIndisponiveis = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                status: {
                    [Op.in]: ["PAGO", "INDISPONIVEL"],
                },
            },
            transaction: t
        });

        let jaReservados = bilhetesCompradosOuIndisponiveis.map(b => b.numero);
        let numeros = Utils.sortearBilhetes(0, Number(sorteioRegras?.valor), quantidade, jaReservados);
        let id_remessa = Utils.makeid(50);

        const agora = Utils.getDateNow();

        const prazoPagamentoEmMinutos = Utils.prazoPagamentoEmMinutosMapper();
        const minutosPrazo = prazoPagamentoEmMinutos[sorteio.prazo_pagamento];
        const prazoTimestamp = agora.clone().add(minutosPrazo, 'minutes');

        if (numeros.length > 0) {
            const bilhetes = Array.from({ length: numeros.length }, (_, i) => ({
                numero: numeros[i].numero_valor,
                numero_texto: numeros[i].numero_texto,
                status: "INDISPONIVEL",
                id_remessa: id_remessa,
                flg_premiado: false,
                flg_sorteado: false,
                sorteio_id: sorteio_id,
                user_id: user_id,
                prazo_compra: prazoTimestamp,
                createdAt: agora,
                updatedAt: agora,
            }));
            await Bilhete.bulkCreate(bilhetes, { validate: true, transaction: t });
        }

        await createFatura({
            user_id: user_id,
            sorteio_id: sorteio_id,
            id_remessa: id_remessa,
            valor: numeros.length * valorUnitarioCota,
            transaction: t,
        });

        await t.commit();

        return res.status(201).json({
            quantidade: numeros.length,
            valor: numeros.length * valorUnitarioCota,
            id_remessa: id_remessa,
            //numeros: numeros,
        });

    } catch (err) {
        console.log(err);
        await t.rollback();
        return res.status(500).json(err);
    }
});

router.post('/reservar-bilhete-selecionado', validateOrigin, async (req, res) => {
    const t = await database.transaction();
    try {
        let { sorteio_id, numeros, user_id } = req.body;

        if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
            return res.status(400).json({ message: "Nenhum número fornecido." });
        }

        const bilhetesCompradosOuIndisponiveis = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                numero: { [Op.in]: numeros },
                status: { [Op.in]: ["PAGO", "INDISPONIVEL"] }
            },
            transaction: t
        });

        if (bilhetesCompradosOuIndisponiveis.length > 0) {
            const jaReservados = bilhetesCompradosOuIndisponiveis.map(b => b.numero);
            return res.status(400).json({
                message: "Os seguintes números estão indisponíveis: ",
                numerosIndisponiveis: jaReservados
            });
        }

        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id } }, { transaction: t });

        let valorUnitarioCota = Number(sorteio?.valor_por_bilhete);

        if (!sorteio) {
            return res.status(404).json({ message: "Sorteio não encontrado." });
        }

        let id_remessa = Utils.makeid(50);
        const agora = Utils.getDateNow();
        const prazoPagamentoEmMinutos = Utils.prazoPagamentoEmMinutosMapper();
        const minutosPrazo = prazoPagamentoEmMinutos[sorteio.prazo_pagamento];
        const prazoTimestamp = agora.clone().add(minutosPrazo, 'minutes');

        const bilhetes = numeros.map(numero => ({
            numero: numero,
            numero_texto: numero.toString(),
            status: "INDISPONIVEL",
            id_remessa: id_remessa,
            flg_premiado: false,
            flg_sorteado: false,
            sorteio_id: sorteio_id,
            user_id: user_id,
            prazo_compra: prazoTimestamp,
            createdAt: agora,
            updatedAt: agora,
        }));

        await Bilhete.bulkCreate(bilhetes, { validate: true, transaction: t });

        await createFatura({
            user_id: user_id,
            sorteio_id: sorteio_id,
            id_remessa: id_remessa,
            valor: numeros.length * valorUnitarioCota,
            transaction: t,
        });

        await t.commit();

        return res.status(201).json({
            quantidade: numeros.length,
            valor: numeros.length * valorUnitarioCota,
            id_remessa: id_remessa,
            //numeros: numeros
        });

    } catch (err) {
        console.log(err);
        await t.rollback();
        return res.status(500).json(err);
    }
});

module.exports = router;