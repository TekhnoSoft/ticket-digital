import React from 'react';
import './style.css';

export default ({children, style, className, onClick}) => {
  return (
    <div className={`card ${className ? className : ''}`} style={style} onClick={onClick}>
        {children}
    </div>
  )
}
