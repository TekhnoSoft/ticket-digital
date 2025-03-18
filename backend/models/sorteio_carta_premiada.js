const Sequelize = require('sequelize');
const database = require('../database');

const SorteioCartaPremiada = database.define('tb_sorteio_carta_premiadas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    bilhete_numero:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    flg_premiada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    flg_achada: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = SorteioCartaPremiada;
