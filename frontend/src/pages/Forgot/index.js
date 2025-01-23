import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Hr, Input, SpaceBox } from '../../components';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    return (
        <div className='login-content'>
            <div className='login-left'>
                <div className='login-left-content'>
                    <img src='../Logo.png' width={"100px"} />
                    <SpaceBox space={15} />
                    <h1 style={{ color: 'var(--text-opacity)' }}>Recuperar senha</h1>
                    <p style={{ color: 'var(--text-opacity)' }}>Digite o endereço de e-mail da sua conta e enviaremos <br/> um link para redefinir sua senha.</p>
                    <SpaceBox space={15} />
                    <Input type={"email"} label={"Digite seu e-mail"} setValue={setEmail} value={email} />
                    <SpaceBox space={25} />
                    <Button style={{ width: '100%' }}>
                        Enviar link
                    </Button>
                    <SpaceBox space={15} />
                    <div className='login-or'>
                        <Hr elevation={1} color={"#ddd"} />
                        <b style={{ color: 'gray' }}>ou</b>
                        <Hr elevation={1} color={"#ddd"} />
                    </div>
                    <SpaceBox space={8} />
                    <center><label style={{ color: 'var(--text-opacity)' }}>Lembrou a senha? <b onClick={() => { navigate('/login') }} style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>Login</b></label></center>
                    <SpaceBox space={15} />
                </div>
            </div>
            <div className='login-right'>
                <div className='login-right-content'>
                    <div>
                        <img src='../hero.png' width={"500px"} />
                    </div>
                    <SpaceBox space={15} />
                    <h2>Painel rápido e prático</h2>
                    <p style={{ color: 'var(--text-opacity)' }}>Acompanhe suas campanhas de perto com relatórios detalhados</p>
                    <SpaceBox space={15} />
                </div>
            </div>
        </div>
    );
}
