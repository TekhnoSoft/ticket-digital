const Sequelize = require('sequelize');
const database = require('../database');

const PagamentoOperadora = database.define('tb_pagamento_operadoras', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    keybind:{
        type: Sequelize.TEXT,
        allowNull: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    taxas_uri: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    logo_uri: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    selecionado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    tutorial_text:{
        type: Sequelize.TEXT,
        allowNull: true,
    },
    tutorial_cta:{
        type: Sequelize.TEXT,
        allowNull: true,
    },
    field_client_key:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    field_secret_key:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    field_public_key:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    field_access_token:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    warning_text:{
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = PagamentoOperadora;
