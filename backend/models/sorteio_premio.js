const Sequelize = require('sequelize');
const database = require('../database');

const SorteioPremio = database.define('tb_sorteio_premios', {
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
    bilhete_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    ganhador_id: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    colocacao: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

module.exports = SorteioPremio;
