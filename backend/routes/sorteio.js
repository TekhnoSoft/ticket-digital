const express = require('express');
const Sorteio = require('../models/sorteio');
const SorteioRegras = require('../models/sorteio_regras');
const SorteioCategoria = require('../models/sorteio_categorias');
const Bilhete = require('../models/bilhete');
const Fatura = require('../models/fatura');
const SorteioImagens = require("../models/sorteio_imagens");
const { validateOrigin } = require('../middlewares/CorsMiddleware');
const Utils = require('../utils');
const { Op, Sequelize, where } = require('sequelize');
const router = express.Router();
const database = require('../database');
const SorteioInformacoes = require('../models/sorteio_informacoes');
const { createFatura } = require('../providers/fatura_provider');
const SorteioPublicacaoPrecos = require('../models/sorteio_publicacao_precos');
const SorteioParceiro = require('../models/sorteio_parceiro');
const SorteioPremio = require('../models/sorteio_premio');
const Ebook = require('../models/ebook');
const { validateToken } = require('../middlewares/AuthMiddleware');
const PagamentoOperadora = require('../models/pagamento_operadoras');
const BilhetePremiado = require('../models/bilhete_premiado');
const Socio = require('../models/socios');
const { PDFDocument } = require('pdf-lib');
require('dotenv').config();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory as buffers
    limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/heic', 'image/webp', 'image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);  // Accept the file
        } else {
            cb(new Error('Formato de arquivo não permitido. Aceitos: PNG, JPG, JPEG.'));
        }
    }
});

const sizeOf = require('image-size');
const { compressImageFromBuffer } = require('../providers/tinify_compress');

