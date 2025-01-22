import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import Header from '../Header';
import Footer from '../Footer';
import { MainContext } from '../../helpers/MainContext';
import { ticketOutline, cubeOutline, peopleOutline, colorPaletteOutline, personOutline, logInOutline } from 'ionicons/icons';

const menuItems = [
    { name: 'Campanhas', icon: ticketOutline },
    { name: 'Pedidos', icon: cubeOutline },
    { name: 'Afiliados', icon: peopleOutline },
    { name: 'Personalizar', icon: colorPaletteOutline },
    { name: 'Perfil', icon: personOutline }
];

const BottomNavigationBar = () => {
    return (
        <div className="bottom-nav">
            {menuItems.map((item, index) => (
                <div key={index} className="nav-item">
                    <ion-icon icon={item.icon} className="nav-icon" />
                    <span>{item.name}</span>
                </div>
            ))}
        </div>
    );
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            {/*<div className="sidebar-header" onClick={() => setIsOpen(!isOpen)}>
                <img src="/logo.png" alt="Logo" className="logo" />
            </div>*/}
            <div className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <div key={index} className="menu-item">
                        <ion-icon icon={item.icon} className="menu-icon" />
                        {isOpen && <span className="menu-text">{item.name}</span>}
                    </div>
                ))}
                <div key={99} className="menu-item">
                    <ion-icon icon={logInOutline} className="menu-icon" />
                    {isOpen && <span className="menu-text">Sair</span>}
                </div>
            </div>
        </div>
    );
};

export default ({ children, headerMode, headerPaymentStep, modo }) => {

    const { user, setUser } = useContext(MainContext); 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    return (
        <>
            <Header modo={modo} user={user} setUser={setUser} headerMode={headerMode} headerPaymentStep={headerPaymentStep}/>
            {headerMode == "PARCEIRO" ? (
                <>
                    <Sidebar/>
                    <BottomNavigationBar/>
                </>
            ) : (null)}
            <div className={headerMode == "PARCEIRO" ? 'fragment-view-parceiro' : 'fragment-view'}>
                {headerMode == "PARCEIRO" ? (
                    <div className='adjust-sidebar'>
                        <div className='responsive-margin'>
                            {children}
                        </div>
                    </div>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </div>
            {headerMode != "PARCEIRO" ? (<Footer footerMode={headerMode} />) : (null)}
        </>
    )
}
