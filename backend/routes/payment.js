const express = require('express');
const router = express.Router();

const Bilhete = require('../models/bilhete');
const Fatura = require('../models/fatura');
const Sorteio = require('../models/sorteio');
const SorteioParceiro = require('../models/sorteio_parceiro');

var axios = require("axios");
require('dotenv').config();

router.post('/payment-received', async (req, res) => {
    try {
        await paymentReceived(req.body);
        return res.status(200).json({ success: true, code: 200, message: "Webhook sincronizado!", data: null });
    } catch (err) {
        return res.status(200).json({ success: false, code: 400, message: err.message, data: null });
    }
})

router.post('/payment-received-mercadopago', async (req, res) => {
    try {
        await paymentReceivedMercadoPago(req.body);
        return res.status(200).json({ success: true, code: 200, message: "Webhook sincronizado!", data: null });
    } catch (err) {
        return res.status(200).json({ success: false, code: 400, message: err.message, data: null });
    }
})

const paymentReceived = async (data) => {

    let id = data?.payment?.id;
    let status = data?.payment?.status;

    if (status == "RECEIVED") {

        await Fatura.update(
            {
                status: "PAGO",
            },
            {
                where: { id_payment_response: id }
            },
        );

        const fatura = await Fatura.findOne({ where: { id_payment_response: id } })

        await Bilhete.update(
            {
                status: "PAGO",
            },
            {
                where: { id_remessa: fatura?.id_remessa }
            },
        );
    }

}

const paymentReceivedMercadoPago = async (data) => {
    try {
        const paymentId = data?.data?.id;

        if (!paymentId) {
            throw new Error("ID do pagamento não encontrado!");
        }

        const fatura = await Fatura.findOne({ where: { id_payment_response: paymentId } });
        const sorteio = await Sorteio.findOne({ where: { id: fatura?.sorteio_id } });
        const sorteioParceiro = await SorteioParceiro.findOne({ where: { user_id: sorteio?.user_id } });

        const url = `${process.env.MERCADO_PAGO_PAYMENT_URI}${paymentId}`;
        const token = sorteioParceiro?.operadoraAccessToken;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const status = response.data?.status;

        if (status == "approved") {

            await Fatura.update(
                {
                    status: "PAGO",
                },
                {
                    where: { id_payment_response: paymentId }
                },
            );

            await Bilhete.update(
                {
                    status: "PAGO",
                },
                {
                    where: { id_remessa: fatura?.id_remessa }
                },
            );

        }
    }catch(err){
        console.log(err);
    }
}

module.exports = router;