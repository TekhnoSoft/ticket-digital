import React from 'react';
import './style.css';
import Utils from '../../Utils';

const GridItems = ({ campanha, items, numeros, addNumero, removeNumero }) => {
    return (
        <div className="buttons-select-cotas">
            {items.map((item, index) => {
                const isItemSelected = numeros.includes(item);

                return (
                    <div
                        className={`span-btn-cotas-view`}
                        style={{background: isItemSelected ? 'gray' : null}}
                        key={index}
                        onClick={() => {
                            if (isItemSelected) {
                                removeNumero(item);
                            } else {
                                addNumero(item);
                            }
                        }}
                    >
                        <b style={{color: isItemSelected ? 'white' : null}}>{Utils.formatNumberToTicket(item, campanha?.regra?.valor)}</b>
                    </div>
                );
            })}
        </div>
    );
};

export default GridItems;