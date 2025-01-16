import React from 'react';
import './style.css';

export default ({children, onClick, style, className, disabled}) => {
    return (
        <button style={style} disabled={disabled} onClick={onClick} className={`${className} button button-primary-color`}>
            {children}
        </button>
    )
}
