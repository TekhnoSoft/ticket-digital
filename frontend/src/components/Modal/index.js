import React, { useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';

const Modal = ({ children, show, setShow, onCloseCallback }) => {

    const navigate = useNavigate();

    const handleBackdropClick = () => {
        setShow(false);
        if(onCloseCallback){
            onCloseCallback();
        }
        navigate(-1);
        window.location.hash = '';
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash !== '#modal') {
                setShow(false);
                window.removeEventListener('hashchange', handleHashChange);
                if(onCloseCallback){
                    onCloseCallback();
                }
            }
        };

        if (show) {
            window.location.hash = 'modal';
            window.addEventListener('hashchange', handleHashChange);
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            document.body.style.overflow = 'auto';
        };
    }, [show, setShow]);

    return (
        show ? (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999999, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', }} onClick={handleBackdropClick}>
                <div style={{ background: '#fff', padding: '20px', marginLeft: '10px', marginRight: '10px', borderRadius: '5px', width: Utils.mobileCheck() ? '85%' : '40%'}} onClick={handleContentClick}>
                    {children}
                </div>
            </div>
        ) : null
    );
};

export default Modal;