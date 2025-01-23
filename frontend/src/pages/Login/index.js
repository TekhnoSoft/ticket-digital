import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Hr, Input, SpaceBox } from '../../components';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='login-content'>
            <div className='login-left'>
                <div className='login-left-content'>
                    <img src='../Logo.png' width={"100px"} />
                    <SpaceBox space={15} />
                    <h1 style={{ color: 'var(--text-opacity)' }}>Seja bem-vindo!</h1>
                    <p style={{ color: 'var(--text-opacity)' }}>Insira suas informações abaixo para entrar na sua conta</p>
                    <SpaceBox space={15} />
                    <Input type={"email"} label={"Digite seu e-mail"} setValue={setEmail} value={email} />
                    <SpaceBox space={5} />
                    <Input type={"password"} label={"Digite sua senha"} setValue={setPassword} value={password} />
                    <SpaceBox space={5} />
                    <div className='forgot-password'>
                        <b onClick={() => { navigate('/forgot-password') }} style={{ cursor: 'pointer' }}>Esqueceu sua senha?</b>
                    </div>
                    <SpaceBox space={25} />
                    <Button style={{ width: '100%' }}>
                        Entrar
                    </Button>
                    <SpaceBox space={15} />
                    <div className='login-or'>
                        <Hr elevation={1} color={"#ddd"} />
                        <b style={{ color: 'gray' }}>ou</b>
                        <Hr elevation={1} color={"#ddd"} />
                    </div>
                    <SpaceBox space={8} />
                    <center><label style={{ color: 'var(--text-opacity)' }}>Ainda não tem uma conta? <b onClick={() => { navigate('/register') }} style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>Registre-se</b></label></center>
                    <SpaceBox space={8} />
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
