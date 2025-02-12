const cron = require('node-cron');
const Fatura = require('../models/fatura');
const Bilhete = require('../models/bilhete');
const Sorteio = require('../models/sorteio');
const SorteioParceiro = require('../models/sorteio_parceiro');
const { Op } = require('sequelize');

var axios = require("axios");
const User = require('../models/users');
const EmailFila = require('../models/email_fila');
const Ebook = require('../models/ebook');

const paymentThread = () => {
    // A cada 10 segundos, consultar pagamento de fatura pendente.
    cron.schedule('*/20 * * * * *', async () => {
        try {

            const faturas = await Fatura.findAll({
                attributes: ['sorteio_id', 'id_payment_response', 'id_remessa', 'tipo', 'user_id'],
                where: {
                    status: "AGUARDANDO_PAGAMENTO",
                    id_payment_response: {
                        [Op.ne]: null
                    }
                }
            });

            for (const fatura of faturas) {
                
                const sorteio = await Sorteio.findOne({ where: { id: fatura?.sorteio_id } });
                const sorteioParceiro = await SorteioParceiro.findOne({ where: { user_id: sorteio?.user_id } });

                const url = `${process.env.MERCADO_PAGO_PAYMENT_URI}${fatura?.id_payment_response}`;
                const token = fatura?.tipo == "BILHETE" ? sorteioParceiro?.operadoraAccessToken : process.env.MERCADO_PAGO_ACESS_TOKEN;

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                const status = response.data?.status;
        
                if (status == "approved") {
                    await Fatura.update(
                        {
                            status: "PAGO",
                        },
                        {
                            where: { id_payment_response: fatura?.id_payment_response }
                        },
                    );
                    if(fatura?.tipo == "BILHETE"){

                        await Bilhete.update(
                            {
                                status: "PAGO",
                            },
                            {
                                where: { id_remessa: fatura?.id_remessa }
                            },
                        );

                        const user = await User.findOne({
                            where:{
                                id: fatura?.user_id
                            }
                        })

                        const numeros = await Bilhete.findAll({
                            where: {
                                id_remessa: fatura?.id_remessa,
                                status: "PAGO"
                            },
                            attributes: ['numero']
                        });

                        const ebook = await Ebook.findOne({
                            where:{
                                sorteio_id: sorteio?.id
                            }
                        })

                        let link = ebook ? ebook?.link : "";

                        await EmailFila.create({
                            from: 'server',
                            to: user?.email,
                            subject: 'Ebook da Sorte - Seu ebook chegou! 🔥',
                            content: '<b>Seus números:</b> <br/>' + numeros?.map(b => b.numero).join(', ') + 
                                     '<br/><b>Acesse o ebook:</b> <a href="'+link+'">acessar ebook</a>'
                        })

                    }else if(fatura?.tipo == "CAMPANHA"){
                        await Sorteio.update(
                            {
                                status: 'ATIVO',
                            },
                            {
                                where: { id: sorteio?.id }
                            },
                        )
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao executar tarefa cron:', error);
        }
    });
}

module.exports = paymentThread;
