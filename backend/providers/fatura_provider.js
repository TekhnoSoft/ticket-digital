const Sorteio = require('../models/sorteio');
const Bilhete = require('../models/bilhete');
const Fatura = require('../models/fatura');
const Utils = require('../utils');
const SorteioParceiro = require('../models/sorteio_parceiro');
var axios = require("axios");
const { payPixMercadoPago } = require('../providers/marcado_pago');
require('dotenv').config();

const asaasUri = process.env.ASAAS_API_URI;
const apiKey = process.env.ASAAS_API_KEY;
const User = require('../models/users');

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

const payPix = async ({ customer, fatura, description }) => {
    try {
        let total = fatura?.total + fatura?.taxa_cliente;

        const response = await axios.post(asaasUri + 'v3/payments/', {
            billingType: 'PIX',
            customer: customer,
            value: Number(total),
            dueDate: Utils.getFutureDate(process.env.PIX_FATURA_DIAS_VENCIMENTO),
            description: description,
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

const createFatura = async ({ user_id, sorteio_id, id_remessa, valor, tipo = "BILHETE" }) => {
    try {
        const agora = Utils.getDateNow();

        const user = await User.findOne({ where: { id: user_id } })
        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id } })
        const sorteioParceiro = await SorteioParceiro.findOne({ where: { user_id: sorteio?.user_id } })

        let bilhetesCount = null;

        switch(tipo){
            case "BILHETE":
                bilhetesCount = await Bilhete.count({ where: { id_remessa } })
                break;
            case "CAMPANHA":
                bilhetesCount = 1;
                break;
        }

        let customer = await getCustomer(user?.cpf);

        if (customer == null) {
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
            operadora: sorteioParceiro?.operadora,
            taxa_cliente: sorteioParceiro?.taxa_cliente,
            quantidade: bilhetesCount,
            taxa_afiliado: 0,
            tipo: tipo,
        }

        const novaFatura = await Fatura.create(faturaObject);

        let pay = null;
        let id_payment_response = null;
        let qr_code_payment_image = null;
        let qr_code_payment_barcode = null;

        switch (sorteioParceiro?.operadora) {
            case "ASAAS":
                pay = await payPix({
                    customer: customer,
                    fatura: faturaObject,
                    description: `${bilhetesCount}x - ${sorteio?.name}`
                })
                id_payment_response = pay?.id;
                qr_code_payment_image = pay?.encodedImage;
                qr_code_payment_barcode = pay?.payload;
                break;
            case "MERCADOPAGO":
                let total = Number(faturaObject?.total) + Number(faturaObject?.taxa_cliente);
                pay = await payPixMercadoPago({
                    valor: total,
                    description: `${bilhetesCount}x - ${sorteio?.name}`,
                    email: user?.email,
                    operadoraAccessToken: tipo == "BILHETE" ? sorteioParceiro?.operadoraAccessToken : process.env.MERCADO_PAGO_ACESS_TOKEN
                })
                id_payment_response = pay?.id;
                qr_code_payment_image = pay?.point_of_interaction?.transaction_data?.qr_code_base64;
                qr_code_payment_barcode = pay?.point_of_interaction?.transaction_data?.qr_code;
                break;
        }

        if (pay != null) {
            await Fatura.update(
                {
                    id_payment_response: id_payment_response,
                    qr_code_payment_image: qr_code_payment_image,
                    qr_code_payment_barcode: qr_code_payment_barcode
                },
                {
                    where: { id: novaFatura?.id }
                },
            );
        }

        return novaFatura;
    } catch (error) {
        console.error('Erro ao criar fatura:', error);
        throw error;
    }
};

module.exports = { createFatura }