const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASS, {
    dialect: 'mysql',
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    logging: false, // Desativa logs de queries (opcional)
    pool: {
        max: 100, // Número máximo de conexões simultâneas
        min: 0, // Número mínimo de conexões no pool
        acquire: 30000, // Tempo máximo de espera para adquirir conexão (30s)
        idle: 10000 // Tempo máximo que uma conexão pode ficar ociosa antes de ser fechada (10s)
    },
    retry: {
        match: [/Deadlock/i, /Lock wait timeout exceeded/i], // Tenta novamente em deadlocks e timeouts
        max: 3 // Número máximo de tentativas antes de falhar
    },
    dialectOptions: {
        connectTimeout: 60000, // Tempo máximo de espera para conexão (60s)
    }
});

module.exports = sequelize;