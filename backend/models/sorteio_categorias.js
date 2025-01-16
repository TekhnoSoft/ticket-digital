const Sequelize = require('sequelize');
const database = require('../database');

const SorteioCategoria = database.define('tb_sorteio_categorias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = SorteioCategoria;
