const Sequelize = require('sequelize');
const database = require('../database');

const UserParceiroConvite = database.define('tb_user_parceiro_convites', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    code: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});

module.exports = UserParceiroConvite;
