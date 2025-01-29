import React, { useEffect, useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import Button from '../../components/Button';
import Api from '../../Api';
import Utils from '../../Utils';
import { Card, Input, Modal } from '../../components';

export default () => {

    const [loaded, setLoaded] = useState(false);
    const [operadoras, setOperadoras] = useState([]);
    const [showModalConfigure, setShowModalConfigure] = useState(false);
    const [selectedOperadora, setSelectedOperadora] = useState(null);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getPagamentoOperadoras, {});
        if (success) {
            setOperadoras(data);
        }
        setLoaded(true);
    }

    const configureModalOnCloseCallback = () => {
        setSelectedOperadora(null);
    }

    const handleShowModal = (operadora) => {
        setSelectedOperadora(operadora);
        setShowModalConfigure(true);
    }

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <Modal onCloseCallback={configureModalOnCloseCallback} setShow={setShowModalConfigure} show={showModalConfigure}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ion-icon name="wallet-outline"></ion-icon>
                    <h3 style={{ color: 'var(--text-opacity)' }}>Pagamentos</h3>
                </div>
                <SpaceBox space={15} />
                {selectedOperadora?.ativo ? (
                    <>
                        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', border: 'dashed 1px #ddd' }}>
                            <b>Está com dúvidas?</b>
                            <SpaceBox space={5} />
                            <div>
                                <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>
                                    {selectedOperadora?.tutorial_text}
                                </span>
                            </div>
                            <SpaceBox space={15} />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <Button onClick={() => { window.open(selectedOperadora?.tutorial_cta, 'blank'); }} style={{background: 'rgb(237 237 237)', color: 'black'}}>Como configurar <ion-icon name="open-outline"></ion-icon></Button>
                            </div>
                        </div>
                        <SpaceBox space={15} />
                        {selectedOperadora?.field_public_key == true ? (<Input type={"password"} label={"Public Key"} />) : (null)}
                        {selectedOperadora?.field_access_token == true ? (<Input type={"password"} label={"Access Token"} />) : (null)}
                        {selectedOperadora?.field_client_key == true ? ( <Input type={"password"} label={"Client Key"} />) : (null)}
                        {selectedOperadora?.field_secret_key == true ? (<Input type={"password"} label={"Client Secret"} />) : (null)}
                        <SpaceBox space={15} />
                        <Button style={{ width: '100%' }}>Adicionar</Button>
                    </>
                ) : (
                    <>
                        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', border: 'dashed 1px #ddd' }}>
                            <b>Em breve!</b>
                            <SpaceBox space={5} />
                            <div>
                                <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>
                                    Em breve, disponibilizaremos esse método para você.
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
            <SpaceBox space={8} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Pagamentos</h2>
            </div>
            <SpaceBox space={15} />
            {loaded ? (
                operadoras?.length > 0 ? (
                    operadoras?.map(op => (
                        <>
                            <Card style={{ maxWidth: '1000px' }}>
                                <div style={{ padding: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <img src={op?.logo_uri} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '8px', background: 'rgb(242, 242, 242)', padding: '8px' }} />
                                            <div>
                                                <h3>{op?.nome}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <Button onClick={() => { handleShowModal(op) }} style={{ background: 'rgb(242, 242, 242)', color: 'black' }}><b>Configurar</b></Button>
                                        </div>
                                    </div>
                                    <div>
                                        <SpaceBox space={10} />
                                        <div>
                                            <label style={{ color: 'var(--text-opacity)' }}>{op?.description}</label>&nbsp;&nbsp;
                                            <b style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { window.open(op?.taxas_uri, 'blank') }}>Ver Taxas</b>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <SpaceBox space={15} />
                        </>
                    ))
                ) : (
                    <>
                        <SpaceBox space={40} />
                        <center><b>Não há operadoras...</b></center>
                        <SpaceBox space={40} />
                    </>
                )
            ) : (
                <>
                    <SpaceBox space={40} />
                    <center><b>Carregando...</b></center>
                    <SpaceBox space={40} />
                </>
            )}
        </FragmentView>
    )
}
