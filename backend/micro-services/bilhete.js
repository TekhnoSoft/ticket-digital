const cron = require('node-cron');
const Bilhete = require('../models/bilhete');
const { Op } = require('sequelize');
const Sorteio = require('../models/sorteio');
const moment = require('moment');
const Utils = require('../utils');

const prazoPagamentoEmMinutos = {
    "5MIN": 5,
    "10MIN": 10,
    "15MIN": 15,
    "30MIN": 30,
    "1H": 60,
    "5H": 300,
    "10H": 600,
    "24H": 1440,
};

const bilheteThread = () => {
    //a cada 15 segundos, verificar se o bilhete já foi pago no minuto configurado do sorteio e invalida-lo
    cron.schedule('*/15 * * * * *', async () => {
        try {
            const sorteios = await Sorteio.findAll({
                where: {
                    status: {
                        [Op.in]: ["ATIVO"],
                    },
                },
                attributes: ['id', 'prazo_pagamento'],
            });

            if (sorteios.length === 0) return;

            for (const sorteio of sorteios) {
                const minutosPrazo = prazoPagamentoEmMinutos[sorteio.prazo_pagamento];
                if (!minutosPrazo) continue;

                let offset = 0;
                const limit = 1000;

                while (true) {
                    const bilhetes = await Bilhete.findAll({
                        where: {
                            status: "INDISPONIVEL",
                            sorteio_id: sorteio.id,
                        },
                        limit,
                        offset,
                    });

                    if (bilhetes.length === 0) break;

                    const bilheteIdsParaExcluir = [];

                    for (const bilhete of bilhetes) {
                        const prazoCompra = moment(bilhete.prazo_compra); 
                        const agora = Utils.getDateNow();
                        if (agora.isAfter(prazoCompra)) {
                            bilheteIdsParaExcluir.push(bilhete.id);
                        }
                    }

                    if (bilheteIdsParaExcluir.length > 0) {
                        await Bilhete.destroy({
                            where: {
                                id: {
                                    [Op.in]: bilheteIdsParaExcluir,
                                }
                            }
                        });
                    }

                    offset += limit;
                }
            }
        } catch (error) {
            console.error('Erro ao executar tarefa cron:', error);
        }
    });
}

module.exports = bilheteThread;