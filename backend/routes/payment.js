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

const paymentReceived = async (data) => {
    let id = data?.payment?.id;
    let status = data?.payment?.status;
    let comprovante = data?.payment?.transactionReceiptUrl;
    let subscription = data?.payment?.subscription;
    let billingType = data?.payment?.billingType;

    if (subscription == null) {
        if (billingType == "CREDIT_CARD") {
            if (status == "PAYMENT_CONFIRMED" || status == "CONFIRMED") {
                let externalReference = Number(data?.payment?.externalReference);

                await Fatura.update(
                    {
                        status: "PAGO",
                    },
                    {
                        where: { id_remessa: externalReference }
                    },
                );

                await Bilhete.update(
                    {
                        status: "PAGO",
                    },
                    {
                        where: { id_remessa: externalReference }
                    },
                );

                console.log("aqui 1");
                console.log(externalReference);
                console.log(id);
            }
        } else {
            if (status == "RECEIVED") {
                let externalReference = Number(data?.payment?.externalReference);
                console.log("aqui 2");
                console.log(externalReference);
                console.log(id);
            }
        }
    } else {
        if (status == "RECEIVED") {
            let externalReference = Number(data?.payment?.externalReference);
            console.log("aqui 3");
            console.log(externalReference);
            console.log(id);
        }
    }

}

module.exports = router;