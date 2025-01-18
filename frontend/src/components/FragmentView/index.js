import React, { useContext, useEffect } from 'react';
import './style.css';
import Header from '../Header';
import Footer from '../Footer';
import { MainContext } from '../../helpers/MainContext';

export default ({ children, headerMode, headerPaymentStep }) => {

    const { user, setUser } = useContext(MainContext); 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); 

    return (
        <>
            <Header user={user} setUser={setUser} headerMode={headerMode} headerPaymentStep={headerPaymentStep}/>
            <div className='fragment-view'>
                {children}
            </div>
            <Footer />
        </>
    )
}
