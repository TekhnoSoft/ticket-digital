const Sequelize = require('sequelize');
const database = require('../database');

const Socio = database.define('tb_socios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo:{
        type: Sequelize.ENUM("SOCIO", "AFILIADO", "INFLUENCER"),
        allowNull: false,
        defaultValue: "SOCIO"
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pix_chave: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    efi_client_id: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    efi_client_secret: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    password_hash:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    percentage_share:{
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});

module.exports = Socio;
