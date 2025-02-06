import React, { useEffect, useState } from 'react';
import './style.css';
import Card from '../Card';
import SpaceBox from '../SpaceBox';
import Hr from '../Hr';
import Api from '../../Api';
import Utils from '../../Utils';
import Environment from '../../Environment';

export default ({ id }) => {

    const [loaded, setLoaded] = useState(false);
    const [campanha, setCampanha] = useState(null);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getCampanhaDetails, { campanha_id: id });
        if (success) {
            setCampanha(data);
        }
        setLoaded(true);
    }    

    const getStatusProps = (status) => {
        switch (status) {
            case "AGUARDANDO_ATIVACAO":
                return {
                    className: "pendente",
                    title: "Aguardando ativação",
                }
            case "ATIVO":
                return {
                    className: "pago",
                    title: "Ativa",
                }
            case "CANCELADO":
                return {
                    className: "cancelaado",
                    title: "Cancelada",
                }
            case "FINALIZADO":
                return {
                    className: "finalizado",
                    title: "Finalizada",
                }
        }
    }

    return (
        <>
            <Card title={"Detalhes"} icon={<ion-icon name="timer-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
                    <img src={campanha?.imagens[0]?.id ? Environment.API_BASE + `/sorteios/imagem/${campanha?.imagens[0].id}` : `../placeholder-image.png`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Título:</div>
                            <b style={{ color: 'black' }}>{campanha?.name}</b>
                        </div>
                        <SpaceBox space={10} />
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Status:</div>
                            <div style={{background: 'rgba(35, 45, 60, 0.08)', borderRadius: '8px', padding: '5px 20px'}}>
                                <span className={`status-bubble-p ${getStatusProps(campanha?.status)?.className}`}></span>&nbsp;{getStatusProps(campanha?.status)?.title}
                            </div>
                        </div>
                    </div>
                </div>
                <SpaceBox space={15} />
                <Hr elevation={1} />
                <SpaceBox space={15} />
                <div style={{display: loaded ? 'block' : 'none'}}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        padding: '10px'
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas:</div>
                            <b style={{ color: 'black' }}>{campanha?.regra?.valor}</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas disponíveis:</div>
                            <b style={{ color: 'black' }}>{campanha?.regra?.valor - campanha?.pagos}</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas pagas:</div>
                            <b style={{ color: 'black' }}>{campanha?.pagos}</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas reservadas:</div>
                            <b style={{ color: 'black' }}>{campanha?.reservas}</b>
                        </div>
                    </div>
                </div>
                <SpaceBox space={10} />
                <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Progresso:</div>
                    <div className="progress-c">
                        <div className="progress-bar-c" style={{ width: `${((Number(campanha?.pagos) / Number(campanha?.regra?.valor)) * 100 || 0)}%` }}>
                            <span className="progress-text-c">{((Number(campanha?.pagos) / Number(campanha?.regra?.valor)) * 100 || 0).toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </Card>
            <SpaceBox space={20} />
            <Card title={"Métricas"} icon={<ion-icon name="analytics-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <div style={{display: loaded ? 'block' : 'none'}}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        padding: '10px'
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Total arrecadado:</div>
                            <b style={{ color: 'black' }}>{Utils.convertNumberToBRL(campanha?.pagos * campanha?.valor_por_bilhete)}</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Pedidos:</div>
                            <b style={{ color: 'black' }}>{campanha?.nFaturas}</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Total estimado:</div>
                            <b style={{ color: 'black' }}>{Utils.convertNumberToBRL((Number(campanha?.regra?.valor) * campanha?.valor_por_bilhete) || 0)}</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Ticket médio:</div>
                            <b style={{ color: 'black' }}>{Utils.convertNumberToBRL((campanha?.pagos * campanha?.valor_por_bilhete) / campanha?.pagos || 0)}</b>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
