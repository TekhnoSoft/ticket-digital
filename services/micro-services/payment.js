const cron = require('node-cron');
const Fatura = require('../models/fatura');
const Bilhete = require('../models/bilhete');
const Sorteio = require('../models/sorteio');
const SorteioParceiro = require('../models/sorteio_parceiro');
const { Op } = require('sequelize');

var axios = require("axios");

const paymentThread = () => {
    // A cada 10 segundos, consultar pagamento de fatura pendente.
    cron.schedule('*/20 * * * * *', async () => {
        try {

            const faturas = await Fatura.findAll({
                attributes: ['sorteio_id', 'id_payment_response', 'id_remessa', 'tipo'],
                where: {
                    status: "AGUARDANDO_PAGAMENTO",
                    id_payment_response: {
                        [Op.ne]: null
                    }
                }
            });

            //console.log(faturas);

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

                //console.log(response);
        
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
