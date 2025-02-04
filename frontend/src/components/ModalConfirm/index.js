import React from 'react';
import './style.css';
import Modal from '../Modal';
import Button from '../Button';
import SpaceBox from '../SpaceBox';

export default ({children, setShow, show, onCancel, onConfirm}) => {
    return (
        <Modal setShow={setShow} show={show} onCloseCallback={onCancel}>
            {children}
            <SpaceBox space={10}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '10px'}}>
                <Button onClick={onCancel} style={{background: '#f5f5f5', color: 'black'}}>Cancelar</Button>
                <Button onClick={onConfirm}>Confirmar</Button>
            </div>
        </Modal>
    )
}
