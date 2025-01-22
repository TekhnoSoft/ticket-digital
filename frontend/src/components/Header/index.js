import React, { useEffect, useState } from 'react';
import './style.css';
import Button from '../Button';
import Hr from '../Hr';
import Modal from '../Modal';
import BilhetesUserList from '../BilhetesUserList';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';

export default ({ headerMode, headerPaymentStep, user, setUser, modo }) => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [showModalCampanhas, setShowModalCampanhas] = useState(false);

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
                        <img src='../Logo.png' width={"100px"} style={{cursor: 'pointer'}} onClick={() => {}}/>
                        <div className='button-group'>
                            <Button onClick={() => {setShowModalCampanhas(true)}}><ion-icon name="ticket-outline"></ion-icon>&nbsp;Meus {Utils.getModo(modo)?.plural || ""}</Button>
                            <Button><ion-icon name="list-outline"></ion-icon>&nbsp;Campanhas</Button>
                        </div>
                        <div className='menu-toggle' onClick={handleToggle}>
                            <ion-icon className="menu-toggle-icon" name={`${open ? 'close-outline' : 'menu-outline'}`} size={"large"}></ion-icon>
                        </div>
                    </div>
                    {open ? (
                        <div className='hader-mobile-menu'>
                            <div className='button-group-mobile'>
                                <Button onClick={() => {setShowModalCampanhas(true)}} style={{ width: '100%' }}><ion-icon name="ticket-outline"></ion-icon>&nbsp;&nbsp;&nbsp;Meus {Utils.getModo(modo)?.plural || ""}</Button>
                                <Button style={{ width: '100%' }}><ion-icon name="list-outline"></ion-icon>&nbsp;&nbsp;&nbsp;Campanhas</Button>
                                <Button style={{ width: '100%' }}><ion-icon name="logo-whatsapp"></ion-icon>&nbsp;&nbsp;&nbsp;Contato</Button>
                            </div>
                        </div>
                    ) : (null)}
                </div>
            ) : headerMode == "PARCEIRO" ? (
                <div className='header-parceiro'>
                    <div className='header-content-parceiro'>
                        <img src='../Logo.png' width={"100px"} style={{cursor: 'pointer'}} onClick={() => {}}/>
                        <div className='button-group'>
                            <Button onClick={() => {setShowModalCampanhas(true)}}><ion-icon name="ticket-outline"></ion-icon>&nbsp;Meus {Utils.getModo(modo)?.plural || ""}</Button>
                            <Button><ion-icon name="list-outline"></ion-icon>&nbsp;Campanhas</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='header'>
                    <div className='header-content'>
                        <img src='../Logo.png' width={"100px"} style={{cursor: 'pointer'}} onClick={() => navigate(-1)}/>
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
                    </div>
                </div>
            )}
        </>
    )
}
