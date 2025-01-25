import React, { useEffect, useState } from 'react'
import FragmentView from '../../components/FragmentView'
import Input from '../../components/Input'
import SpaceBox from '../../components/SpaceBox';
import Api from '../../Api';
import Utils from '../../Utils';
import Button from '../../components/Button';
import './style.css';
import Hr from '../../components/Hr';
import Environment from '../../Environment';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [campanhas, setCampanhas] = useState([]);

    useEffect(() => {
        load();
    }, [])

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
                    status: "Aguardando Ativação"
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

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Campanhas</h2>
                <Button>+ campanha</Button>
            </div>
            <SpaceBox space={15} />
            <div className='search-box'>
                <Input type={"text"} hideInputBoxMargin label={"Pesquisar..."} value={search} setValue={setSearch} />
            </div>

            {loaded ? (
                filteredCampanhas.length > 0 ? (
                    <div className="grid-container-c">
                        {filteredCampanhas.map(campanha => (
                            <div className="grid-item-c" key={campanha?.id}>
                                <div className='grid-item-c-content'>
                                    <img src={Environment.API_BASE + `/sorteios/imagem/${campanha?.id_imagem}` || `../placeholder-image.png`} alt="Campanha" className="item-image-c" />
                                    <div className="item-content-c">
                                        <span className="item-name-c">{campanha?.name}</span>
                                        <a href="#" className="item-link-c">/{campanha?.keybind}</a>
                                    </div>
                                    <div className="menu-icon-c">
                                        <ion-icon name="ellipsis-vertical"></ion-icon>
                                        <div className="menu-options-c">
                                            <div className="menu-item-c" onClick={() => {navigate(`/campanha/${campanha?.keybind}`)}}>
                                                <ion-icon name="eye-outline"></ion-icon> Visualizar
                                            </div>
                                            <div className="menu-item-c">
                                                <ion-icon name="copy-outline"></ion-icon> Duplicar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {campanha?.status == "ATIVO" || campanha?.status == "FINALIZADO" ? (
                                    <>
                                        <SpaceBox space={15} />
                                        <div className="progress-c">
                                            <div className="progress-bar-c" style={{ width: `${campanha?.progresso || 0}%` }}>
                                                <span className="progress-text-c">{campanha?.progresso || 0}%</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (null)}
                                <SpaceBox space={2} />
                                <div class="status-c">
                                    <span class="status-dot-c" style={{ background: getStatusProps(campanha?.status).background }}></span>
                                    <span class="status-text-c">{getStatusProps(campanha?.status).status}</span>
                                </div>
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

            <SpaceBox space={80} />
        </FragmentView>
    );
}