router.get('/get-fatura-by-remessa/:id_remessa', validateOrigin, async (req, res) => {
    const { id_remessa } = req.params;
    try {
        const fatura = await Fatura.findOne({ where: { id_remessa: id_remessa } });

        if (!fatura) {
            return res.status(404).json(null);
        }

        return res.status(200).json(fatura);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/get-by-keybind/:keybind', async (req, res) => {
    const { keybind } = req.params;

    try {
        const sorteio = await Sorteio.findOne({ where: { keybind: keybind } });

        if (!sorteio) {
            return res.status(404).json(null);
        }

        const sorteioInformacoes = await SorteioInformacoes.findOne({ where: { sorteio_id: sorteio.id } });
        const sorteioRegras = await SorteioRegras.findAll({
            where: { id: sorteio.sorteio_regras_id },
        });
        const sorteioImagens = await SorteioImagens.findAll({
            where: { sorteio_id: sorteio.id, tipo: 'BANNER' },
            attributes: ['id', 'tipo']
        });
        const sorteioImagemLogo = await SorteioImagens.findOne({
            where: { sorteio_id: sorteio.id, tipo: 'LOGO' },
            attributes: ['id']
        });
        const sorteioParceiro = await SorteioParceiro.findOne({
            where: { user_id: sorteio.user_id },
            attributes: ['whatsappLink', 'facebookLink', 'youtubeLink', 'instagramLink', 'tiktokLink', 'telegramLink', 'enterprise_name', 'colorPrimary']
        });
        const bilhetesPagos = await Bilhete.count({
            where: {
                sorteio_id: sorteio?.id,
                status: 'PAGO',
            }
        })

        if (sorteioInformacoes) {
            const sorteioPlano = sorteio.toJSON();
            sorteioPlano.info = sorteioInformacoes;
            sorteioPlano.imagens = sorteioImagens;
            sorteioPlano.regra = sorteioRegras[0];
            sorteioPlano.parceiro = sorteioParceiro;
            sorteioPlano.logo = sorteioImagemLogo;
            sorteioPlano.pagos = bilhetesPagos;

            return res.status(200).json(sorteioPlano);
        } else {
            return res.status(404).json(null);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/imagem/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar a imagem no banco de dados pelo ID
        const imagem = await SorteioImagens.findOne({
            where: { id: id },
        });

        if (!imagem) {
            return res.status(404).send('Imagem não encontrada');
        }

        const imagemData = imagem.payload;
        let contentType = 'application/octet-stream'; // Tipo padrão

        // Detectar o tipo de imagem
        if (imagem.tipo === 'BANNER' || imagem.tipo === 'LOGO' || imagem.tipo === 'RODAPE') {
            const buffer = Buffer.from(imagemData);
            if (buffer.toString('hex', 0, 2) === 'ffd8') {
                contentType = 'image/jpeg';
            } else if (buffer.toString('hex', 0, 4) === '89504e47') {
                contentType = 'image/png';
            }
        }

        // Configurar os cabeçalhos de cache
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400');  // Cache por 1 dia (24h)
        res.setHeader('Expires', new Date(Date.now() + 86400 * 1000).toUTCString());  // Data de expiração

        // Enviar a imagem
        res.send(imagemData);

    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao carregar a imagem');
    }
});

router.post('/reservar-bilhete-quantidade', validateOrigin, async (req, res) => {
    try {
        let { sorteio_id, quantidade, user_id } = req.body;

        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id } });
        const sorteioRegras = await SorteioRegras.findOne({
            where: { id: sorteio.sorteio_regras_id },
        });

        let valorUnitarioCota = Number(sorteio?.valor_por_bilhete);

        const bilhetesCompradosOuIndisponiveis = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                status: {
                    [Op.in]: ["PAGO", "INDISPONIVEL"],
                },
            },
        });

        let jaReservados = bilhetesCompradosOuIndisponiveis.map(b => b.numero);
        let numeros = Utils.sortearBilhetes(0, Number(sorteioRegras?.valor), quantidade, jaReservados);
        let id_remessa = Utils.makeid(50);

        const agora = Utils.getDateNow();

        const prazoPagamentoEmMinutos = Utils.prazoPagamentoEmMinutosMapper();
        const minutosPrazo = prazoPagamentoEmMinutos[sorteio.prazo_pagamento];
        const prazoTimestamp = agora.clone().add(minutosPrazo, 'minutes');

        if (numeros.length > 0) {
            const bilhetes = Array.from({ length: numeros.length }, (_, i) => ({
                numero: numeros[i].numero_valor,
                numero_texto: numeros[i].numero_valor,
                status: "INDISPONIVEL",
                id_remessa: id_remessa,
                flg_premiado: false,
                flg_sorteado: false,
                sorteio_id: sorteio_id,
                user_id: user_id,
                prazo_compra: prazoTimestamp,
                createdAt: agora,
                updatedAt: agora,
            }));
            await Bilhete.bulkCreate(bilhetes, { validate: true });
        }

        await createFatura({
            user_id: user_id,
            sorteio_id: sorteio_id,
            id_remessa: id_remessa,
            valor: numeros.length * valorUnitarioCota,
        });

        return res.status(201).json({
            quantidade: numeros.length,
            valor: numeros.length * valorUnitarioCota,
            id_remessa: id_remessa,
            //numeros: numeros,
        });

    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post('/reservar-bilhete-selecionado', validateOrigin, async (req, res) => {
    try {
        let { sorteio_id, numeros, user_id } = req.body;

        if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
            return res.status(400).json({ message: "Nenhum número fornecido." });
        }

        const bilhetesCompradosOuIndisponiveis = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                numero: { [Op.in]: numeros },
                status: { [Op.in]: ["PAGO", "INDISPONIVEL"] }
            }
        });

        if (bilhetesCompradosOuIndisponiveis.length > 0) {
            const jaReservados = bilhetesCompradosOuIndisponiveis.map(b => b.numero);
            return res.status(400).json({
                message: "Os seguintes números estão indisponíveis: ",
                numerosIndisponiveis: jaReservados
            });
        }

        const sorteio = await Sorteio.findOne({ where: { id: sorteio_id } });

        let valorUnitarioCota = Number(sorteio?.valor_por_bilhete);

        if (!sorteio) {
            return res.status(404).json({ message: "Sorteio não encontrado." });
        }

        let id_remessa = Utils.makeid(50);
        const agora = Utils.getDateNow();
        const prazoPagamentoEmMinutos = Utils.prazoPagamentoEmMinutosMapper();
        const minutosPrazo = prazoPagamentoEmMinutos[sorteio.prazo_pagamento];
        const prazoTimestamp = agora.clone().add(minutosPrazo, 'minutes');

        const bilhetes = numeros.map(numero => ({
            numero: numero,
            numero_texto: numero,
            status: "INDISPONIVEL",
            id_remessa: id_remessa,
            flg_premiado: false,
            flg_sorteado: false,
            sorteio_id: sorteio_id,
            user_id: user_id,
            prazo_compra: prazoTimestamp,
            createdAt: agora,
            updatedAt: agora,
        }));

        await Bilhete.bulkCreate(bilhetes, { validate: true });

        await createFatura({
            user_id: user_id,
            sorteio_id: sorteio_id,
            id_remessa: id_remessa,
            valor: numeros.length * valorUnitarioCota,
        });

        return res.status(201).json({
            quantidade: numeros.length,
            valor: numeros.length * valorUnitarioCota,
            id_remessa: id_remessa,
            //numeros: numeros
        });

    } catch (err) {
        return res.status(500).json(err);
    }
});

