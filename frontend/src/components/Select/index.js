import React from 'react';
import './style.css';

export default ({label, children, value, setValue, disabled, width, hideInputBoxMargin}) => {
    return (
        <div class="input-box active-grey" style={{background: disabled ? '#ddd' : 'white', width: width ? width : null, marginTop: hideInputBoxMargin ? '2px' : undefined, marginBottom: hideInputBoxMargin ? '2px' : undefined, }}>
            <label class="input-label" style={{zIndex: 1}}>{label}</label>
            <select class="input-1" disabled={disabled} onfocus="setFocus(true)" onblur="setFocus(false)" value={value} onChange={(e) => setValue(e.target.value)}>{children}</select>
        </div>
    )
}
