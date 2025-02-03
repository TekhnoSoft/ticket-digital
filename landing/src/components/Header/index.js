import React from 'react';
import './style.css';
import Button from '../Button';
import If from '../If';
import Utils from '../../Utils';

const HeaderDesktop = () => {
    return (
        <header className='header'>
            <nav className="nav">
                <div className="header-container">
                    <div className="header-container-child-1">
                        <a className='header-container-logo'>
                            <img src='../logo.png' width="100px"/>    
                        </a>
                        <button className=''>
                            <div className="sc-d2afd452-4 GHuAg">
                                <div className="header-menu-line"></div>
                                <div className="header-menu-line"></div>
                            </div>
                        </button>
                    </div>
                    <div className='header-container-child-2'>
                        <a className='header-container-child-link'>Sobre nós</a>
                        <a className='header-container-child-link'>Ajuda</a>
                    </div>
                    <div class="header-container-child-3">
                        <a className="header-sign-in text-primary">Login</a>
                        <Button className="header-sign-up">Criar conta</Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const HeaderMobile = () => {
    return (
        <header className='header'>
            <nav className="nav">
                <div className="header-container">
                    <div className="header-container-child-1">
                        <a className='header-container-logo'>
                            <img src='../new_favicon.ico' width="70px"/>    
                        </a>
                        <div className='menu-button-btn'>
                            <ion-icon name="reorder-three-outline" style={{color: 'gray'}} size={"large"}></ion-icon>
                        </div>
                    </div>
                    <div class="header-container-child-3">
                        <a className="header-sign-in text-primary">Login</a>
                        <Button className="header-sign-up">Criar conta</Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default () => {
    return (
        <If condition={!Utils.mobileCheck()} elseComponent={<HeaderMobile/>}>
            <HeaderDesktop/>
        </If>
    )
}
