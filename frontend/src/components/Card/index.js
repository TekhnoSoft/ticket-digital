import React from 'react';
import './style.css';
import SpaceBox from '../SpaceBox';
import Button from '../Button';

export default ({ children, style, className, onClick, title, icon, button, alignItems }) => {
  return (
    <div className={`card ${className ? className : ''}`} style={style} onClick={onClick}>
      {title && icon ? (
        <>
           <SpaceBox space={5}/>
          <div style={{display: 'flex', alignItems: alignItems || "center", gap: '10px', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: "center", gap: '10px'}}>
                <div style={{display: 'flex', alignItems: "center", gap: '10px'}}>
                  {icon}
                  <b>{title}</b>
                </div>
              </div>
              {button ? (
                <Button onClick={button?.onClick} style={button?.style}>
                  {button?.title}
                </Button>
              ) : (null)}
          </div>
          <SpaceBox space={8}/>
        </>
      ) : (null)}
      {children}
    </div>
  )
}
