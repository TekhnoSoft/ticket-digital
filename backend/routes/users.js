const express = require('express');
const User = require('../models/users');
const { validateOrigin } = require('../middlewares/CorsMiddleware');
const { validateToken } = require('../middlewares/AuthMiddleware');
const Utils = require('../utils');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/auth', validateToken, async (req, res) => {
    try{
        return res.json({message: "Token válido", data: req.user.id});
    }catch(err){
        return res.json({message: "Erro ao recuperar o token", data: null});
    }
})

router.get('/get', validateToken, async (req, res) => {
    try {
        let id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if(!user || user == null){
            return res.status(404).json({ message: "Cliente não encontrado.", data: null });
        }
        return res.status(200).json({  message: "Cliente recuperado com sucesso!", data: {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            role: user?.role,
        }});
    } catch (error) {
        return res.status(400).json({ message: error.message, data: null });
    }
});

router.post('/login', validateOrigin, async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = [];

        if (!Utils.validateEmail(email)) {
            errors.push("Email inválido");
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({message: "Credenciais inválidas." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Credenciais inválidas." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

        return res.status(201).json({message: "Login realizado com sucesso.", token });
    } catch (error) {
        return res.status(500).json({message: "Erro no servidor. Tente novamente mais tarde." });
    }
})

router.post('/register', validateOrigin, async (req, res) => {
    try {
        const { name, phone, email, password, role, affiliate_code } = req.body;
        const errors = [];

        if (name.trim().length < 3) {
            errors.push("Nome completo deve ter pelo menos 3 caracteres");
        }

        if (!Utils.validatePhone(phone)) {
            errors.push("Celular deve conter 11 dígitos (DDD + número)");
        }

        if (!Utils.validateEmail(email)) {
            errors.push("Email inválido");
        }

        if (password.length < 6) {
            errors.push("Senha deve ter pelo menos 6 caracteres");
        }

        if (!Utils.validatePassword(password)) {
            errors.push("A senha precisa ter letras, números e caracteres.");
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const existingUser = await User.findOne({
            where: { [Sequelize.Op.or]: [{ phone }, { email }] }
        });

        if (existingUser) {
            return res.status(400).json({ errors: ['Telefone ou email já estão cadastrados.'] });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            phone,
            email,
            password_hash,
            role,
            affiliate_code
        });

        return res.status(201).json({ user: newUser });
    } catch (error) {
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
    try{
        const {phone} = req.params;

        const user = await User.findOne({ where: { phone } });

        if(!user || user == null){
            return res.status(404).json({ message: "Usuário não encontrado.", data: null });
        }

        return res.status(200).json({  message: "Usuário recuperado com sucesso!", data: {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            cpf: user?.cpf,
            role: user?.role,
        }});
    }catch(err){
        return res.status(500).json({ error: 'Erro interno.' });
    }
})

router.post('/pre-register', validateOrigin, async (req, res) => {
    try{
        const {name, phone, email, cpf} = req.body;

        if(name?.trim()?.length < 3){
            return res.status(400).json({ message: "Nome inválido.", data: null });
        }

        if(!Utils.validatePhone(phone)){
            return res.status(400).json({ message: "Celular inválido.", data: null });
        }

        if(!Utils.validateEmail(email)){
            return res.status(400).json({ message: "Email inválido.", data: null });
        }

        if(!Utils.validateCPF(cpf)){
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

        if(userPhone){
            return res.status(400).json({ message: "Usuário com esse celular já existe.", data: null });
        }

        if(userEmail){
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

        return res.status(201).json({  message: "Usuário registrado com sucesso!", data: {
            id: newUser?.id,
            email: newUser?.email,
            name: newUser?.name,
            phone: newUser?.phone,
            cpf: newUser.cpf,
        }});

    }catch(err){
        return res.status(500).json({ error: 'Erro interno.' });
    }
})

module.exports = router;