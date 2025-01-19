const express = require('express');
const User = require('../models/users');
const Bilhete = require('../models/bilhete');
const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');
const Utils = require('../utils');
const { Op, Sequelize, where } = require('sequelize');
const Fatura = require('../models/fatura');
const sequelize = require('../database');
const Sorteio = require('../models/sorteio');
const SorteioImagens = require('../models/sorteio_imagens');
const router = express.Router();

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

        const fatura = await Fatura.findOne({ where: { id_payment_response: id }})

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
    console.log(data);
}

module.exports = router;