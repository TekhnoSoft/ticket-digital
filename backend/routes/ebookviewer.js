const express = require('express');
const Utils = require('../utils');
const { Op, Sequelize, where } = require('sequelize');
const Ebook = require('../models/ebook');
const router = express.Router();
const database = require('../database');

router.get('/all', async (req, res) => {
    try {
        const query = `
            SELECT 
                A.id, 
                A.name, 
                A.description, 
                A.sorteio_id,
                B.telefone_contato
            FROM tb_ebooks as A
            LEFT JOIN tb_sorteio_informacoes AS B ON A.sorteio_id=B.sorteio_id;
        `;

        const resultados = await database.query(query, {
            replacements: { },
            type: Sequelize.QueryTypes.SELECT,
        });

        const ebooks = [];

        resultados.forEach((row) => {
            let obj = {
                id: row.id,
                name: row.name,
                description: row.description,
                telefone_contato: row?.telefone_contato
            }
            ebooks.push(obj);
        })

        return res.status(200).json(ebooks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao carregar a capa do eBook.' });
    }
})

router.get('/view-thumb/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const ebook = await Ebook.findOne({
            where: { id }
        });

        if (!ebook || !ebook.thumb) {
            return res.status(404).json({ error: 'Capa do eBook não encontrada.' });
        }

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(ebook.thumb);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao carregar a capa do eBook.' });
    }
});

module.exports = router;