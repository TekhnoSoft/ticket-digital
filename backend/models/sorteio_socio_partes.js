const Sequelize = require('sequelize');
const database = require('../database');

const SorteioSocioPartes = database.define('tb_sorteio_socio_partes', {
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
    tag: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.ENUM("PORCENTAGEM", "VALOR"),
        allowNull: false,
        defaultValue: "PORCENTAGEM"
    },
    valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = SorteioSocioPartes;
