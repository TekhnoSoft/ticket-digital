import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import Header from '../Header';
import Footer from '../Footer';
import { MainContext } from '../../helpers/MainContext';
import { ticketOutline, cubeOutline, walletOutline, wallet, colorPaletteOutline, personOutline, logInOutline, ticket, cube, people, colorPalette, person, logIn } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';

const menuItems = [
    { id: 0, name: 'Campanhas', path: '', icon: ticketOutline, iconFill: ticket, path: "/parceiro" },
    { id: 1, name: 'Pedidos', icon: cubeOutline, iconFill: cube, path: "/parceiro-pedidos" },
    { id: 2, name: 'Pagamentos', icon: walletOutline, iconFill: wallet, path: "/parceiro-pagamentos" },
    { id: 3, name: 'Visual', icon: colorPaletteOutline, iconFill: colorPalette, path: "/parceiro-visual" },
    { id: 4, name: 'Perfil', icon: personOutline, iconFill: person, path: "/parceiro-perfil" }
];

const BottomNavigationBar = ({ pageIndex, setPageIndex }) => {

    const navigate = useNavigate();

    const handlePage = (index, path) => {
        localStorage.setItem("pageIndex", index);
        setPageIndex(index);
        navigate(path);
    }

    return (
        <div className="bottom-nav">
            {menuItems.map((item, index) => (
                <div key={index} className="nav-item" onClick={() => { handlePage(index, item?.path) }}>
                    <ion-icon icon={pageIndex == item?.id ? item.iconFill : item.icon} style={{ color: pageIndex == item?.id ? 'var(--primary-color)' : undefined }} className="nav-icon" />
                    <span style={{ fontSize: '12px', color: pageIndex == item?.id ? 'var(--primary-color)' : undefined }}>{item.name}</span>
                </div>
            ))}
        </div>
    );
};

const Sidebar = ({ pageIndex, setPageIndex }) => {

    const { logout } = useContext(MainContext);

    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate();

    const handlePage = (index, path) => {
        localStorage.setItem("pageIndex", index);
        setPageIndex(index);
        navigate(path);
    }

    const handleLogout = () => {
        if(logout){
            logout(() => {
                Utils.notify("success", "Desconectado com sucesso.");
            });
        }
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            {/*<div className="sidebar-header" onClick={() => setIsOpen(!isOpen)}>
                <img src="/logo.png" alt="Logo" className="logo" />
            </div>*/}
            <div className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <div key={index} className="menu-item" style={{ borderLeft: pageIndex == item?.id ? 'solid 3px var(--primary-color)' : undefined }} onClick={() => { handlePage(index, item?.path) }}>
                        <ion-icon icon={item.icon} style={{ color: pageIndex == item?.id ? 'var(--primary-color)' : undefined }} className="menu-icon" />
                        {isOpen && <span className="menu-text" style={{ color: pageIndex == item?.id ? 'var(--primary-color)' : undefined }}>{item.name}</span>}
                    </div>
                ))}
                <div key={99} className="menu-item" onClick={handleLogout}>
                    <ion-icon icon={logInOutline} className="menu-icon" />
                    {isOpen && <span className="menu-text">Sair</span>}
                </div>
            </div>
        </div>
    );
};

export default ({ children, headerMode, headerPaymentStep, modo, info }) => {

    const { user, setUser } = useContext(MainContext);

    const [pageIndex, setPageIndex] = useState(() => {
        let pathname = window.location.pathname;
        let menuSelected = menuItems.filter(m => {
            return m.path == pathname;
        })[0];

        if (menuSelected != null) {
            return menuSelected?.id
        } else {
            return localStorage.getItem("pageIndex") || 0;
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header modo={modo} user={user} setUser={setUser} headerMode={headerMode} headerPaymentStep={headerPaymentStep} info={info} />
            {headerMode == "PARCEIRO" ? (
                <>
                    <Sidebar pageIndex={pageIndex} setPageIndex={setPageIndex} />
                    <BottomNavigationBar pageIndex={pageIndex} setPageIndex={setPageIndex} />
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
