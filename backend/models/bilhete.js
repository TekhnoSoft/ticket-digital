const Sequelize = require('sequelize');
const database = require('../database');
const Sorteio = require('./sorteio');

const Bilhete = database.define('tb_bilhetes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numero: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    numero_texto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM(
            "DISPONIVEL", 
            "INDISPONIVEL", 
            "PAGO", 
        ),
        allowNull: false,
        defaultValue: "DISPONIVEL"
    },
    id_remessa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    flg_premiado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    valor_premio: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    flg_sorteado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    data_compra: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    prazo_compra: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_sorteios',
            key: 'id'
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

module.exports = Bilhete;
