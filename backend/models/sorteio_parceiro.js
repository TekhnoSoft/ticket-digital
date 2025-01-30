const Sequelize = require('sequelize');
const database = require('../database');

const SorteioParceiro = database.define('tb_sorteio_parceiros', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    taxa_cliente: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    operadora: {
        type: Sequelize.ENUM(
            "",
            "ASAAS", 
            "MERCADOPAGO",
            "PAGGUE",
        ),
        allowNull: true,
        defaultValue: ""
    },
    operadoraAccessToken: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    operadoraPublicKey:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    operadoraClientKey:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    operadoraSecretKey:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    enterprise_name: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    colorPrimary: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    whatsappLink: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    facebookLink: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    youtubeLink: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    instagramLink: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    tiktokLink: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    telegramLink: {
        type: Sequelize.TEXT,
        allowNull: true
    },
});

module.exports = SorteioParceiro;
