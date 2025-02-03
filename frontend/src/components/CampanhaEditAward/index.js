import React, { useEffect, useState } from 'react';
import './style.css';
import Modal from '../Modal';
import SpaceBox from '../SpaceBox';
import Card from '../Card';
import Input from '../Input';
import Utils from '../../Utils';
import Button from '../Button';
import Api from '../../Api';

export default ({ id }) => {

    const [loaded, setLoaded] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [showModalPremios, setShowModalPremios] = useState(false);
    const [premios, setPremios] = useState([]);
    const [tituloPremio, setTituloPremio] = useState("");
    const [descricaoPremio, setDescricaoPremio] = useState("");

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getCampanhaPremios, { campanha_id: id });
        if (success) {
            setPremios(data);
        }
        setLoaded(true);
    }

    const addPremioHandler = () => {
        setShowModalPremios(true);
    }

    const onClosePremiosCallback = () => {
        setShowModalPremios(false);
    }

    const handleAdd = async (novoPremio) => {
        if (Utils.stringIsNullOrEmpty(novoPremio?.name)) {
            Utils.notify("error", "Digite o título do prêmio.")
            return;
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.newCampanhaPremio, { campanha_id: id, premio: {name: novoPremio?.name, description: novoPremio?.description} }, true);
        
        if(success){
            Utils.notify("success", "Prêmio adicionado com sucesso.");
            load();
        }

        setPremios((prev) => [...prev, novoPremio]);
        setShowModalPremios(false);
        setTituloPremio("");
        setDescricaoPremio("");
    }

    const handleRemove = async (_id) => {
        setPremios((prev) => prev.filter((premio) => premio.id !== _id));
        const { success, data } = await Utils.processRequest(Api.parceiro.deleteCampanhaPremio, { campanha_id: id, premio_id: _id }, true);
        if(success){
            Utils.notify("success", "Prêmio removido com sucesso.");
            load();
        }
    }

    return (
        <>
            <Modal onCloseCallback={onClosePremiosCallback} setShow={setShowModalPremios} show={showModalPremios}>
                <div>
                    <div className="card-header">
                        <div className="icon-circle">
                            <ion-icon name="trophy-outline"></ion-icon>
                        </div>
                        <h3>Adicionar {premios?.length + 1}º prêmio</h3>
                    </div>
                    <SpaceBox space={8} />
                    <Input type={"text"} label={"Título"} setValue={setTituloPremio} value={tituloPremio} />
                    <Input type={"textarea"} label={"Descrição"} setValue={setDescricaoPremio} value={descricaoPremio} />
                    <SpaceBox space={8} />
                    <Button style={{ width: '100%' }} onClick={() => handleAdd({ id: Date.now(), name: tituloPremio, description: descricaoPremio })}>Adicionar</Button>
                </div>
            </Modal>

            <div style={{ width: '100%', textAlign: premios?.length > 0 ? 'left' : 'center', maxWidth: '1000px'}}>
                <SpaceBox space={20} />
                <h2>Prêmio(s)</h2>
                <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>Insira um ou mais prêmios que os ganhadores serão contemplados:</span>
                {premios?.length <= 0 ? (
                    <>
                        <div className='trofeu'>
                            <ion-icon name="trophy-outline"></ion-icon>
                        </div>
                        <SpaceBox space={15} />
                        <div onClick={addPremioHandler} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center', padding: '20px', borderRadius: '8PX', border: 'dashed 1px gray' }}>
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <b>Adicionar prêmio</b>
                        </div>
                        <SpaceBox space={20} />
                    </>
                ) : (
                    <>
                        <SpaceBox space={20} />
                        {premios?.map((p, index) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <b style={{ fontSize: '28px' }}>{index + 1}º</b>
                                <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '20px' }}>
                                    <b>{p?.name}</b>
                                    <ion-icon onClick={() => { handleRemove(p?.id) }} name="trash-outline" size={"large"} style={{ cursor: 'pointer', color: 'rgb(82, 82, 82)' }}></ion-icon>
                                </Card>
                            </div>
                        ))}
                        <SpaceBox space={15} />
                        <div onClick={addPremioHandler} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center', padding: '20px', borderRadius: '8PX', border: 'dashed 1px gray' }}>
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <b>Adicionar prêmio</b>
                        </div>
                        <SpaceBox space={20} />
                    </>
                )}
            </div>
        </>
    )
}
