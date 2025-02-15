const Sequelize = require('sequelize');
const database = require('../database');

const User = database.define('tb_users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: Sequelize.ENUM("user", "parceiro", "admin"),
        allowNull: false,
        defaultValue: "user"
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    password_hash: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    convite_code: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    affiliate_code: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    password_reset_code:{
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

module.exports = User;
