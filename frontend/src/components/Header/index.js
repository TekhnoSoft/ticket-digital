import React, { useEffect, useState } from 'react';
import './style.css';
import Button from '../Button';
import Hr from '../Hr';
import Modal from '../Modal';
import BilhetesUserList from '../BilhetesUserList';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';
import Environment from '../../Environment';

export default ({ headerMode, headerPaymentStep, user, setUser, modo, info, parceiro , logo}) => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [showModalCampanhas, setShowModalCampanhas] = useState(false);
    const [pathName, setPathName] = useState(window.location.pathname);

    const [idLogo, setIdLogo] = useState(null);
    const [color, setColor] = useState(null);

    useEffect(() => {
        setPathName(window.location.pathname);

        const checkout = JSON.parse(localStorage.getItem("checkout"));

        if(checkout){
            const _id = JSON.parse(localStorage.getItem("checkout"))?.campanha?.logo?.id;
            const _color = JSON.parse(localStorage.getItem("checkout"))?.campanha?.parceiro?.colorPrimary;
            setIdLogo(_id);
            setColor(_color);
        }

    }, [window.location.pathname])

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', color);
    }, [color])

    const handleToggle = () => {
        setOpen(!open);
    }

    const onCloseModalCampanhasCallback = () => {

    }

    return (
        <>
            <Modal onCloseCallback={onCloseModalCampanhasCallback} setShow={setShowModalCampanhas} show={showModalCampanhas}>
                <BilhetesUserList modo={modo} user={user} setUser={setUser} />
            </Modal>
            {headerMode == "USER" ? (
                <div className='header'>
                    <div className='header-content'>
                        <img src={logo ? Environment.API_BASE + `/sorteios/imagem/${logo}` : (pathName == "/") ? '../Logo.png' : '../placeholder-image.png'} className='header-logo' style={{ cursor: 'pointer' }} onClick={() => { }} />
                        {pathName == "/politica-privacidade" || pathName == "/termos-uso" || pathName == "/" ? (
                            <></>
                        ) : (
                            <>
                                <div className='button-group'>
                                    <Button onClick={() => { setShowModalCampanhas(true) }}><ion-icon name="ticket-outline"></ion-icon>&nbsp;Meus pedidos</Button>
                                    <Button><ion-icon name="list-outline"></ion-icon>&nbsp;Campanhas</Button>
                                    <Button style={{ color: 'white', padding: '8px', cursor: 'pointer' }} onClick={() => { window.open(`https://wa.me/${info?.telefone_contato}`, 'blank') }}><ion-icon size={"large"} name="logo-whatsapp"></ion-icon></Button>
                                </div>
                                <div className='menu-toggle' onClick={handleToggle}>
                                    <ion-icon className="menu-toggle-icon" name={`${open ? 'close-outline' : 'menu-outline'}`} size={"large"}></ion-icon>
                                </div>
                            </>
                        )}
                    </div>
                    {open ? (
                        <div className='hader-mobile-menu'>
                            <div className='button-group-mobile'>
                                <Button onClick={() => { setShowModalCampanhas(true) }} style={{ width: '100%' }}><ion-icon name="ticket-outline"></ion-icon>&nbsp;&nbsp;&nbsp;Meus pedidos</Button>
                                <Button style={{ width: '100%' }}><ion-icon name="list-outline"></ion-icon>&nbsp;&nbsp;&nbsp;Campanhas</Button>
                                <Button onClick={() => { window.open(`https://wa.me/${info?.telefone_contato}`, 'blank') }} style={{ width: '100%' }}><ion-icon name="logo-whatsapp"></ion-icon>&nbsp;&nbsp;&nbsp;Contato</Button>
                            </div>
                        </div>
                    ) : (null)}
                </div>
            ) : headerMode == "PARCEIRO" ? (
                <div className='header-parceiro' >
                    <div className='header-content-parceiro'>
                        <img src={'../Logo.png'} width={"100px"} className='header-logo' style={{ cursor: 'pointer' }} onClick={() => { navigate("/parceiro") }} />
                        <div className='button-group'>
                            <Button style={{ background: 'rgb(242, 242, 242)', color: 'var(--text-opacity)', padding: '8px', cursor: 'pointer' }} onClick={() => { }}><ion-icon size={"large"} name="help-circle-outline"></ion-icon></Button>
                            <Button style={{ background: 'rgb(242, 242, 242)', color: 'var(--text-opacity)', padding: '8px', cursor: 'pointer' }} onClick={() => { }}><ion-icon size={"large"} name="notifications-outline"></ion-icon></Button>
                            <Button style={{ background: 'rgb(242, 242, 242)', color: 'var(--text-opacity)', padding: '8px', cursor: 'pointer' }} onClick={() => { }}><ion-icon size={"large"} name="person-outline"></ion-icon></Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='header'>
                    <div className='header-content'>
                        <img src={idLogo ? Environment.API_BASE + `/sorteios/imagem/${idLogo}` : (logo) ? Environment.API_BASE + `/sorteios/imagem/${logo}` : '../placeholder-image.png'} width={"100px"} className='header-logo' style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
                        {pathName == "/politica-privacidade" || pathName == "/termos-uso" || pathName == "/" ? (
                            <></>
                        ) : (
                            <>
                                <div className='button-group'>
                                    <div style={{ width: '40px', height: '40px', alignItems: 'center', display: 'flex', justifyContent: 'center', background: 'var(--primary-color)', color: 'white', borderRadius: '50%' }}>
                                        <ion-icon name="person-outline"></ion-icon>
                                    </div>
                                    <Hr elevation={3} width={"40px"} color={headerPaymentStep > 2 ? 'var(--primary-color)' : "#ddd"} />
                                    <div style={{ width: '40px', height: '40px', alignItems: 'center', display: 'flex', justifyContent: 'center', background: headerPaymentStep > 2 ? 'var(--primary-color)' : '#ddd', color: headerPaymentStep > 2 ? 'white' : 'gray', borderRadius: '50%' }}>
                                        <ion-icon name="document-outline"></ion-icon>
                                    </div>
                                </div>
                                <div className='menu-toggle' onClick={handleToggle}>
                                    <div style={{ width: '40px', height: '40px', alignItems: 'center', display: 'flex', justifyContent: 'center', background: 'var(--primary-color)', color: 'white', borderRadius: '50%' }}>
                                        <ion-icon name="person-outline"></ion-icon>
                                    </div>
                                    <Hr elevation={3} width={"20px"} color={headerPaymentStep > 2 ? 'var(--primary-color)' : "#ddd"} />
                                    <div style={{ width: '40px', height: '40px', alignItems: 'center', display: 'flex', justifyContent: 'center', background: headerPaymentStep > 2 ? 'var(--primary-color)' : '#ddd', color: headerPaymentStep > 2 ? 'white' : 'gray', borderRadius: '50%' }}>
                                        <ion-icon name="document-outline"></ion-icon>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
