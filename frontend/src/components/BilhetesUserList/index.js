import React, { useState } from 'react';
import './style.css';
import Input from '../Input';
import Button from '../Button';
import SpaceBox from '../SpaceBox';
import Card from '../Card';

export default ({user}) => {

    const [searched, setSearched] = useState(true);
    const [phone, setPhone] = useState("");

    return (
        <>
            <div>
                <h3>Meus bilhetes</h3>
            </div>
            {!searched ? (
                <div>
                    <SpaceBox space={10} />
                    <Input setValue={setPhone} value={phone} label={"Confirmar celular"} type={"celular"} />
                    <SpaceBox space={10} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                        <Button style={{ width: '100px' }}>
                            <ion-icon name="search-outline"></ion-icon>&nbsp;
                            <label>Buscar</label>
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <SpaceBox space={15} />
                    <div style={{overflowY: 'auto', maxHeight: '300px'}}>
                        <Card style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                    <ion-icon name="time-outline"></ion-icon>
                                </div>
                                <b>Pedido pendente</b>
                                <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                            </div>
                            <SpaceBox space={8} />
                            <div>
                                <span style={{ color: 'black', fontSize: '14PX' }}>R$ 5,00 · há uma hora</span>
                            </div>
                        </Card>
                        <Card style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                    <ion-icon name="checkmark-outline"></ion-icon>
                                </div>
                                <b>Pedido pago</b>
                                <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                            </div>
                            <SpaceBox space={8} />
                            <div>
                                <span style={{ color: 'black', fontSize: '14PX' }}>R$ 5,00 · há uma hora</span>
                            </div>
                        </Card>
                        <Card style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                    <ion-icon name="time-outline"></ion-icon>
                                </div>
                                <b>Pedido pendente</b>
                                <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                            </div>
                            <SpaceBox space={8} />
                            <div>
                                <span style={{ color: 'black', fontSize: '14PX' }}>R$ 5,00 · há uma hora</span>
                            </div>
                        </Card>
                        <Card style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                    <ion-icon name="time-outline"></ion-icon>
                                </div>
                                <b>Pedido pendente</b>
                                <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                            </div>
                            <SpaceBox space={8} />
                            <div>
                                <span style={{ color: 'black', fontSize: '14PX' }}>R$ 5,00 · há uma hora</span>
                            </div>
                        </Card>
                        <Card style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                    <ion-icon name="time-outline"></ion-icon>
                                </div>
                                <b>Pedido pendente</b>
                                <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                            </div>
                            <SpaceBox space={8} />
                            <div>
                                <span style={{ color: 'black', fontSize: '14PX' }}>R$ 5,00 · há uma hora</span>
                            </div>
                        </Card>
                        <Card style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                    <ion-icon name="time-outline"></ion-icon>
                                </div>
                                <b>Pedido pendente</b>
                                <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                                <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>8272976</label>
                            </div>
                            <SpaceBox space={8} />
                            <div>
                                <span style={{ color: 'black', fontSize: '14PX' }}>R$ 5,00 · há uma hora</span>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </>
    )
}
