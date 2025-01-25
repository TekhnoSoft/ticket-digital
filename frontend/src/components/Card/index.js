import React from 'react';
import './style.css';
import SpaceBox from '../SpaceBox';

export default ({ children, style, className, onClick, title, icon }) => {
  return (
    <div className={`card ${className ? className : ''}`} style={style} onClick={onClick}>
      {title && icon ? (
        <>
           <SpaceBox space={5}/>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              {icon}
              <b>{title}</b>
          </div>
          <SpaceBox space={8}/>
        </>
      ) : (null)}
      {children}
    </div>
  )
}
