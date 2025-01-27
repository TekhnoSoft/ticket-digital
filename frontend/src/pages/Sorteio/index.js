import React, { useState, useRef, useEffect, useContext } from 'react';
import './style.css';
import { BilhetesUserList, Button, Card, Countdown, FragmentView, Hr, Input, Modal, Pagination, SpaceBox } from '../../components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Utils from '../../Utils';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../Api';
import Environment from '../../Environment';
import { MainContext } from '../../helpers/MainContext';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const textStyle = {
    margin: 0,
    fontSize: "14px",
};

const numberStyle = {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
};

export default () => {

    const navigate = useNavigate();
    const { keybind } = useParams();

    const { user, setUser } = useContext(MainContext);

    const [phone, setPhone] = useState("");

    const [loaded, setLoaded] = useState(false);
    const [loadedBilheteStatus, setLoadedBilheteStatus] = useState(false);
    const [showModalCampanhas, setShowModalCampanhas] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [viewMode, setViewMode] = useState("");

    const [campanha, setCampanha] = useState({
        imagens: [],
    })

    const [bilhetesPagos, setBilhetesPagos] = useState([]);
    const [bilhetesReservados, setBilhetesReservados] = useState([]);
    const [rankBuyers, setRankBuyers] = useState([]);
    const [rankWinners, setRankWinners] = useState([]);
    const [bilhetesPremiados, setBilhetesPremiados] = useState([]);

    const [btnsQtd, setBtnsQtd] = useState([]);

    const [numeros, setNumeros] = useState([]);
    const [qtd, setQtd] = useState(0);

    const [filter, setFilter] = useState("disponivel");

    const [taxaCliente, setTaxaCliente] = useState(null);

    useEffect(() => {
        load();
    }, [])

    useEffect(() => {
        const loadBilhetesStatusInfo = async () => {
            setLoadedBilheteStatus(false);
            if (campanha?.id != undefined) {
                if (campanha?.tipo == "USUARIO_ESCOLHE") {
                    const { success: reservadosSuccess, data: reservadosData } = await Utils.processRequest(Api.geral.getBilhetesReservados, { sorteio_id: campanha?.id });
                    const { success: pagosSuccess, data: pagosData } = await Utils.processRequest(Api.geral.getBilhetesPagos, { sorteio_id: campanha?.id });
                    setBilhetesReservados(reservadosData);
                    setBilhetesPagos(pagosData);
                }
                const { success: rankBuyersSuccess, data: rankBuyersData } = await Utils.processRequest(Api.geral.getRankBuyers, { sorteio_id: campanha?.id });
                const { success: rankWinnersSuccess, data: rankWinnersData } = await Utils.processRequest(Api.geral.getRankWinners, { sorteio_id: campanha?.id });
                const { success: bilhetesPremiadosSuccess, data: bilhetesPremiadosData } = await Utils.processRequest(Api.geral.getBilhetesPremiados, { sorteio_id: campanha?.id });
                setRankBuyers(rankBuyersData);
                setRankWinners(rankWinnersData);
                setBilhetesPremiados(bilhetesPremiadosData);
            }
            setLoadedBilheteStatus(true);
        }
        loadBilhetesStatusInfo();
    }, [campanha])

    const addNumero = (numero) => {
        if (numeros?.length < campanha?.info?.maximo_cota_usuario) {
            setNumeros((prevNumeros) => [...prevNumeros, numero]);
        }
    };

    const removeNumero = (numero) => {
        setNumeros(numeros.filter(n => n !== numero));
        setQtd(qtd - 1);
    };

    const getMedalhas = (colocacao) => {
        switch (colocacao) {
            case 1:
                return "🥇";
            case 2:
                return "🥈";
            case 3:
                return "🥉";
            default:
                return "🥉";
        }
    }

    const load = async () => {
        setLoaded(false);

        const { success, data: campanhaData } = await Utils.processRequest(Api.geral.getCampanha, { keybind });
        const { success: successTaxas, data: taxasData } = await Utils.processRequest(Api.geral.getTaxas, { user_id: campanhaData?.user_id });

        if (success && successTaxas) {
            setCampanha(campanhaData);
            setViewMode(campanhaData?.tipo);
            setTaxaCliente(taxasData);

            const MAX_BUTTONS_QTD = 6;
            let _qtdBtns = [];
            for (let i = 0; i < MAX_BUTTONS_QTD; i++) {
                const buttonKey = `btn_${i + 1}_cota`;
                const cotaValue = campanhaData?.info?.[buttonKey];
                if (cotaValue > 0) {
                    _qtdBtns.push({
                        qtd: cotaValue,
                        popular: (i + 1) == campanhaData?.info?.btn_popular
                    })
                }
            }
            setBtnsQtd(_qtdBtns);

            setQtd(campanhaData?.info?.minimo_cota_usuario);

            window.document.title = campanhaData?.name;
        } else {
            navigate("/404");
        }

        setLoaded(true);
    }

    const handleParticipe = () => {
        switch (viewMode) {
            case "USUARIO_ESCOLHE":
                if (numeros?.length < campanha?.info?.minimo_cota_usuario) {
                    Utils.notify("error", `Escolha no mínimo ${campanha?.info?.minimo_cota_usuario} ${Utils.getModo(campanha?.modo)?.plural || ""}.`);
                    return;
                }
                break;
            case "SISTEMA_ESCOLHE":
                if (qtd < campanha?.info?.minimo_cota_usuario) {
                    Utils.notify("error", `Escolha no mínimo ${campanha?.info?.minimo_cota_usuario} ${Utils.getModo(campanha?.modo)?.plural || ""}.`);
                    return;
                }
                break;
        }

        localStorage.setItem("checkout", JSON.stringify({
            campanha: campanha,
            viewMode: viewMode,
            numeros: numeros,
            qtd: viewMode == "USUARIO_ESCOLHE" ? numeros?.length : qtd,
            taxa_cliente: taxaCliente,
        }))
        navigate("/checkout");
    }

    const onCloseModalUserCallback = () => {

    }

    const onCloseModalCampanhasCallback = () => {

    }

    return (
        <FragmentView headerMode={"USER"} modo={campanha?.modo || ""}>
            <Modal onCloseCallback={onCloseModalCampanhasCallback} setShow={setShowModalCampanhas} show={showModalCampanhas}>
                <BilhetesUserList modo={campanha?.modo || ""} user={user} setUser={setUser} />
            </Modal>
            <Modal onCloseCallback={onCloseModalUserCallback} setShow={setShowModalUser} show={showModalUser}>
                <div>
                    <h3>Meus {Utils.getModo(campanha?.modo)?.plural || ""}</h3>
                </div>
                <div>
                    <SpaceBox space={10} />
                    <Input setValue={setPhone} value={phone} label={"Confirmar celular"} type={"celular"} />
                    <SpaceBox space={10} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <Button style={{ width: '100px' }}>
                            <ion-icon name="search-outline"></ion-icon>&nbsp;
                            <label>Buscar</label>
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className='info-content'>
                <div className='info-images'>
                    <Carousel
                        className='info-images'
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px">
                        {loaded ? (
                            campanha?.imagens?.map(imagem => {
                                return (
                                    <div className='image-slide' key={imagem?.id}>
                                        <img src={Environment.API_BASE + `/sorteios/imagem/${imagem?.id}` || `../placeholder-image.png`} alt={"Imagem da Campanha"} />
                                    </div>
                                );
                            })
                        ) : (
                            <div className='image-slide'>
                                <img src={`../placeholder-image.png`} alt={"Imagem da Campanha"} />
                            </div>
                        )}
                    </Carousel>
                </div>
                <SpaceBox space={20} />
                <Card className={"info-card"} style={{ padding: '16px' }}>
                    <b className='b-text' style={{ fontWeight: 'bold' }}>
                        {loaded ? campanha?.name?.toLocaleUpperCase() || '...' : '...'}
                    </b>
                    <SpaceBox space={8} />
                    <div className='info-oferta' style={{ display: 'flex', alignItems: 'center' }}>
                        <label className='text-opacity'>Por apenas</label>&nbsp;&nbsp;
                        <div style={{ background: 'var(--primary-color)', borderRadius: '4px', padding: '4px 8px' }}>
                            <b className='oferta-valor text-opacity' style={{ color: 'white' }}>{loaded ? Utils.convertNumberToBRL(campanha?.valor_por_bilhete) : 0}</b>
                        </div>
                    </div>
                    <SpaceBox space={15} />
                    {loaded && !Utils.stringIsNullOrEmpty(campanha?.info?.data_sorteio) ? (
                        <>
                            <Hr elevation={1} />
                            <SpaceBox space={15} />
                            <label className='text-opacity'>Sorteio em:</label>&nbsp;&nbsp;
                            <SpaceBox space={4} />
                            <Countdown data_sorteio={campanha?.info?.data_sorteio} />
                        </>
                    ) : (null)}
                    <SpaceBox space={15} />
                    <Hr elevation={1} />
                    <SpaceBox space={15} />
                    <label className='text-opacity'>Redes sociais:</label>&nbsp;&nbsp;
                    <SpaceBox space={4} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {!Utils.stringIsNullOrEmpty(campanha?.parceiro?.whatsappLink) && (
                            <div onClick={() => {window.open(campanha?.parceiro?.whatsappLink, 'blank')}} style={{ cursor: 'pointer', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(30, 195, 92)', color: 'white' }}>
                                <ion-icon name="logo-whatsapp"></ion-icon>
                            </div>
                        )}

                        {!Utils.stringIsNullOrEmpty(campanha?.parceiro?.facebookLink) && (
                            <div onClick={() => {window.open(campanha?.parceiro?.facebookLink, 'blank')}} style={{ cursor: 'pointer', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(24, 119, 242)', color: 'white' }}>
                                <ion-icon name="logo-facebook"></ion-icon>
                            </div>
                        )}

                        {!Utils.stringIsNullOrEmpty(campanha?.parceiro?.youtubeLink) && (
                            <div onClick={() => {window.open(campanha?.parceiro?.youtubeLink, 'blank')}} style={{ cursor: 'pointer', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'red', color: 'white' }}>
                                <ion-icon name="logo-youtube"></ion-icon>
                            </div>
                        )}

                        {!Utils.stringIsNullOrEmpty(campanha?.parceiro?.instagramLink) && (
                            <div onClick={() => {window.open(campanha?.parceiro?.instagramLink, 'blank')}} style={{ cursor: 'pointer', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #feda75, #d62d2f, #962fbf, #4f5bd5, #00bfff)', color: 'white' }}>
                                <ion-icon name="logo-instagram"></ion-icon>
                            </div>
                        )}

                        {!Utils.stringIsNullOrEmpty(campanha?.parceiro?.tiktokLink) && (
                            <div onClick={() => {window.open(campanha?.tiktokLink?.whatsappLink, 'blank')}} style={{ cursor: 'pointer', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black', color: 'white' }}>
                                <ion-icon name="logo-tiktok"></ion-icon>
                            </div>
                        )}

                        {!Utils.stringIsNullOrEmpty(campanha?.parceiro?.telegramLink) && (
                            <div onClick={() => {window.open(campanha?.parceiro?.telegramLink, 'blank')}} style={{ cursor: 'pointer', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 136, 204)', color: 'white' }}>
                                <ion-icon name="paper-plane"></ion-icon>
                            </div>
                        )}
                    </div>
                </Card>
                <SpaceBox space={30} />
                <div className='title-bilhetes'>
                    <div style={{ width: '50px', height: '50px', background: 'rgb(213 213 213)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ion-icon className="text-opacity" name="ticket-outline" size={"large"}></ion-icon>
                    </div>&nbsp;&nbsp;
                    <div>
                        <b className='b-text'>{Utils.getModo(campanha?.modo)?.title || ""}</b>
                        <div>
                            <label className='text-opacity' style={{ fontSize: '15px' }}>
                                Selecione a quantidade que deseja comprar.
                            </label>
                        </div>
                    </div>
                </div>
                <SpaceBox space={15} />
                {viewMode == "USUARIO_ESCOLHE" ? (
                    <div>
                        <div className='filter-buttons responsive-margin'>
                            <span onClick={() => { setFilter("") }} className='filter-button' style={{ background: '#242429' }}>
                                <span>Todos</span>
                                <b style={{ background: '#ffffff', color: '#242429' }}>{campanha?.regra?.valor}</b>
                            </span>
                            <span onClick={() => { setFilter("disponivel") }} className='filter-button' style={{ background: '#eaebed' }}>
                                <span style={{ color: '#242429' }}>Disponiveis</span>
                                <b style={{ background: '#242429', color: '#ffffff' }}>{campanha?.regra?.valor - (bilhetesReservados?.length + bilhetesPagos?.length)}</b>
                            </span>
                            <span onClick={() => { setFilter("reservado") }} className='filter-button' style={{ background: 'orange' }}>
                                <span>Reservados</span>
                                <b style={{ background: '#ffffff', color: 'orange' }}>{bilhetesReservados?.length}</b>
                            </span>
                            <span onClick={() => { setFilter("pago") }} className='filter-button' style={{ background: 'var(--primary-color)' }}>
                                <span>Pagos</span>
                                <b style={{ background: '#ffffff', color: 'var(--primary-color)' }}>{bilhetesPagos?.length}</b>
                            </span>
                            <span onClick={() => { setShowModalCampanhas(true) }} className='filter-button' style={{ background: 'var(--primary-color)', alignSelf: 'center' }}>
                                <ion-icon name="ticket"></ion-icon>&nbsp;
                                <span>Meus {Utils.getModo(campanha?.modo)?.plural || ""}</span>
                            </span>
                        </div>
                        <SpaceBox space={15} />
                        {loadedBilheteStatus == true ? (
                            <Pagination filter={filter} reservados={bilhetesReservados} pagos={bilhetesPagos} campanha={campanha} numeros={numeros} addNumero={addNumero} removeNumero={removeNumero} />
                        ) : (
                            <>
                                <SpaceBox space={10} />
                                <center><b>Carregando...</b></center>
                                <SpaceBox space={10} />
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="buttons-cotas">
                            {btnsQtd?.map((item, index) => (
                                <Card
                                    key={index}
                                    className={"button-cota"}
                                    style={{
                                        cursor: 'pointer',
                                        border: item?.popular ? 'solid 2px var(--primary-color)' : 'none',
                                        position: 'relative',
                                        height: '85px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => {
                                        let newQtd = qtd + item?.qtd;
                                        if (newQtd >= campanha?.info?.maximo_cota_usuario) {
                                            setQtd(campanha?.info?.maximo_cota_usuario);
                                        } else {
                                            setQtd(newQtd);
                                        }
                                    }}
                                >
                                    <div>
                                        {item?.popular && (
                                            <div
                                                style={{
                                                    textAlign: 'center',
                                                    position: 'absolute',
                                                    top: '0px',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    background: 'var(--primary-color)',
                                                    color: 'white',
                                                    borderRadius: '16px',
                                                    fontSize: '12px',
                                                    padding: '2px 8px',
                                                }}
                                            >
                                                Mais&nbsp;popular
                                            </div>
                                        )}
                                        <p className="text-opacity" style={textStyle}>
                                            SELECIONAR
                                        </p>
                                        <p className="text-opacity" style={numberStyle}>
                                            +{item?.qtd}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <SpaceBox space={15} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                            <button
                                style={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={() => {
                                    let newQtd = qtd - 1;
                                    if (newQtd >= campanha?.info?.minimo_cota_usuario) {
                                        setQtd(newQtd);
                                    }
                                }}
                            >
                                <ion-icon name="remove"></ion-icon>
                            </button>
                            <input
                                type="tel"
                                style={{
                                    width: '200px',
                                    height: '40px',
                                    textAlign: 'center',
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                }}
                                value={qtd}
                                onChange={(e) => {
                                    let v = e.target.value;
                                    if (v >= campanha?.info.maximo_cota_usuario) {
                                        setQtd(campanha?.info.maximo_cota_usuario)
                                    } else {
                                        setQtd(e.target.value)
                                    }
                                }}
                            />
                            <button
                                style={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={() => {
                                    let newQtd = qtd + 1;
                                    if (newQtd >= campanha?.info?.maximo_cota_usuario) {
                                        setQtd(campanha?.info?.maximo_cota_usuario);
                                    } else {
                                        setQtd(newQtd);
                                    }
                                }}
                            >
                                <ion-icon name="add"></ion-icon>
                            </button>
                        </div>
                        <SpaceBox space={20} />
                        <div className='responsive-margin button-checkout-parent'>
                            <Button onClick={handleParticipe} className={'responsive-button'}>
                                Participar ({Utils.convertNumberToBRL(Number(qtd * campanha?.valor_por_bilhete) || 0)})
                            </Button>
                        </div>
                        {Utils.mobileCheck() ? (
                            <>
                                <SpaceBox space={8} />
                                <div className='responsive-margin button-checkout-parent'>
                                    <Button onClick={() => { setShowModalCampanhas(true) }} className={'responsive-button btn-bilhetes'}>
                                        <ion-icon name="ticket-outline" class="text-opacity"></ion-icon>&nbsp;
                                        <b>Meus {Utils.getModo(campanha?.modo)?.plural || ""}</b>
                                    </Button>
                                </div>
                            </>
                        ) : (null)}
                    </>
                )}
                <SpaceBox space={30} />
                <div className='title-bilhetes'>
                    <div style={{ width: '50px', height: '50px', background: 'rgb(213 213 213)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ion-icon className="text-opacity" name="stats-chart-outline" size={"large"}></ion-icon>
                    </div>&nbsp;&nbsp;
                    <div>
                        <b className='b-text'>Maiores compradores</b>
                    </div>
                </div>
                <SpaceBox space={20} />
                <Card className={"responsive-margin"}>
                    {rankBuyers?.length <= 0 ? (
                        <>
                            <SpaceBox space={10} />
                            <center><b>Não há compradores, pode ser você ;)</b></center>
                            <SpaceBox space={10} />
                        </>
                    ) : (null)}
                    {rankBuyers?.map((r, index) => (
                        <>
                            {index != 0 ? (<Hr elevation={1} />) : (null)}
                            <div className='winner-content'>
                                <b className='winner-position'>{(index + 1)}º</b>
                                <div className='winner-info'>
                                    <div>🏆<b>{r?.name}</b></div>
                                    <div className='text-opacity'>{Utils.getModo(campanha?.modo)?.plural || ""}: <b>{r?.qtd}</b></div>
                                </div>
                            </div>
                        </>
                    ))}
                </Card>
                {bilhetesPremiados?.length > 0 ? (
                    <>
                        <SpaceBox space={30} />
                        <div className='title-bilhetes'>
                            <div style={{ width: '50px', height: '50px', background: 'rgb(213 213 213)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ion-icon className="text-opacity" name="star-outline" size={"large"}></ion-icon>
                            </div>&nbsp;&nbsp;
                            <div>
                                <b className='b-text'>{Utils.getModo(campanha?.modo)?.title || ""} premiados</b>
                            </div>
                        </div>
                        <SpaceBox space={20} />
                        <Card className={"responsive-margin"} style={{ padding: '16px', maxHeight: '250px', overflowY: 'auto' }}>
                            {bilhetesPremiados?.map(bilhete => (
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', background: '#f0f0f5', border: 'solid 1px rgb(213 213 213)', padding: '2px 8px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>
                                            <ion-icon name="ticket-outline"></ion-icon>&nbsp;
                                            <label>{Utils.formatNumberToTicket(bilhete?.numero)}</label>
                                        </label>
                                        <label style={{ background: '#f0f0f5', borderBottom: 'solid 1px rgb(213 213 213)', borderRight: 'solid 1px rgb(213 213 213)', borderTop: 'solid 1px rgb(213 213 213)', padding: '2px 8px', display: 'flex', alignItems: 'center', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                                            <label>{bilhete?.user_id ? `Comprado` : `Disponível`}</label>&nbsp;&nbsp;
                                            <div style={{ width: '10px', height: '10px', background: bilhete?.user_id ? 'var(--primary-color)' : 'gray', borderRadius: '50%' }}></div>
                                        </label>
                                    </div>
                                    <SpaceBox space={10} />
                                    <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <ion-icon name="person-outline"></ion-icon>
                                        </div>
                                        <div style={{ color: 'var(--text-opacity)', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                                            <p>{bilhete?.user_id ? bilhete?.username : "(nenhum ganhador)"}  &nbsp;·&nbsp; {bilhete?.name}</p>
                                        </div>
                                    </div>
                                    <SpaceBox space={10} />
                                    <Hr elevation={1} />
                                    <SpaceBox space={15} />
                                </div>
                            ))}
                        </Card>
                    </>
                ) : (null)}
                <SpaceBox space={30} />
                <div className='title-bilhetes'>
                    <div style={{ width: '50px', height: '50px', background: 'rgb(213 213 213)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ion-icon className="text-opacity" name="trophy-outline" size={"large"}></ion-icon>
                    </div>&nbsp;&nbsp;
                    <div>
                        <b className='b-text'>Prêmios</b>
                    </div>
                </div>
                <SpaceBox space={20} />
                <Card className={"responsive-margin"} style={{ padding: '16px' }}>
                    {rankWinners?.length <= 0 ? (
                        <>
                            <SpaceBox space={10} />
                            <center><b>Não há ganhadores, pode ser você ;)</b></center>
                            <SpaceBox space={10} />
                        </>
                    ) : (null)}
                    {rankWinners?.map((r, index) => (
                        <>
                            {index != 0 ? (
                                <>
                                    <SpaceBox space={10} />
                                    <Hr elevation={1} />
                                    <SpaceBox space={15} />
                                </>
                            ) : (null)}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', background: '#f0f0f5', border: 'solid 1px rgb(213 213 213)', padding: '2px 8px', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>
                                        <label>{getMedalhas(r?.colocacao)}</label>
                                    </label>
                                    <label style={{ background: '#f0f0f5', borderBottom: 'solid 1px rgb(213 213 213)', borderRight: 'solid 1px rgb(213 213 213)', borderTop: 'solid 1px rgb(213 213 213)', padding: '2px 8px', display: 'flex', alignItems: 'center', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                                        <label>{r?.colocacao}º ganhador(a):</label>&nbsp;&nbsp;
                                    </label>
                                </div>
                                <SpaceBox space={10} />
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                    <div style={{ color: 'var(--text-opacity)', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                                        <p>{r.ganhador_nome || "(nenhum ganhador)"}&nbsp;·&nbsp;{r?.premio}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </Card>
                <SpaceBox space={30} />
                <div className='title-bilhetes'>
                    <div style={{ width: '50px', height: '50px', background: 'rgb(213 213 213)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ion-icon className="text-opacity" name="chatbox-outline" size={"large"}></ion-icon>
                    </div>&nbsp;&nbsp;
                    <div>
                        <b className='b-text'>Descrição</b>
                    </div>
                </div>
                <SpaceBox space={20} />
                <Card className={"responsive-margin"} style={{ padding: '16px' }}>
                    <p>{campanha?.description || "Sem descrição."}</p>
                </Card>
                <SpaceBox space={40} />
                {numeros?.length > 0 ? (
                    <div className='cart-bottom'>
                        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: Utils.mobileCheck() ? '100%' : null }}>
                            <div style={{ width: Utils.mobileCheck() ? '100%' : 'calc(100% - 185px)' }}>
                                <label style={{ fontSize: '14px' }} className='text-opacity'>{Utils.getModo(campanha?.modo)?.title || ""} ({numeros?.length}):</label>
                                <SpaceBox space={8} />
                                <div style={{ display: 'flex', gap: '2px', width: 'calc(100% - 32px)', overflowX: 'auto', paddingBottom: '5px' }}>
                                    {numeros.map(n => (
                                        <label onClick={() => { removeNumero(n) }} style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px', minWidth: '60px', textAlign: 'center', cursor: 'pointer' }}>{n}</label>
                                    ))}
                                </div>
                                <SpaceBox space={8} />
                                {Utils?.mobileCheck() ? (
                                    <Button onClick={handleParticipe} style={{ width: 'calc(100% - 32px)' }}>
                                        Participar&nbsp;({Utils.convertNumberToBRL(Number(numeros?.length * campanha?.valor_por_bilhete) || 0)})
                                    </Button>
                                ) : (null)}
                            </div>
                            {!Utils?.mobileCheck() ? (
                                <div>
                                    <Button onClick={handleParticipe} >
                                        Participar&nbsp;({Utils.convertNumberToBRL(Number(numeros?.length * campanha?.valor_por_bilhete) || 0)})
                                    </Button>
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                ) : (null)}
            </div>
        </FragmentView>
    )
}
