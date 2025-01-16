import React, { useState } from 'react';
import './style.css';
import SpaceBox from '../SpaceBox';

export default function Footer() {
    const [accordionOpen, setAccordionOpen] = useState(true);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer>
            <div className="footer-content">
                {/* Informações */}
                <div className="footer-column">
                    <div className="accordion-header" onClick={toggleAccordion}>
                        <h4>Informações</h4>
                        <ion-icon
                            name={`chevron-${accordionOpen ? 'up' : 'down'}-outline`}
                        ></ion-icon>
                    </div>
                    <ul className={`accordion-content ${accordionOpen ? 'open' : ''}`}>
                        <li><a href="/termos">Termos de Uso</a></li>
                        <li><a href="/politica">Política de Privacidade</a></li>
                    </ul>
                </div>

                {/* Formas de Pagamento */}
                <div className="footer-column">
                    <h4>Formas de Pagamento</h4>
                    <div className="payment-icons">
                        <img src="../pix.png" style={{ width: '25px', border: 'solid 1px #ddd', borderRadius: '4px', padding: '2px 8px' }} alt="Pix" />
                    </div>
                    <div className='payment-secure' style={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
                        <ion-icon size="large" name="lock-closed-outline"></ion-icon>
                        <div>
                            <div style={{ lineHeight: '1', margin: '0' }}>
                                <label style={{ fontSize: '14px', display: 'block', fontWeight: 'bold' }}>CHECKOUT</label>
                                <label style={{ fontSize: '10px', display: 'block', fontWeight: 'normal' }}>100% SEGURO</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="footer-bottom">
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <span>&copy; {new Date().getFullYear()} Todos os direitos reservados</span>&nbsp;&nbsp;
                        <img src="../Logo.png" alt="Logo" />
                    </div>
                    <button className="scroll-to-top" onClick={scrollToTop} style={{ marginTop: '10px' }}>
                        <ion-icon name="chevron-up-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </footer>
    );
}
