const express = require('express');
const User = require('../models/users');
const Bilhete = require('../models/bilhete');
const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');
const Utils = require('../utils');
const { Op, Sequelize, where } = require('sequelize');
const Fatura = require('../models/fatura');
const sequelize = require('../database');
const Sorteio = require('../models/sorteio');
const SorteioImagens = require('../models/sorteio_imagens');
const SorteioParceiro = require('../models/sorteio_parceiro');
const UserParceiroConvite = require('../models/user_parceiro_convites');
const SorteioPublicacaoPrecos = require('../models/sorteio_publicacao_precos');
const database = require('../database');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.get('/auth', validateToken, async (req, res) => {
    try {
        return res.status(200).json({ message: "Token válido", data: req.user.id });
    } catch (err) {
        return res.status(401).json({ message: "Erro ao recuperar o token", data: null });
    }
})

router.get('/get', validateToken, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if (!user || user == null) {
            return res.status(404).json({ message: "Cliente não encontrado.", data: null });
        }
        return res.status(200).json({
            message: "Cliente recuperado com sucesso!", data: {
                id: user?.id,
                email: user?.email,
                name: user?.name,
                phone: user?.phone,
                role: user?.role,
                cpf: user?.cpf,
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message, data: null });
    }
});

router.post('/login', validateOrigin, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!Utils.validateEmail(email)) {
            return res.status(401).json({ message: "Email inválido" });
        }

        const user = await User.findOne({ where: { email } });

        if (user?.role != "parceiro") {
            return res.status(401).json({ message: "E-mail de parceiro não encontrado." });
        }

        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

        return res.status(201).json({ message: "Login realizado com sucesso.", token });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor. Tente novamente mais tarde." });
    }
})

