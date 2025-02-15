import React, { useEffect, useState } from 'react';
import './style.css';
import Utils from '../../Utils';
import SpaceBox from '../SpaceBox';
import Button from '../Button';
import Api from '../../Api';
import Modal from '../Modal';
import Input from '../Input';
import ModalConfirm from '../ModalConfirm';
import Hr from '../Hr';

export default ({ id }) => {

    const [loaded, setLoaded] = useState(true);
    const [bilhetes, setBilhetes] = useState([]);
    const [showModalCotas, setShowModalCotas] = useState(false);
    const [numero, setNumero] = useState("");
    const [premio, setPremio] = useState("");
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [showModalDeleteCota, setShowModalDeleteCota] = useState(false);
    const [showModalModoCota, setShowModalModoCota] = useState(false);
    const [showModalCotasRandom, setShowModalCotasRandom] = useState(false);
    const [showModalNumeroAleatorio, setShowModalNumeroAleatorio] = useState(false);
    const [numeroAleatorio, setNumeroAleatorio] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getCotasPremiadas, { campanha_id: id });
        if (success) {
            setBilhetes(data);
        }
        setLoaded(true);
    }

    const getStatusProps = (winner) => {
        if (winner) {
            return {
                status: "finalizado",
                text: "Indisponível"
            }
        } else {
            return {
                status: "pago",
                text: "Disponível"
            }
        }
    }

    const onCloseCotasCallback = () => {
        setNumero("");
        setPremio("");
    }

    const handleAdd = async () => {
        setShowButtonLoader(true);

        if (Utils.stringIsNullOrEmpty(numero)) {
            Utils.notify("error", "Informe o numero da cota.");
            setShowButtonLoader(false);
            return;
        }

        if (Utils.stringIsNullOrEmpty(premio)) {
            Utils.notify("error", "Informe o nome do prêmio.");
            setShowButtonLoader(false);
            return;
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.saveCotaPremiada, { campanha_id: id, numero, premio }, true);

        if (success) {
            Utils.notify("success", "Cota premiada adicionada.")
            setShowModalCotas(false);
            onCloseCotasCallback();
            load();
        }

        setShowButtonLoader(false);
    }

    const handleAddRandom = async () => {
        setShowButtonLoader(true);

        if (Utils.stringIsNullOrEmpty(premio)) {
            Utils.notify("error", "Informe o nome do prêmio.");
            setShowButtonLoader(false);
            return;
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.saveCotaPremiadaAleatoria, { campanha_id: id, premio }, true);

        if (success) {
            Utils.notify("success", "Cota premiada adicionada.")
            setNumeroAleatorio(data);
            setShowModalCotasRandom(false);
            setShowModalNumeroAleatorio(true);
            onCloseCotasCallback();
            load();
        }

        setShowButtonLoader(false);
    }

    const handleRemove = (item) => {
        setShowModalDeleteCota(true);
        setSelectedItem(item);
    }

    const onCancelCotaDelete = () => {
        setShowModalDeleteCota(false);
        setSelectedItem(null);
    }

    const onConfirmCotaDelete = async () => {
        if (!selectedItem?.winner) {
            setBilhetes((prev) => prev.filter((b) => b.id !== selectedItem?.id));
        }
        setShowModalDeleteCota(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.deleteCampanhaCotaPremiada, { campanha_id: id, cota_id: selectedItem?.id, numero: selectedItem?.numero }, true);
        if (success) {
            Utils.notify("success", "Cota premiada removida com sucesso.");
            load();
            onCancelCotaDelete();
        }

    }

    const onCloseCotaModoCallback = async () => { }

    const onCloseAleatorioCallback = async () => {
        setNumeroAleatorio(null);
    }

    return (
        <>
            <Modal onCloseCallback={onCloseCotasCallback} setShow={setShowModalCotas} show={showModalCotas}>
                <div>
                    <div className="card-header">
                        <div className="icon-circle">
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h3>Adicionar cota premiada</h3>
                    </div>
                    <SpaceBox space={8} />
                    <Input type={"number"} label={"Número da cota"} setValue={setNumero} value={numero} />
                    <Input type={"text"} label={"Nome do prêmio"} setValue={setPremio} value={premio} />
                    <SpaceBox space={8} />
                    <Button disabled={showButtonLoader} style={{ width: '100%' }} onClick={handleAdd}>
                        {showButtonLoader ? (
                            <>
                                &nbsp;<div class="loader"></div>
                            </>
                        ) : (<>Adicionar</>)}
                    </Button>
                </div>
            </Modal>
            <Modal onCloseCallback={onCloseCotasCallback} show={showModalCotasRandom} setShow={setShowModalCotasRandom}>
                <div>
                    <div className="card-header">
                        <div className="icon-circle">
                            <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h3>Adicionar cota premiada</h3>
                    </div>
                    <SpaceBox space={8} />
                    <Input type={"text"} label={"Nome do prêmio"} setValue={setPremio} value={premio} />
                    <SpaceBox space={8} />
                    <Button disabled={showButtonLoader} style={{ width: '100%' }} onClick={handleAddRandom}>
                        {showButtonLoader ? (
                            <>
                                &nbsp;<div class="loader"></div>
                            </>
                        ) : (<>Adicionar</>)}
                    </Button>
                </div>
            </Modal>
            <Modal setShow={setShowModalNumeroAleatorio} show={showModalNumeroAleatorio} onCloseCallback={onCloseAleatorioCallback}>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="star-outline"></ion-icon>
                    </div>
                    <h3>Número premiado:</h3>
                </div>
                <SpaceBox space={20}/>
                <center><h1 style={{padding: '10px', border: 'dashed 1px #ddd', borderRadius: '8px', color: 'var(--text-opacity)'}}>{Utils.formatNumberToTicket(Number(numeroAleatorio), bilhetes[0]?.valor)}</h1></center>
                <SpaceBox space={0}/>
            </Modal>
            <ModalConfirm setShow={setShowModalDeleteCota} show={showModalDeleteCota} onCancel={onCancelCotaDelete} onConfirm={onConfirmCotaDelete}>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                    <b>Confirmar remoção da cota premiada?</b>
                </div>
            </ModalConfirm>
            <Modal setShow={setShowModalModoCota} show={showModalModoCota} onCloseCallback={onCloseCotaModoCallback}>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                    <b>Como deseja adicionar a cota?</b>
                </div>
                <SpaceBox space={20} />
                <Button disabled={showButtonLoader} style={{ width: '100%' }} onClick={() => {
                    setShowModalModoCota(false);
                    setShowModalCotasRandom(true);
                }}>
                    Aleatoriamente
                </Button>
                <SpaceBox space={8} />
                <Hr elevation={1}/>
                <SpaceBox space={8} />
                <Button disabled={showButtonLoader} style={{ width: '100%' }} onClick={() => {
                    setShowModalModoCota(false);
                    setShowModalCotas(true);
                }}>
                    Manualmente
                </Button>
            </Modal>
            <div style={{ width: '100%', textAlign: 'left', maxWidth: '1000px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>Cota(s) premiadas</h2>
                    <Button onClick={() => { setShowModalModoCota(true) }}>+ Adicionar</Button>
                </div>
                <SpaceBox space={10} />
                {loaded ? (
                    bilhetes?.length > 0 ? (
                        <div className="table-container-p">
                            <table className="sales-table-p">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Número</th>
                                        <th>Prêmio</th>
                                        <th>Contemplado(a)</th>
                                        <th>Data&nbsp;de&nbsp;compra</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bilhetes.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span className={`status-bubble-p ${getStatusProps(item.winner).status}`}></span>&nbsp;{getStatusProps(item.winner).text}
                                            </td>
                                            <td>{Utils.formatNumberToTicket(item.numero, item?.valor)}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.winner || "(nenhum ganhador)"}</td>
                                            <td>{item?.data_compra ? Utils.formatDateTime(item?.data_compra)?.split(" ")?.[0] : "(não há dados)"}</td>
                                            <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center" }}>
                                                <ion-icon onClick={() => { handleRemove(item) }} name="trash-outline" size={"large"} style={{ cursor: 'pointer', color: 'rgb(82, 82, 82)' }}></ion-icon>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>) : (
                        <>
                            <SpaceBox space={40} />
                            <center><b>Não há cotas...</b></center>
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

            </div>
        </>
    )
}
