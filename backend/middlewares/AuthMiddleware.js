const {verify} = require("jsonwebtoken");

require('dotenv').config()

const validateToken = (req, res, next) => {
    try{
        let permitedOrigins = [process.env.PERMITED_ORIGIN, process.env.PERMITED_ORIGIN_DEVELOPMENT];
        const origin = req.header('Origin');
        if(!permitedOrigins.includes(origin)){
            return res.status(404).json({error: 'CORS origin error'})
        }

        const accessToken = req.header("TICKETDIGITAL_ACCESS_TOKEN");

        if(!accessToken) return res.json({error: 'Acesso não autorizado!', success: false, data: {success: false}})

        const decoded = verify(accessToken, process.env.JWT_SECRET);

        req.user = decoded;

        if(!decoded) return res.json({error: 'Token inválido!', success: false, data: {success: false}})

        return next();
    }catch(err){
        return res.json({success: false, code: 500, message: "Acesso não autorizado.", data: err});
    }
}

module.exports = {validateToken}