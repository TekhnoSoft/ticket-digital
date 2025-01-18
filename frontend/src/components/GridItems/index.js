import React from 'react';
import './style.css';
import Utils from '../../Utils';

const GridItems = ({ campanha, items, numeros, addNumero, removeNumero, reservados, pagos, filter }) => {
    return (
        <div className="buttons-select-cotas">
            {items.map((item, index) => {
                const isItemSelected = numeros.includes(item);
                const isReservado = reservados.includes(item);
                const isPago = pagos.includes(item);
                const isDisponivel = !isReservado && !isPago;

                if (
                    (filter === "pago" && !isPago) ||
                    (filter === "reservado" && !isReservado) ||
                    (filter === "disponivel" && !isDisponivel) ||
                    (filter === "" && false) // Se filter for "", não exibe nada
                ) {
                    return null;
                }

                return (
                    <div
                        key={index}
                        className="span-btn-cotas-view"
                        style={{
                            background: isPago ? 'var(--primary-color)' : isReservado ? 'orange' : isItemSelected ? 'gray' : null,
                            opacity: isPago || isReservado ? '0.4' : '1'
                        }}
                        onClick={() => {
                            if (isPago) {
                                Utils.notify("warning", "Número já pago por outro usuário.");
                            } else if (isReservado) {
                                Utils.notify("warning", "Número já reservado por outro usuário.");
                            } else {
                                isItemSelected ? removeNumero(item) : addNumero(item);
                            }
                        }}
                    >
                        <b style={{ color: isPago || isReservado || isItemSelected ? 'white' : null }}>
                            {Utils.formatNumberToTicket(item, campanha?.regra?.valor)}
                        </b>
                    </div>
                );
            })}
        </div>
    );
};

export default GridItems;
