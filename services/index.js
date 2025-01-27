require('dotenv').config();

const bilheteThread = require("./micro-services/bilhete");
const faturaThread = require("./micro-services/fatura");
const paymentThread = require('./micro-services/payment');
const emailThread = require('./micro-services/email');

bilheteThread();
faturaThread();
paymentThread();
emailThread();