router.post('/register', validateOrigin, async (req, res) => {
    try {
        const { name, email, password, code } = req.body;

        const role = "parceiro";

        if (name.trim().length < 3) {
            return res.status(401).json({ message: "Nome completo deve ter pelo menos 3 caracteres." });
        }

        if (!Utils.validateEmail(email)) {

            return res.status(401).json({ message: "Email inválido." });
        }

        if (password.length < 6) {
            return res.status(401).json({ message: "Senha deve ter pelo menos 6 caracteres." });
        }

        if (!Utils.validatePassword(password)) {
            return res.status(401).json({ message: "A senha precisa ter letras, números e caracteres." });
        }

        const existingUser = await User.findOne({
            where: { [Sequelize.Op.or]: [{ email }] }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já foi utilizado.' });
        }

        if (code.trim().length < 3) {
            return res.status(401).json({ message: "Digite o código de convite." });
        }

        const hasCode = await UserParceiroConvite.findOne({ where: { code: code } });
        if (!hasCode) {
            return res.status(401).json({ message: "Esse código de convite não existe." });
        }

        if (hasCode?.used || hasCode?.user_id) {
            return res.status(401).json({ message: "Esse código de convite já foi expirado." });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password_hash,
            phone: "",
            role,
            affiliate_code: Utils.makeid(6),
            convite_code: code,
        });

        await UserParceiroConvite.update(
            {
                used: true,
                user_id: newUser?.id,
            },
            {
                where: { code: hasCode?.code }
            },
        );

        return res.status(201).json(true);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});

router.put('/users', validateToken, async (req, res) => {
    const id = req.user.id;
    const { name, phone } = req.body;
    const errors = [];

    try {

        if (name.trim().length < 3) {
            errors.push("Nome completo deve ter pelo menos 3 caracteres");
        }

        if (!Utils.validatePhone(phone)) {
            errors.push("Celular deve conter 11 dígitos (DDD + número)");
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
});

router.get('/get-by-phone/:phone', validateOrigin, async (req, res) => {
    try {
        const { phone } = req.params;

        const user = await User.findOne({ where: { phone } });

        if (!user || user == null) {
            return res.status(404).json({ message: "Usuário não encontrado.", data: null });
        }

        return res.status(200).json({
            message: "Usuário recuperado com sucesso!", data: {
                id: user?.id,
                email: user?.email,
                name: user?.name,
                phone: user?.phone,
                cpf: user?.cpf,
                role: user?.role,
            }
        });
    } catch (err) {
        return res.status(500).json({ error: 'Erro interno.' });
    }
})

router.post('/pre-register', validateOrigin, async (req, res) => {
    try {
        const { name, phone, email, cpf } = req.body;

        if (name?.trim()?.length < 3) {
            return res.status(400).json({ message: "Nome inválido.", data: null });
        }

        if (!Utils.validatePhone(phone)) {
            return res.status(400).json({ message: "Celular inválido.", data: null });
        }

        if (!Utils.validateEmail(email)) {
            return res.status(400).json({ message: "Email inválido.", data: null });
        }

        if (!Utils.validateCPF(cpf)) {
            return res.status(400).json({ message: "CPF inválido.", data: null });
        }

        const userPhone = await User.findOne({
            where: {
                [Op.or]: [{ phone }]
            }
        });

        const userEmail = await User.findOne({
            where: {
                [Op.or]: [{ email }]
            }
        });

        if (userPhone) {
            return res.status(400).json({ message: "Usuário com esse celular já existe.", data: null });
        }

        if (userEmail) {
            return res.status(400).json({ message: "Usuário com esse email já existe.", data: null });
        }

        const newUser = await User.create({
            name,
            phone,
            email,
            cpf,
            role: "USER",
            affiliate_code: Utils.makeid(6)
        });

        return res.status(201).json({
            message: "Usuário registrado com sucesso!", data: {
                id: newUser?.id,
                email: newUser?.email,
                name: newUser?.name,
                phone: newUser?.phone,
                cpf: newUser.cpf,
            }
        });

    } catch (err) {
        return res.status(500).json({ error: 'Erro interno.' });
    }
})

router.get('/faturas/:user_id', validateOrigin, async (req, res) => {
    const { user_id } = req.params;

    try {
        // Consulta SQL para obter as faturas e os bilhetes associados
        const query = `
            SELECT 
                f.id AS fatura_id,
                f.id_remessa,
                f.status AS fatura_status,
                f.subtotal,
                f.total,
                f.data_compra,
                f.taxa_cliente,
                b.id AS bilhete_id,
                b.numero,
                b.numero_texto,
                b.status AS bilhete_status,
                s.name AS nome_sorteio
            FROM tb_faturas f
            INNER JOIN tb_sorteios s ON f.sorteio_id = s.id
            LEFT JOIN tb_bilhetes b ON f.id_remessa = b.id_remessa
            WHERE f.user_id = :user_id
            ORDER BY f.data_compra DESC;
        `;

        const resultados = await sequelize.query(query, {
            replacements: { user_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        // Organizando as faturas e seus bilhetes dentro de um objeto
        const faturas = [];

        // Mapeia os resultados e agrupa os bilhetes por fatura
        resultados.forEach((row) => {
            let fatura = faturas.find(f => f.fatura_id === row.fatura_id);

            if (!fatura) {
                fatura = {
                    fatura_id: row.fatura_id,
                    id_remessa: row.id_remessa,
                    fatura_status: row.fatura_status,
                    subtotal: row.subtotal,
                    total: row.total,
                    data_compra: row.data_compra,
                    nome_sorteio: row.nome_sorteio,
                    taxa_cliente: row.taxa_cliente,
                    bilhetes: []
                };
                faturas.push(fatura);
            }

            if (row.bilhete_id) {
                fatura.bilhetes.push({
                    bilhete_id: row.bilhete_id,
                    numero: row.numero,
                    numero_texto: row.numero_texto,
                    bilhete_status: row.bilhete_status
                });
            }
        });

        // Retorna as faturas com os bilhetes agrupados
        return res.status(200).json(faturas);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno: ' + err });
    }
});

router.get('/fatura/:id_remessa', validateOrigin, async (req, res) => {
    const { id_remessa } = req.params;
    try {

        const fatura = await Fatura.findOne({ where: { id_remessa } });
        const sorteio = await Sorteio.findOne({ where: { id: fatura?.sorteio_id } });
        const imagem = await SorteioImagens.findOne({
            where: { sorteio_id: fatura?.sorteio_id },
            attributes: ['id']
        });
        const bilhetesCount = await Bilhete.count({ where: { id_remessa } });
        const user = await User.findOne({ where: { id: fatura?.user_id } });

        return res.status(200).json({
            fatura: fatura,
            sorteio: sorteio,
            qtd: bilhetesCount,
            imagem: imagem?.id,
            user: {
                cpf: user?.cpf,
                name: user?.name,
                email: user?.email,
                phone: user?.phone
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno: ' + err });
    }
})

router.get('/:user_id/taxas', validateOrigin, async (req, res) => {
    const { user_id } = req.params;
    try {
        const sorteioParceiro = await SorteioParceiro.findOne({ where: { user_id } });
        return res.status(200).json(sorteioParceiro?.taxa_cliente);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno: ' + err });
    }
})

////////////////////////////////////////////////////////////////PARCEIRO////////////////////////////////////////////////////////////

router.get('/parceiro/campanhas', validateToken, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if (!user || user == null) {
            return res.status(404).json({ message: "Parceiro não encontrado.", data: null });
        }

        let user_id = user?.id;

        const query = `
            SELECT A.*, 
                (SELECT B.id 
                    FROM tb_sorteio_imagens AS B 
                    WHERE B.sorteio_id = A.id 
                    LIMIT 1) AS id_imagem,
                (COUNT(C.id) / CAST(D.valor AS FLOAT)) * 100 AS progresso
            FROM ticketdigital.tb_sorteios AS A
            LEFT JOIN tb_bilhetes AS C ON C.sorteio_id = A.id AND C.status = 'PAGO'
            LEFT JOIN tb_sorteio_regras AS D ON A.sorteio_regras_id = D.id
            WHERE A.user_id = :user_id
            GROUP BY A.id, D.valor;
        `;

        const resultados = await database.query(query, {
            replacements: { user_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const campanhas = [];

        resultados.forEach((row) => {
            let obj = {
                id_imagem: row.id_imagem,
                name: row.name,
                valor_por_bilhete: row.valor_por_bilhete,
                keybind: row.keybind,
                status: row.status,
                progresso: Number(row?.progresso)
            }
            campanhas.push(obj);
        })

        return res.status(200).json(campanhas);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno: ' + err });
    }
})

router.get('/parceiro/pedidos', validateToken, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if (!user || user == null) {
            return res.status(404).json({ message: "Parceiro não encontrado.", data: null });
        }

        let user_id = user?.id;

        const query = `
            SELECT 
                F.id, 
                F.id_remessa, 
                F.status, 
                F.subtotal, 
                F.desconto, 
                F.taxa_afiliado, 
                F.total, 
                F.data_compra, 
                F.taxa_cliente, 
                U.name, 
                S.name AS sorteio_name,
                F.quantidade
            FROM tb_faturas AS F 
                INNER JOIN tb_users AS U ON F.user_id=U.id 
                INNER JOIN tb_sorteios AS S ON F.sorteio_id=S.id
            WHERE sorteio_id IN (SELECT id FROM tb_sorteios WHERE user_id=:user_id)
            ORDER BY F.data_compra DESC LIMIT 1000;
        `;

        const resultados = await database.query(query, {
            replacements: { user_id },
            type: Sequelize.QueryTypes.SELECT,
        });

        const pedidos = [];

        resultados.forEach((row) => {
            let obj = {
                id: row.id,
                id_remessa: row?.id_remessa,
                status: row?.status,
                subtotal: row?.subtotal,
                desconto: row?.desconto,
                taxa_afiliado: row?.taxa_afiliado,
                total: row?.total,
                data_compra: row?.data_compra,
                taxa_cliente: row?.taxa_cliente,
                name: row?.name,
                sorteio_name: row?.sorteio_name,
                quantidade: row?.quantidade
            }
            pedidos.push(obj);
        })

        return res.status(200).json(pedidos);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro interno: ' + err });
    }
})

module.exports = router;