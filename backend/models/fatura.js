const Sequelize = require('sequelize');
const database = require('../database');
const Bilhete = require('./bilhete');

const Fatura = database.define('tb_faturas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    id_remessa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM(
            "AGUARDANDO_PAGAMENTO", 
            "CANCELADO", 
            "PAGO", 
        ),
        allowNull: false,
        defaultValue: "AGUARDANDO_PAGAMENTO"
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    desconto: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    data_compra: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    id_payment_response: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    qr_code_payment_image: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
    },
    qr_code_payment_barcode: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
    }
});

module.exports = Fatura;
