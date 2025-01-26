const Sequelize = require('sequelize');
const database = require('../database');

const SorteioPublicacaoPrecos = database.define('tb_sorteio_publicacao_precos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    min: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    max: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = SorteioPublicacaoPrecos;
