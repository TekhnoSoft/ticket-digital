const Sequelize = require('sequelize');
const database = require('../database');

const Ebook = database.define('tb_ebooks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    thumb: {
        type: Sequelize.BLOB("long"),
        allowNull: false,
    },
    link: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    payload: {
        type: Sequelize.BLOB("long"),
        allowNull: true,
    },
    sorteio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Ebook;
