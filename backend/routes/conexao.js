const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();
const database = require('../database');

router.get('/count', async (req, res) => {
    try {
        const queryConexao = `SHOW PROCESSLIST`;
        const queryArrecadacao = `
            SELECT SUM(total) AS total
            FROM tb_faturas
            WHERE status='PAGO'
            AND tipo='BILHETE'
            AND total > 0
            AND user_id > 10
            AND qr_code_payment_image IS NOT NULL
            AND quantidade > 0
        `;

        const resultadosConexao = await database.query(queryConexao, {
            type: Sequelize.QueryTypes.SELECT,
        });

        const resultadosArrecadacao = await database.query(queryArrecadacao, {
            type: Sequelize.QueryTypes.SELECT,
        });

        const arrecadacaoTotal = resultadosArrecadacao?.[0]?.total || 0;

        const obj = {
            conexoes: resultadosConexao?.length || 0,
            arrecadacao: arrecadacaoTotal
        };

        return res.status(200).json(obj);
    } catch (error) {
        console.error('Erro ao buscar dados no banco de dados:', error);
        return res.status(500).json({ error: 'Erro ao carregar as informações.' });
    }
});

module.exports = router;