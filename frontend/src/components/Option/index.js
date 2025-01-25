import React from 'react';
import './style.css';

export default ({value, children}) => {
    return (
        <option value={value}>{children}</option>
    )
}
