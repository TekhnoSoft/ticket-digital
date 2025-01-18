import React from 'react';
import './style.css';
import Utils from '../../Utils';

const GridItems = ({ campanha, items, numeros, addNumero, removeNumero, reservados, pagos }) => {
    return (
        <div className="buttons-select-cotas">
            {items.map((item, index) => {
                const isItemSelected = numeros.includes(item);

                return (
                    <>
                        {reservados.includes(item) ? (
                            <>
                                <div
                                    className={`span-btn-cotas-view`}
                                    style={{background: 'orange', opacity: '0.4'}}
                                    key={index}
                                    onClick={() => {Utils.notify("warning", "Número já reservado por outro usuário.")}}
                                >
                                    <b style={{color: 'white'}}>{Utils.formatNumberToTicket(item, campanha?.regra?.valor)}</b>
                                </div>
                            </>
                        ) : pagos.includes(item) ? (
                            <>
                                <div
                                    className={`span-btn-cotas-view`}
                                    style={{background: 'var(--primary-color)', opacity: '0.4'}}
                                    key={index}
                                    onClick={() => {Utils.notify("warning", "Número já pago por outro usuário.")}}
                                >
                                    <b style={{color: 'white'}}>{Utils.formatNumberToTicket(item, campanha?.regra?.valor)}</b>
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default GridItems;