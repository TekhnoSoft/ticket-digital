const express = require('express');
const Sorteio = require('../models/sorteio');
const SorteioRegras = require('../models/sorteio_regras');
const SorteioCategoria = require('../models/sorteio_categorias');
const Bilhete = require('../models/bilhete');
const Fatura = require('../models/fatura');
const SorteioImagens = require("../models/sorteio_imagens");
const { validateOrigin } = require('../middlewares/CorsMiddleware');
const Utils = require('../utils');
const { Op, Sequelize, where } = require('sequelize');
const router = express.Router();
const database = require('../database');
const SorteioInformacoes = require('../models/sorteio_informacoes');
const { createFatura } = require('../providers/fatura_provider');
const SorteioPublicacaoPrecos = require('../models/sorteio_publicacao_precos');
const SorteioParceiro = require('../models/sorteio_parceiro');
const EmailFila = require('../models/email_fila');
const { validateToken } = require('../middlewares/AuthMiddleware');
require('dotenv').config();

router.get('/get-fatura-by-remessa/:id_remessa', validateOrigin, async (req, res) => {
    const { id_remessa } = req.params;
    try {
        const fatura = await Fatura.findOne({ where: { id_remessa: id_remessa } });

        if (!fatura) {
            return res.status(404).json(null);
        }

        return res.status(200).json(fatura);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/get-by-keybind/:keybind', validateOrigin, async (req, res) => {
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
        const sorteioImagemLogo = await SorteioImagens.findOne({
            where: { sorteio_id: sorteio.id, tipo: 'LOGO' },
            attributes: ['id']
        });
        const sorteioParceiro = await SorteioParceiro.findOne({
            where: { user_id: sorteio.user_id },
            attributes: ['whatsappLink', 'facebookLink', 'youtubeLink', 'instagramLink', 'tiktokLink', 'telegramLink', 'enterprise_name', 'colorPrimary']
        });

        if (sorteioInformacoes) {
            const sorteioPlano = sorteio.toJSON();
            sorteioPlano.info = sorteioInformacoes;
            sorteioPlano.imagens = sorteioImagens;
            sorteioPlano.regra = sorteioRegras[0];
            sorteioPlano.parceiro = sorteioParceiro;
            sorteioPlano.logo = sorteioImagemLogo;

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
    try {
        let { sorteio_id, quantidade, user_id } = req.body;

        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id } });
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
                numero_texto: numeros[i].numero_valor,
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
            await Bilhete.bulkCreate(bilhetes, { validate: true });
        }

        await createFatura({
            user_id: user_id,
            sorteio_id: sorteio_id,
            id_remessa: id_remessa,
            valor: numeros.length * valorUnitarioCota,
        });

        return res.status(201).json({
            quantidade: numeros.length,
            valor: numeros.length * valorUnitarioCota,
            id_remessa: id_remessa,
            //numeros: numeros,
        });

    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post('/reservar-bilhete-selecionado', validateOrigin, async (req, res) => {
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
            }
        });

        if (bilhetesCompradosOuIndisponiveis.length > 0) {
            const jaReservados = bilhetesCompradosOuIndisponiveis.map(b => b.numero);
            return res.status(400).json({
                message: "Os seguintes números estão indisponíveis: ",
                numerosIndisponiveis: jaReservados
            });
        }

        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id } });

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
            numero_texto: numero,
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

        await Bilhete.bulkCreate(bilhetes, { validate: true });

        await createFatura({
            user_id: user_id,
            sorteio_id: sorteio_id,
            id_remessa: id_remessa,
            valor: numeros.length * valorUnitarioCota,
        });

        return res.status(201).json({
            quantidade: numeros.length,
            valor: numeros.length * valorUnitarioCota,
            id_remessa: id_remessa,
            //numeros: numeros
        });

    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/bilhetes-pagos/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {
        const bilhetes = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                status: { [Op.in]: ["PAGO"] }
            }
        });
        return res.status(200).json(bilhetes.map(b => Number(b.numero)));
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/bilhetes-reservados/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {
        const bilhetes = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                status: { [Op.in]: ["INDISPONIVEL"] }
            }
        });
        return res.status(200).json(bilhetes.map(b => Number(b.numero)));
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/rank-buyers/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {

        const query = `
            SELECT 
                B.name AS name, 
                COUNT(A.id) AS qtd 
            FROM tb_bilhetes AS A
            INNER JOIN tb_users AS B ON A.user_id = B.id
            WHERE A.sorteio_id = :sorteio_id AND A.status = 'PAGO'
            GROUP BY B.id, B.name
            ORDER BY qtd DESC, MIN(A.createdAt) ASC
            LIMIT 5;
        `;

        const resultados = await database.query(query, {
            replacements: { sorteio_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const rank = [];

        resultados.forEach((row) => {
            let obj = {
                name: row.name,
                qtd: row.qtd,
            }
            rank.push(obj);
        })

        return res.status(200).json(rank);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/rank-winners/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {

        const query = `SELECT A.*, B.name AS ganhador_nome FROM ticketdigital.tb_sorteio_premios A LEFT JOIN tb_users AS B ON A.ganhador_id=B.id WHERE A.sorteio_id=:sorteio_id ORDER BY A.colocacao ASC;`;

        const resultados = await database.query(query, {
            replacements: { sorteio_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const rank = [];

        resultados.forEach((row) => {
            let obj = {
                ganhador_nome: row.ganhador_nome,
                premio: row.name,
                colocacao: row.colocacao
            }
            rank.push(obj);
        })

        return res.status(200).json(rank);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/campanhas', validateOrigin, async (req, res) => {
    try {

        const query = `
            SELECT A.*, 
                (SELECT B.id 
                    FROM tb_sorteio_imagens AS B 
                    WHERE B.sorteio_id = A.id 
                    LIMIT 1) AS id_imagem
            FROM ticketdigital.tb_sorteios AS A
            WHERE A.status = 'ATIVO';
        `;

        const resultados = await database.query(query, {
            replacements: {},
            type: Sequelize.QueryTypes.SELECT,
        });

        const campanhas = [];

        resultados.forEach((row) => {
            let obj = {
                id_imagem: row.id_imagem,
                name: row.name,
                valor_por_bilhete: row.valor_por_bilhete,
                keybind: row.keybind
            }
            campanhas.push(obj);
        })

        return res.status(200).json(campanhas);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/bilhetes-premiados/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {

        const query = `SELECT A.*, B.name AS username FROM ticketdigital.tb_bilhete_premiados AS A LEFT JOIN tb_users AS B ON A.user_id=B.id WHERE sorteio_id=:sorteio_id`;

        const resultados = await database.query(query, {
            replacements: { sorteio_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const bilhetes = [];

        resultados.forEach((row) => {
            let obj = {
                id: row.id,
                name: row.name,
                numero: Number(row.numero),
                username: row.username,
                user_id: row.user_id
            }
            bilhetes.push(obj);
        })

        return res.status(200).json(bilhetes);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/regras', validateOrigin, async (req, res) => {
    try {
        const sorteioRegras = await SorteioRegras.findAll();
        return res.status(200).json(sorteioRegras);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/categorias', validateOrigin, async (req, res) => {
    try {
        const sorteioCategoria = await SorteioCategoria.findAll({
            order: [['nome', 'ASC']]
        });
        return res.status(200).json(sorteioCategoria);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/taxas', validateOrigin, async (req, res) => {
    try {
        const sorteioPublicacaoPrecos = await SorteioPublicacaoPrecos.findAll({
            order: [['id', 'ASC']]
        });
        return res.status(200).json(sorteioPublicacaoPrecos);
    } catch (err) {
        return res.status(500).json(err);
    }
})

/////////////////////////////////PARCEIRO///////////////////////////////////////////////

router.get('/campanha/:campanha_id/get-status', validateToken, async (req, res) => {
    let { campanha_id } = req.params;
    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id }, attributes: ['id', 'status'] })
        const fatura = await Fatura.findOne({ where: { tipo: 'CAMPANHA', sorteio_id: sorteio?.id }, attributes: ['id_remessa'] })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        return res.status(200).json({
            sorteio,
            fatura
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/campanha/:campanha_id/get-details', validateToken, async (req, res) => {
    let { campanha_id } = req.params;

    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id } })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        const sorteioInformacoes = await SorteioInformacoes.findOne({ where: { sorteio_id: sorteio.id } });

        const sorteioRegras = await SorteioRegras.findAll({
            where: { id: sorteio.sorteio_regras_id },
        });
        const sorteioImagens = await SorteioImagens.findAll({
            where: { sorteio_id: sorteio.id },
            attributes: ['id']
        });
        const sorteioImagemLogo = await SorteioImagens.findOne({
            where: { sorteio_id: sorteio.id, tipo: 'LOGO' },
            attributes: ['id']
        });
        const sorteioParceiro = await SorteioParceiro.findOne({
            where: { user_id: sorteio.user_id },
            attributes: ['whatsappLink', 'facebookLink', 'youtubeLink', 'instagramLink', 'tiktokLink', 'telegramLink', 'enterprise_name', 'colorPrimary']
        });
        const bilhetesPagos = await Bilhete.count({
            where: {
                sorteio_id: sorteio?.id,
                status: 'PAGO',
            }
        })
        const bilhetesReservados = await Bilhete.count({
            where: {
                sorteio_id: sorteio?.id,
                status: 'INDISPONIVEL',
            }
        })

        const faturas = await Fatura.count({
            where: {
                tipo: 'BILHETE',
                status: { [Op.in]: ["AGUARDANDO_PAGAMENTO", "PAGO", "CANCELADO"] },
                sorteio_id: sorteio?.id
            }
        })

        const usuarios = await Fatura.count({
            where: {
                tipo: 'BILHETE',
                status: { [Op.in]: ["AGUARDANDO_PAGAMENTO", "PAGO", "CANCELADO"] },
                sorteio_id: sorteio?.id
            },
            distinct: true,
            col: 'user_id'
        });

        if (sorteioInformacoes) {
            const sorteioPlano = sorteio.toJSON();
            sorteioPlano.info = sorteioInformacoes;
            sorteioPlano.imagens = sorteioImagens;
            sorteioPlano.regra = sorteioRegras[0];
            sorteioPlano.parceiro = sorteioParceiro;
            sorteioPlano.logo = sorteioImagemLogo;
            sorteioPlano.pagos = Number(bilhetesPagos);
            sorteioPlano.reservas = Number(bilhetesReservados);
            sorteioPlano.nFaturas = Number(faturas);
            sorteioPlano.usuarios = Number(usuarios);

            return res.status(200).json(sorteioPlano);
        } else {
            return res.status(404).json(null);
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/campanha/:campanha_id/get-description', validateToken, async (req, res) => {
    let { campanha_id } = req.params;

    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id } })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        return res.status(200).json(sorteio?.description);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/campanha/update-description', validateToken, async (req, res) => {
    let { campanha_id, content } = req.body;
    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id } })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        await Sorteio.update(
            {
                description: content
            },
            {
                where: {
                    id: campanha_id,
                    user_id: user_id,
                }
            }
        )

        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;