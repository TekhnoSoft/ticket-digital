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
                B.telefone_contato,
                C.keybind
            FROM tb_ebooks as A
            LEFT JOIN tb_sorteio_informacoes AS B ON A.sorteio_id=B.sorteio_id
            LEFT JOIN tb_sorteios AS C ON C.id = A.sorteio_id;
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
                telefone_contato: row?.telefone_contato,
                sorteio_id: row?.sorteio_id,
                keybind: row?.keybind
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

        // Definir cabeçalhos de cache
        res.setHeader('Content-Type', 'image/jpeg');

        // Cache por 1 hora
        res.setHeader('Cache-Control', 'public, max-age=3600');  // 1 hora (3600 segundos)
        
        // Opcional: Definir data de expiração para o cache (por exemplo, 1 hora a partir de agora)
        res.setHeader('Expires', new Date(Date.now() + 3600 * 1000).toUTCString());

        // Opcional: Usar ETag para cache condicional (se o conteúdo mudar, um novo ETag será gerado)
        const etag = ebook.thumb.length; // Você pode usar outra abordagem para calcular um ETag, se necessário
        res.setHeader('ETag', etag);

        // Verificar se a imagem no cache do cliente ainda é válida
        if (req.headers['if-none-match'] === etag) {
            return res.status(304).end(); // Retornar status 304 se a imagem não mudou
        }

        res.send(ebook.thumb);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao carregar a capa do eBook.' });
    }
});


module.exports = router;