require('dotenv').config();

const bilheteThread = require("./micro-services/bilhete");
const faturaThread = require("./micro-services/fatura");
const paymentThread = require('./micro-services/payment');

bilheteThread();
faturaThread();
paymentThread();
