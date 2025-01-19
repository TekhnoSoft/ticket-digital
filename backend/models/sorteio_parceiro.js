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
});

module.exports = SorteioParceiro;
