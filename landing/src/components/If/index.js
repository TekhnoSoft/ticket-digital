import React from 'react';
import './style.css';

export default ({children, condition, elseComponent}) => {
    return (
        condition == true ? (
            <>
                {children}
            </>
        ) : (
            elseComponent ? (<>{elseComponent}</>) : (null) 
        )
    )
}
