const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();
const database = require('../database');

router.get('/count', async (req, res) => {
    try {
        const query = `SHOW PROCESSLIST`;

        const resultados = await database.query(query, {
            type: Sequelize.QueryTypes.SELECT,
        });

        return res.status(200).json(resultados?.length || 0);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao carregar a capa do eBook.' });
    }
})

module.exports = router;