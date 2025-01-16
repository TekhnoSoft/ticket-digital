const Sequelize = require('sequelize');
const database = require('../database');

const SorteioImagens = database.define('tb_sorteio_imagens', {
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
    tipo: {
        type: Sequelize.ENUM("BANNER", "LOGO", "RODAPE"),
        allowNull: false,
        defaultValue: "BANNER"
    },
    payload: {
        type: Sequelize.BLOB("long"),
        allowNull: true,
    },
});

module.exports = SorteioImagens;
