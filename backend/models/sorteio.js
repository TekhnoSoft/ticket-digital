const Sequelize = require('sequelize');
const database = require('../database');

const Sorteio = database.define('tb_sorteios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    keybind: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.ENUM("SISTEMA_ESCOLHE", "USUARIO_ESCOLHE"),
        allowNull: false,
        defaultValue: "SISTEMA_ESCOLHE"
    },
    status: {
        type: Sequelize.ENUM("AGUARDANDO_ATIVACAO", "ATIVO", "FINALIZADO", "CANCELADO"),
        allowNull: false,
        defaultValue: "AGUARDANDO_ATIVACAO"
    },
    sorteio_regras_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    valor_por_bilhete: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    sorteio_informacoes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sorteio_categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_bilhete_sorteado: {
        type: Sequelize.STRING,
        allowNull: true
    },
    prazo_pagamento: {
        type: Sequelize.ENUM("5MIN", "10MIN", "15MIN", "30MIN", "1H", "5H", "10H", "24H"),
        allowNull: false,
        defaultValue: "5MIN"
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Sorteio;
