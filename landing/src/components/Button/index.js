import React from 'react';
import './style.css';

export default ({children, onClick}) => {
    return (
        <button onClick={onClick} className='button button-primary-color'>
            {children}
        </button>
    )
}
