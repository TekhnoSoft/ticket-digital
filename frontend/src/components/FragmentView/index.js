import React from 'react';
import './style.css';
import Header from '../Header';
import Footer from '../Footer';

export default ({ children, headerMode, headerPaymentStep }) => {
    return (
        <>
            <Header headerMode={headerMode} headerPaymentStep={headerPaymentStep}/>
            <div className='fragment-view'>
                {children}
            </div>
            <Footer />
        </>
    )
}
