import React, { useEffect, useState } from 'react';
import { Card, FragmentView, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import Api from '../../Api';
import Environment from '../../Environment';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [campanhas, setCampanhas] = useState([]);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success: campanhaSuccess, data: dataCampanhas } = await Utils.processRequest(Api.geral.getCampanhas, {});
        if (campanhaSuccess) {
            setCampanhas(dataCampanhas);
        }
        setLoaded(true);
    }

    return (
        <FragmentView headerMode={"USER"}>
            <div className='responsive-margin'>
                <SpaceBox space={20} />
                <h2 className='text-opacity'>Catálogo de ebooks</h2>
                <SpaceBox space={20} />
                {!loaded ? (
                    <>
                        <SpaceBox space={10} />
                        <center><b>Carregando...</b></center>
                        <SpaceBox space={10} />
                    </>
                ) : (null)}
                {loaded && campanhas?.length <= 0 ? (
                    <>
                        <SpaceBox space={10} />
                        <center><b>Não há ebooks no momento :(</b></center>
                        <SpaceBox space={10} />
                    </>
                ) : (null)}
                <div className="grid-container">
                    {campanhas?.map((campanha) => (
                        <Card key={campanha.id} style={{ cursor: 'pointer' }} onClick={() => {navigate(`/campanha/${campanha?.keybind}`)}}>
                            <img src={Environment.API_BASE + `/sorteios/imagem/${campanha?.id_imagem}` || `../placeholder-image.png`} alt={campanha.name} className="card-img" />

                            <b className='b-text' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                {campanha?.name?.toLocaleUpperCase() || '...'}
                            </b>
                            <SpaceBox space={8} />
                            <div className='info-oferta' style={{ display: 'flex', alignItems: 'center' }}>
                                <label className='text-opacity'>Por apenas</label>&nbsp;&nbsp;
                                <div style={{ background: 'var(--primary-color)', borderRadius: '4px', padding: '4px 8px' }}>
                                    <b className='oferta-valor text-opacity' style={{ color: 'white' }}>{Utils.convertNumberToBRL(campanha?.valor_por_bilhete)}</b>
                                </div>
                            </div>

                        </Card>
                    ))}
                </div>
                <SpaceBox space={40} />
            </div>
        </FragmentView>
    )
}
