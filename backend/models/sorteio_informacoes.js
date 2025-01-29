const Sequelize = require('sequelize');
const database = require('../database');

const SorteioInformacoes = database.define('tb_sorteio_informacoes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    link: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    telefone_contato: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    data_sorteio:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    btn_1_cota:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    btn_2_cota:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    btn_3_cota:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    btn_4_cota:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    btn_5_cota:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    btn_6_cota:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    btn_popular:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    maximo_cota_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    minimo_cota_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    anuncio_text: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = SorteioInformacoes;
