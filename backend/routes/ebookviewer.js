const express = require('express');
const Utils = require('../utils');
const { Op, Sequelize, where } = require('sequelize');
const Ebook = require('../models/ebook');
const router = express.Router();

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