router.get('/bilhetes-pagos/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {
        const bilhetes = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                status: { [Op.in]: ["PAGO"] }
            }
        });
        return res.status(200).json(bilhetes.map(b => Number(b.numero)));
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/bilhetes-reservados/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {
        const bilhetes = await Bilhete.findAll({
            where: {
                sorteio_id: sorteio_id,
                status: { [Op.in]: ["INDISPONIVEL"] }
            }
        });
        return res.status(200).json(bilhetes.map(b => Number(b.numero)));
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/rank-buyers/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {

        const query = `
            SELECT 
                B.name AS name, 
                COUNT(A.id) AS qtd 
            FROM tb_bilhetes AS A
            INNER JOIN tb_users AS B ON A.user_id = B.id
            WHERE A.sorteio_id = :sorteio_id AND A.status = 'PAGO'
            GROUP BY B.id, B.name
            ORDER BY qtd DESC, MIN(A.createdAt) ASC
            LIMIT 5;
        `;

        const resultados = await database.query(query, {
            replacements: { sorteio_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const rank = [];

        resultados.forEach((row) => {
            let obj = {
                name: row.name,
                qtd: row.qtd,
            }
            rank.push(obj);
        })

        return res.status(200).json(rank);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/rank-winners/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {

        const query = `SELECT A.*, B.name AS ganhador_nome FROM ticketdigital.tb_sorteio_premios A LEFT JOIN tb_users AS B ON A.ganhador_id=B.id WHERE A.sorteio_id=:sorteio_id ORDER BY A.colocacao ASC;`;

        const resultados = await database.query(query, {
            replacements: { sorteio_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const rank = [];

        resultados.forEach((row) => {
            let obj = {
                ganhador_nome: row.ganhador_nome,
                premio: row.name,
                colocacao: row.colocacao
            }
            rank.push(obj);
        })

        return res.status(200).json(rank);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/campanhas', validateOrigin, async (req, res) => {
    try {

        const query = `
            SELECT A.*, 
                (SELECT B.id 
                    FROM tb_sorteio_imagens AS B 
                    WHERE B.sorteio_id = A.id 
                    LIMIT 1) AS id_imagem
            FROM ticketdigital.tb_sorteios AS A
            WHERE A.status = 'ATIVO' AND A.ocultar = 0;
        `;

        const resultados = await database.query(query, {
            replacements: {},
            type: Sequelize.QueryTypes.SELECT,
        });

        const campanhas = [];

        resultados.forEach((row) => {
            let obj = {
                id_imagem: row.id_imagem,
                name: row.name,
                valor_por_bilhete: row.valor_por_bilhete,
                keybind: row.keybind
            }
            campanhas.push(obj);
        })

        return res.status(200).json(campanhas);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/bilhetes-premiados/:sorteio_id', validateOrigin, async (req, res) => {
    const { sorteio_id } = req.params;
    try {

        const query = `SELECT A.*, B.name AS username FROM ticketdigital.tb_bilhete_premiados AS A LEFT JOIN tb_users AS B ON A.user_id=B.id WHERE sorteio_id=:sorteio_id`;

        const resultados = await database.query(query, {
            replacements: { sorteio_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const bilhetes = [];

        resultados.forEach((row) => {
            let obj = {
                id: row.id,
                name: row.name,
                numero: Number(row.numero),
                username: row.username,
                user_id: row.user_id
            }
            bilhetes.push(obj);
        })

        return res.status(200).json(bilhetes);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/regras', validateOrigin, async (req, res) => {
    try {
        const sorteioRegras = await SorteioRegras.findAll();
        return res.status(200).json(sorteioRegras);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/categorias', validateOrigin, async (req, res) => {
    try {
        const sorteioCategoria = await SorteioCategoria.findAll({
            order: [['nome', 'ASC']]
        });
        return res.status(200).json(sorteioCategoria);
    } catch (err) {
        return res.status(500).json(err);
    }
})

router.get('/taxas', validateOrigin, async (req, res) => {
    try {
        const sorteioPublicacaoPrecos = await SorteioPublicacaoPrecos.findAll({
            order: [['id', 'ASC']]
        });
        return res.status(200).json(sorteioPublicacaoPrecos);
    } catch (err) {
        return res.status(500).json(err);
    }
})

/////////////////////////////////PARCEIRO///////////////////////////////////////////////

router.get('/campanha/:campanha_id/get-status', validateToken, async (req, res) => {
    let { campanha_id } = req.params;
    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id }, attributes: ['id', 'status'] })
        const fatura = await Fatura.findOne({ where: { tipo: 'CAMPANHA', sorteio_id: sorteio?.id }, attributes: ['id_remessa'] })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        return res.status(200).json({
            sorteio,
            fatura
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/campanha/:campanha_id/get-details', validateToken, async (req, res) => {
    let { campanha_id } = req.params;

    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id } })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        const sorteioInformacoes = await SorteioInformacoes.findOne({ where: { sorteio_id: sorteio.id } });

        const sorteioRegras = await SorteioRegras.findAll({
            where: { id: sorteio.sorteio_regras_id },
        });
        const sorteioImagens = await SorteioImagens.findAll({
            where: { sorteio_id: sorteio.id },
            attributes: ['id', 'tipo']
        });
        const sorteioImagemLogo = await SorteioImagens.findOne({
            where: { sorteio_id: sorteio.id, tipo: 'LOGO' },
            attributes: ['id', 'tipo']
        });
        const sorteioParceiro = await SorteioParceiro.findOne({
            where: { user_id: sorteio.user_id },
            attributes: ['whatsappLink', 'facebookLink', 'youtubeLink', 'instagramLink', 'tiktokLink', 'telegramLink', 'enterprise_name', 'colorPrimary']
        });
        const bilhetesPagos = await Bilhete.count({
            where: {
                sorteio_id: sorteio?.id,
                status: 'PAGO',
            }
        })
        const bilhetesReservados = await Bilhete.count({
            where: {
                sorteio_id: sorteio?.id,
                status: 'INDISPONIVEL',
            }
        })

        const faturas = await Fatura.count({
            where: {
                tipo: 'BILHETE',
                status: { [Op.in]: ["AGUARDANDO_PAGAMENTO", "PAGO", "CANCELADO"] },
                sorteio_id: sorteio?.id
            }
        })

        const usuarios = await Fatura.count({
            where: {
                tipo: 'BILHETE',
                status: { [Op.in]: ["AGUARDANDO_PAGAMENTO", "PAGO", "CANCELADO"] },
                sorteio_id: sorteio?.id
            },
            distinct: true,
            col: 'user_id'
        });

        if (sorteioInformacoes) {
            const sorteioPlano = sorteio.toJSON();
            sorteioPlano.info = sorteioInformacoes;
            sorteioPlano.imagens = sorteioImagens;
            sorteioPlano.regra = sorteioRegras[0];
            sorteioPlano.parceiro = sorteioParceiro;
            sorteioPlano.logo = sorteioImagemLogo;
            sorteioPlano.pagos = Number(bilhetesPagos);
            sorteioPlano.reservas = Number(bilhetesReservados);
            sorteioPlano.nFaturas = Number(faturas);
            sorteioPlano.usuarios = Number(usuarios);

            return res.status(200).json(sorteioPlano);
        } else {
            return res.status(404).json(null);
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/campanha/:campanha_id/get-description', validateToken, async (req, res) => {
    let { campanha_id } = req.params;

    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id } })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        return res.status(200).json(sorteio?.description);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/campanha/update-description', validateToken, async (req, res) => {
    let { campanha_id, content } = req.body;
    try {
        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id, user_id: user_id } })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        await Sorteio.update(
            {
                description: content
            },
            {
                where: {
                    id: campanha_id,
                    user_id: user_id,
                }
            }
        )

        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/campanha/payment-providers', validateToken, async (req, res) => {
    try {
        const operadoras = await PagamentoOperadora.findAll({});
        return res.status(200).json(operadoras);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get('/campanha/images/:campanha_id', validateToken, async (req, res) => {
    let { campanha_id } = req.params;
    try {
        const images = await SorteioImagens.findAll({
            where: {
                sorteio_id: campanha_id,
                tipo: 'BANNER'
            }
        })
        return res.status(200).json(images);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.put('/campanha/save-images', validateToken, upload.array('images[]'), async (req, res) => {
    try {
        const { campanha_id } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
        }

        const savedImages = [];

        for (const file of files) {
            const compressedImageBuffer = await compressImageFromBuffer(file.buffer);

            const imageRecord = await SorteioImagens.create({
                sorteio_id: campanha_id,
                tipo: 'BANNER',
                payload: compressedImageBuffer,
            });
            savedImages.push(imageRecord);
        }

        return res.status(200).json({ success: true, data: savedImages });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao processar as imagens. Tente novamente.' });
    }
});

router.delete('/campanha/:campanha_id/delete-image/:image_id', validateToken, async (req, res) => {
    const { campanha_id, image_id } = req.params;

    try {

        const image = await SorteioImagens.findOne({
            where: {
                id: image_id,
                sorteio_id: campanha_id,
            }
        });

        if (!image) {
            return res.status(404).json({ error: 'Imagem não encontrada ou não pertence a esta campanha.' });
        }

        await SorteioImagens.destroy({
            where: {
                id: image_id,
                sorteio_id: campanha_id,
            }
        });

        return res.status(200).json(true);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao processar a exclusão da imagem. Tente novamente.' });
    }
});

router.get('/campanha/seo/:campanha_id', validateToken, async (req, res) => {
    const { campanha_id } = req.params;
    try {

        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({
            where: {
                id: campanha_id,
                user_id: user_id,
            },
            attributes: ['keybind']
        })

        if (!sorteio) {
            return res.status(404).json({ message: "Essa campanha não pertence ao usuário." });
        }

        const sorteioInformacoes = await SorteioInformacoes.findOne({
            attributes: ['seo_title', 'seo_description', 'link'],
            where: {
                sorteio_id: campanha_id
            }
        })

        const image = await SorteioImagens.findOne({
            where: { sorteio_id: campanha_id, tipo: 'BANNER' },
            attributes: ['id']
        })

        let obj = {
            seo_title: sorteioInformacoes?.seo_title,
            seo_description: sorteioInformacoes?.seo_description,
            link: sorteio?.keybind,
            id_image: image?.id,
        }

        return res.status(200).json(obj);

    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})

router.put('/campanha/update-seo', validateToken, async (req, res) => {
    const { campanha_id, title, description } = req.body;
    try {

        if (!campanha_id || !title || !description) {
            return res.status(404).json({ message: "Sorteio não encontrado." });
        }

        await SorteioInformacoes.update(
            {
                seo_title: title,
                seo_description: description,
            },
            {
                where: {
                    sorteio_id: campanha_id
                }
            }
        )

        return res.status(200).json(true);

    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})


router.get('/campanha/premios/:campanha_id', validateToken, async (req, res) => {
    let { campanha_id } = req.params;
    try {
        const premios = await SorteioPremio.findAll({
            where: {
                sorteio_id: campanha_id,
            }
        })
        return res.status(200).json(premios);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.delete('/campanha/:campanha_id/premio-delete/:premio_id', validateToken, async (req, res) => {
    let { campanha_id, premio_id } = req.params;
    try {
        const premio = await SorteioPremio.findOne({
            where: {
                id: premio_id,
                sorteio_id: campanha_id,
            }
        });

        if (!premio) {
            return res.status(404).json({ message: "Prêmio não encontrado." });
        }

        if (premio?.bilhete_id || premio?.ganhador_id) {
            return res.status(404).json({ message: "Esse prêmio não pode ser removido, pois o mesmo já foi contemplado." });
        }

        await SorteioPremio.destroy({
            where: {
                id: premio_id,
                sorteio_id: campanha_id,
            }
        });

        const premiosSubsequentes = await SorteioPremio.findAll({
            where: {
                sorteio_id: campanha_id,
                colocacao: { [Op.gt]: premio.colocacao }
            },
            order: [['colocacao', 'ASC']]
        });

        for (let i = 0; i < premiosSubsequentes.length; i++) {
            const premioSubsequente = premiosSubsequentes[i];
            await SorteioPremio.update(
                { colocacao: premioSubsequente.colocacao - 1 },
                { where: { id: premioSubsequente.id } }
            );
        }

        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/campanha/premio-create', validateToken, async (req, res) => {
    const { campanha_id, premio } = req.body;
    try {
        if (!campanha_id || !premio) {
            return res.status(404).json({ message: "Dados inválidos." });
        }

        const premios = await SorteioPremio.findAll({
            where: { sorteio_id: campanha_id },
            order: [['colocacao', 'ASC']]
        });

        let colocacao = premios.length + 1;

        for (let i = 0; i < premios.length; i++) {
            const premioAtual = premios[i];
            if (premioAtual.colocacao !== i + 1) {
                await SorteioPremio.update(
                    { colocacao: i + 1 },
                    { where: { id: premioAtual.id } }
                );
            }
        }

        await SorteioPremio.create({
            name: premio?.name,
            description: premio?.description,
            sorteio_id: campanha_id,
            colocacao: colocacao,
        });

        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get('/campanha/:campanha_id/cotas-premiadas', validateToken, async (req, res) => {
    let { campanha_id } = req.params;
    try {

        const query = `
            SELECT 
                A.id,
                A.name,
                A.numero,
                D.valor,
                S.prazo_compra,
                U.name AS winner
            FROM tb_bilhete_premiados AS A 
            LEFT JOIN tb_sorteios AS C ON A.sorteio_id = C.id
            LEFT JOIN tb_sorteio_regras AS D ON C.sorteio_regras_id = D.id
            LEFT JOIN tb_bilhetes AS S ON A.numero=S.numero AND A.sorteio_id=S.sorteio_id
            left JOIN tb_users AS U ON U.id=S.user_id
            WHERE A.sorteio_id = :sorteio_id;

        `;

        const resultados = await database.query(query, {
            replacements: {
                sorteio_id: campanha_id,
            },
            type: Sequelize.QueryTypes.SELECT,
        });

        const cotas = [];

        resultados.forEach((row) => {
            let obj = {
                id: row.id,
                name: row.name,
                numero: row.numero,
                valor: row.valor,
                winner: row?.winner,
                data_compra: row?.prazo_compra
            }
            cotas.push(obj);
        })

        return res.status(200).json(cotas);


    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/campanha/save-cotas-premiadas', validateToken, async (req, res) => {
    const { campanha_id, numero, premio } = req.body;
    try {

        if (!campanha_id || !numero || !premio) {
            return res.status(404).json({ message: "Dados inválidos." });
        }


        const has = await Bilhete.findOne({
            where: {
                sorteio_id: campanha_id,
                numero: numero,
            }
        })

        if (has) {
            return res.status(404).json({ message: "Não é possível vincular a premiação em uma cota já paga." });
        }

        const sorteio = await Sorteio.findOne({
            where: {
                id: campanha_id,
            },
            attributes: ['id', 'sorteio_regras_id']
        })

        const regra = await SorteioRegras.findOne({
            where: {
                id: sorteio?.sorteio_regras_id
            }
        })

        if (Number(numero) > regra?.valor) {
            return res.status(404).json({ message: `O limite máximo dessa campanha é ${regra?.valor} cotas.` });
        }

        if (Number(numero) < 0) {
            return res.status(404).json({ message: `O limite mínimo dessa campanha não pode ser menor que 0.` });
        }

        const exists = await BilhetePremiado.findOne({
            where: {
                sorteio_id: campanha_id,
                numero: numero,
            }
        })

        if (exists) {
            return res.status(404).json({ message: "Já existe uma cota premiada com esse número." });
        }

        await BilhetePremiado.create({
            name: premio,
            numero: numero,
            sorteio_id: campanha_id,
        })

        return res.status(201).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/campanha/save-cotas-premiadas-aleatoria', validateToken, async (req, res) => {
    const { campanha_id, premio } = req.body;
    try {

        if (!campanha_id || !premio) {
            return res.status(404).json({ message: "Dados inválidos." });
        }

        const sorteio = await Sorteio.findOne({
            where: {
                id: campanha_id,
            },
            attributes: ['id', 'sorteio_regras_id']
        });

        if (!sorteio) {
            return res.status(404).json({ message: "Sorteio não encontrado." });
        }

        const regra = await SorteioRegras.findOne({
            where: {
                id: sorteio.sorteio_regras_id
            }
        });

        if (!regra) {
            return res.status(404).json({ message: "Regras do sorteio não encontradas." });
        }

        let min = 0;
        let max = regra.valor;

        const gerarNumeroAleatorio = () => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const numeroValido = async () => {
            let numero;
            let exists;

            do {
                numero = gerarNumeroAleatorio();
                exists = await BilhetePremiado.findOne({
                    where: {
                        sorteio_id: campanha_id,
                        numero: numero,
                    }
                });
            } while (exists);

            return numero;
        }

        const numeroPremiado = await numeroValido();

        await BilhetePremiado.create({
            sorteio_id: campanha_id,
            numero: numeroPremiado,
            name: premio
        });

        return res.status(201).json(numeroPremiado);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro interno", error: err });
    }
});

router.delete('/campanha/:campanha_id/cota-premiada-delete/:cota_id/:numero', validateToken, async (req, res) => {
    let { campanha_id, cota_id, numero } = req.params;
    try {

        const hasWinner = await Bilhete.findOne({
            where: {
                sorteio_id: campanha_id,
                numero: numero,
            }
        })

        if (hasWinner) {
            return res.status(404).json({ message: "Não é possível excluir uma cota já contemplada." });
        }

        await BilhetePremiado.destroy({
            where: {
                id: cota_id,
                sorteio_id: campanha_id,
            }
        });

        return res.status(200).json(true);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/campanha/:campanha_id/get-ebooks', validateToken, async (req, res) => {
    let { campanha_id } = req.params;
    try {

        const ebooks = await Ebook.findAll({
            where: {
                sorteio_id: campanha_id,
            },
            attributes: ['id', 'name', 'description', 'sorteio_id', 'createdAt']
        })

        return res.status(200).json(ebooks);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/campanha/save-ebook', validateToken,
    upload.fields([{ name: 'thumb', maxCount: 1 }, { name: 'payload', maxCount: 1 }]),
    async (req, res) => {
        try {
            const { name, description, campanha_id } = req.body;
            const thumb = req.files?.thumb ? req.files.thumb[0] : null;
            const payload = req.files?.payload ? req.files.payload[0] : null;

            if (!thumb || !payload) {
                return res.status(400).json({ error: 'É necessário enviar a capa (thumb) e o arquivo PDF (payload).' });
            }

            const compressedThumbBuffer = await compressImageFromBuffer(thumb.buffer);

            const pdfDoc = await PDFDocument.load(payload.buffer);
            const compressedPdfBytes = await pdfDoc.save();

            const ebookRecord = await Ebook.create({
                name,
                description,
                thumb: compressedThumbBuffer,
                payload: compressedPdfBytes,
                sorteio_id: campanha_id,
            });

            return res.status(200).json({ success: true, data: ebookRecord });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao processar o eBook. Tente novamente.' });
        }
    }
);

router.delete('/campanha/:campanha_id/ebook-delete/:id_ebook', validateToken, async (req, res) => {
    let {campanha_id, id_ebook} = req.params;
    try {
        let id = req.user.id;

        const sorteio = await Sorteio.findOne({
            where: {
                id: campanha_id,
                user_id: id,
            }
        })

        if(!sorteio){
            return res.status(404).json({ message: "Esse sorteio não pertence a você." });
        }

        await Ebook.destroy({
            where: {
                id: id_ebook,
                sorteio_id: campanha_id,
            }
        });

        return res.status(200).json(true);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao processar o eBook. Tente novamente.' });
    }
})

router.get('/campanha/:campanha_id/get-campanha-info', validateToken, async (req, res) => {
    const { campanha_id } = req.params;
    try {
        const sorteio = await Sorteio.findOne({ where: { id: campanha_id } });

        if (!sorteio) {
            return res.status(404).json(null);
        }

        const sorteioInformacoes = await SorteioInformacoes.findOne({ where: { sorteio_id: sorteio.id } });

        if (sorteioInformacoes) {
            const sorteioPlano = sorteio.toJSON();
            sorteioPlano.info = sorteioInformacoes;
            return res.status(200).json(sorteioPlano);
        } else {
            return res.status(404).json(null);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put('/campanha/save-campanha-info', validateToken, async (req, res) => {
    const { campanha_id, name, sorteio_categoria_id, telefone_contato, tipo, prazo_pagamento, data_sorteio } = req.body.infos;
    try{

        let user_id = req.user.id;

        const sorteio = await Sorteio.findOne({ where: { id: campanha_id } });

        if (!sorteio) {
            return res.status(404).json(null);
        }
        
        await Sorteio.update(
            {
                name: name,
                sorteio_categoria_id: sorteio_categoria_id,
                tipo: tipo,
                prazo_pagamento: prazo_pagamento,
            },
            {
                where: {
                    id: campanha_id,
                    user_id: user_id,
                }
            }
        )

        await SorteioInformacoes.update(
            {
                telefone_contato: telefone_contato,
                data_sorteio: data_sorteio
            },
            {
                where:{
                    sorteio_id: sorteio?.id,
                    id: sorteio?.sorteio_informacoes_id
                }
            }
        )

        return res.status(200).json(true);
    }catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;