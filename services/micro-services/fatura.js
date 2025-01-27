const cron = require('node-cron');
const Fatura = require('../models/fatura');
const Bilhete = require('../models/bilhete');
const { Op } = require('sequelize');

const faturaThread = () => {
    // A cada 30 segundos, alterar o status da fatura para cancelado se não tiver nenhum bilhete com o id_remessa da fatura.
    cron.schedule('*/30 * * * * *', async () => {
        try {
            const faturas = await Fatura.findAll({
                where: {
                    status: "AGUARDANDO_PAGAMENTO",
                    tipo: "BILHETE"
                },
            });
            for (const fatura of faturas) {
                const bilheteCount = await Bilhete.count({
                    where: {
                        id_remessa: fatura?.id_remessa,
                    },
                });

                if (bilheteCount <= 0) {
                    await fatura.update({ status: 'CANCELADO' });
                }
            }
        } catch (error) {
            console.error('Erro ao executar tarefa cron:', error);
        }
    });
}

module.exports = faturaThread;
