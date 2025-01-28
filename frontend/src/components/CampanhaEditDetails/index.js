import React from 'react';
import './style.css';
import Card from '../Card';
import SpaceBox from '../SpaceBox';
import Hr from '../Hr';

export default ({ id }) => {
    return (
        <>
            <Card title={"Detalhes"} icon={<ion-icon name="timer-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src='../placeholder-image.png' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Título:</div>
                            <b style={{ color: 'black' }}>Sorteio do velho corola sujo clonado</b>
                        </div>
                        <SpaceBox space={10} />
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Status:</div>
                            <div>
                                Aguardando Pagamento
                            </div>
                        </div>
                    </div>
                </div>
                <SpaceBox space={15} />
                <Hr elevation={1} />
                <SpaceBox space={15} />
                <div style={{}}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        padding: '10px'
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas disponíveis:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas pagas:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Cotas reservadas:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                    </div>
                </div>
                <SpaceBox space={10} />
                <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Progresso:</div>
                    <div className="progress-c">
                        <div className="progress-bar-c" style={{ width: `${50}%` }}>
                            <span className="progress-text-c">{50}%</span>
                        </div>
                    </div>
                </div>
            </Card>
            <SpaceBox space={20} />
            <Card title={"Métricas"} icon={<ion-icon name="analytics-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <div style={{}}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        padding: '10px'
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Total arrecadado:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Pedidos:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Usuários:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: 'var(--text-opacity)' }}>Ticket Médio:</div>
                            <b style={{ color: 'black' }}>0</b>
                        </div>
                    </div>
                </div>
            </Card>
            <SpaceBox space={80} />
        </>
    )
}
