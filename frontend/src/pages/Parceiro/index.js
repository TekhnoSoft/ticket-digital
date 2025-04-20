import React, { useEffect, useState, useRef } from 'react'
import FragmentView from '../../components/FragmentView'
import Input from '../../components/Input'
import SpaceBox from '../../components/SpaceBox';
import Api from '../../Api';
import Utils from '../../Utils';
import Button from '../../components/Button';
import Card from '../../components/Card';
import './style.css';
import Environment from '../../Environment';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalConfirm } from '../../components';

export default () => {

    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [campanhas, setCampanhas] = useState([]);

    const [showModalContemplar, setShowModalContemplar] = useState(false);
    const [showModalContemplarConfirm, setShowModalContemplarConfirm] = useState(false);
    const [numeroSorteado, setNumeroSorteado] = useState("");

    const [campanhaSelected, setCampanhaSelected] = useState(null);
    const [campanhaContemplado, setCampanhaContemplado] = useState(null);

    const timeoutRef = useRef(null);

    useEffect(() => {
        load();
    }, [])

    useEffect(() => {
        if (numeroSorteado) {
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                getContemplado(numeroSorteado);
            }, 1000);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [numeroSorteado]);

    const getContemplado = async (numero) => {
        const { success, data} = await Utils.processRequest(Api.parceiro.getContemplado, { campanha_id: campanhaSelected?.id, numero: numero });
        if(success){
            setCampanhaContemplado(data);
        }
    }

    const load = async () => {
        setLoaded(false);
        const { success: successCampanhas, data: dataCampanhas } = await Utils.processRequest(Api.parceiro.getCampanhas, {});
        if (successCampanhas) {
            setCampanhas(dataCampanhas);
        }
        setLoaded(true);
    }

    const getStatusProps = (status) => {
        switch (status) {
            case "AGUARDANDO_ATIVACAO":
                return {
                    background: "orange",
                    status: "Aguardando ativação"
                }
            case "ATIVO":
                return {
                    background: "green",
                    status: "Ativa"
                }
            case "FINALIZADO":
                return {
                    background: "gray",
                    status: "Finalizada"
                }
            case "CANCELADO":
                return {
                    background: "red",
                    status: "Cancelada"
                }
        }
    }

    const filteredCampanhas = campanhas.filter(campanha =>
        campanha?.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleContemplar = (campanha) => {
        setShowModalContemplar(true);
        setCampanhaSelected(campanha)
    }

    const onCancelContemplar = () => {
        setShowModalContemplar(false);
        setNumeroSorteado("");
    }

    const onCancelContemplarConfirm = () => {
        onCancelContemplar();
        setShowModalContemplarConfirm(false);
    }

    const onConfirmContemplar = async () => {
        onCancelContemplar();
        setShowModalContemplarConfirm(true);
        const { success, data } = await Utils.processRequest(Api.parceiro.confirmaContemplado, { campanha_id: campanhaSelected?.id, bilhete_id: campanhaContemplado?.bilhete?.id, user_id: campanhaContemplado?.usuario?.id });
        if (success) {}
    }

    const onConfirmContemplarConfirm = async () => {}

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <ModalConfirm show={showModalContemplar} setShow={setShowModalContemplar} onCancel={onCancelContemplar} onConfirm={onConfirmContemplar}>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="ticket-outline"></ion-icon>
                    </div>
                    <b>Qual é o número do bilhete sorteado?</b>
                </div>
                <SpaceBox space={8} />
                <Input type={"number"} label={"Número do bilhete"} setValue={setNumeroSorteado} value={numeroSorteado} />
                <SpaceBox space={8} />
                {campanhaContemplado ? (
                    <Card>
                        {/*<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <b>Bilhete:</b>
                            </div>
                            <div>
                                <label>{campanhaContemplado?.bilhete?.numero}</label>
                            </div>
                        </div>*/}
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <b>Nome:</b>
                            </div>
                            <div>
                                <label>{campanhaContemplado?.usuario?.name}</label>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <b>Email:</b>
                            </div>
                            <div>
                                <label>{campanhaContemplado?.usuario?.email}</label>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <b>Celular:</b>
                            </div>
                            <div>
                                <label>{campanhaContemplado?.usuario?.phone}</label>
                            </div>
                        </div>
                    </Card>
                ) : (null)}
                <SpaceBox space={8} />
            </ModalConfirm>
            <Modal show={showModalContemplarConfirm} setShow={setShowModalContemplarConfirm} onCancel={onCancelContemplarConfirm} onConfirm={onConfirmContemplarConfirm}>
                <div className="confetti-container">
                    <div className="confetti">
                        {Utils.getConffetis().map((item, index) => (
                            <i
                                key={index}
                                style={{
                                    '--speed': item.speed,
                                    '--bg': item.bg,
                                }}
                                className={item.shape}
                            />
                        ))}
                    </div>
                </div>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="trophy-outline"></ion-icon>
                    </div>
                    <b>Confirmação de prêmio</b>
                </div>
                <SpaceBox space={8} />
                <div className='trofeu' style={{ margin: '35px auto' }}>
                    <ion-icon name="trophy-outline"></ion-icon>
                </div>
                <div style={{textAlign: 'center'}}>
                    <h2>Parabéns 🥳!</h2>
                </div>
                <SpaceBox space={8} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', background: '#f0f0f5', border: 'solid 1px rgb(213 213 213)', padding: '2px 8px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>
                        <ion-icon name="trophy-outline"></ion-icon>&nbsp;
                        <label>{campanhaContemplado?.bilhete?.numero}</label>
                    </label>
                    <label style={{ background: '#f0f0f5', borderBottom: 'solid 1px rgb(213 213 213)', borderRight: 'solid 1px rgb(213 213 213)', borderTop: 'solid 1px rgb(213 213 213)', padding: '2px 8px', display: 'flex', alignItems: 'center', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                        <label>{campanhaContemplado?.usuario?.name}</label>
                    </label>
                </div>
                <SpaceBox space={30} />
            </Modal>
            <SpaceBox space={8} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Campanhas</h2>
                <Button onClick={() => { navigate('/parceiro-add-campanha') }}>+ campanha</Button>
            </div>
            <SpaceBox space={15} />
            <div className='search-box'>
                <Input type={"text"} hideInputBoxMargin label={"Pesquisar..."} value={search} setValue={setSearch} />
            </div>

            {loaded ? (
                filteredCampanhas.length > 0 ? (
                    <div className="grid-container-c">
                        {filteredCampanhas.map(campanha => (
                            <div className="grid-item-c" key={campanha?.id} onClick={() => { navigate(`/parceiro-edit-campanha/${campanha?.id}`) }}>
                                <div className='grid-item-c-content'>
                                    <img src={campanha?.id_imagem ? Environment.API_BASE + `/sorteios/imagem/${campanha?.id_imagem}` : `../placeholder-image.png`} alt="Campanha" className="item-image-c" />
                                    <div className="item-content-c">
                                        <span className="item-name-c">{campanha?.name}</span>
                                        <a href="#" className="item-link-c">/{campanha?.keybind}</a>
                                    </div>
                                    <div className="menu-icon-c">
                                        <ion-icon name="ellipsis-vertical" onClick={(event) => {
                                            event.stopPropagation();
                                        }}></ion-icon>
                                        <div className="menu-options-c">
                                            <div className="menu-item-c" onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(`/parceiro-edit-campanha/${campanha?.id}`);
                                            }}>
                                                <ion-icon name="create-outline"></ion-icon> Editar
                                            </div>
                                            <div className="menu-item-c" onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(`/campanha/${campanha?.keybind}`);
                                            }}>
                                                <ion-icon name="eye-outline"></ion-icon> Visualizar
                                            </div>
                                            <div className="menu-item-c" onClick={(event) => {
                                                event.stopPropagation();
                                                navigator.clipboard.writeText(`https://campanha.ebookdasorte.com/?keybind=${campanha?.keybind}`).then(() => {
                                                    Utils.notify("success", "Link copiado com sucesso.");
                                                }).catch((error) => {
                                                    Utils.notify("error", "Erro ao copiar para o clipboard.");
                                                });
                                            }}>
                                                <ion-icon name="copy-outline"></ion-icon> Copiar&nbsp;link
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {campanha?.status == "ATIVO" || campanha?.status == "FINALIZADO" ? (
                                    <>
                                        <SpaceBox space={5} />
                                        <label style={{ fontSize: '12px', color: 'var(--text-opacity)' }}>Progresso:</label>
                                        <div className="progress-c">
                                            <div className="progress-bar-c" style={{ width: `${campanha?.progresso?.toFixed(2) || 0}%` }}>
                                                <span className="progress-text-c">{campanha?.progresso?.toFixed(2) || 0}%</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (null)}
                                {campanha?.status == "AGUARDANDO_ATIVACAO" ? (
                                    <>
                                        <SpaceBox space={Utils.mobileCheck() ? 10 : 60} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div class="status-c">
                                                <span class="status-dot-c" style={{ background: getStatusProps(campanha?.status).background }}></span>
                                                <span class="status-text-c">{getStatusProps(campanha?.status).status}</span>
                                            </div>
                                            <Button onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(`/fatura-campanha/${campanha?.id_remessa}`);
                                            }}>Ativar</Button>
                                        </div>
                                    </>
                                ) : campanha?.status == "ATIVO" ? (
                                    <>
                                        <SpaceBox space={10} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div class="status-c">
                                                <span class="status-dot-c" style={{ background: getStatusProps(campanha?.status).background }}></span>
                                                <span class="status-text-c">{getStatusProps(campanha?.status).status}</span>
                                            </div>
                                            <Button onClick={(event) => {
                                                event.stopPropagation();
                                                handleContemplar(campanha);
                                            }}>Informar contemplado</Button>
                                        </div>
                                    </>
                                ) : (null)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <SpaceBox space={40} />
                        <center><b>Não há campanhas...</b></center>
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

            <SpaceBox space={130} />
        </FragmentView>
    );
}
