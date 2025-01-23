import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Hr, Input, SpaceBox } from '../../components';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");
    const [code, setCode] = useState("");

    return (
        <div className='login-content'>
            <div className='login-left'>
                <div className='login-left-content'>
                    <img src='../logo.png' width={"100px"} />
                    <SpaceBox space={15} />
                    <h1 style={{ color: 'var(--text-opacity)' }}>Criar conta</h1>
                    <p style={{ color: 'var(--text-opacity)' }}>Crie a sua campanha, configure para ficar do seu jeito, <br /> e receba você mesmo o dinheiro!</p>
                    <SpaceBox space={15} />
                    <Input type={"text"} label={"Digite seu nome"} setValue={setName} value={name} />
                    <SpaceBox space={5} />
                    <Input type={"email"} label={"Digite seu e-mail"} setValue={setEmail} value={email} />
                    <SpaceBox space={5} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Input type={"password"} style={{ width: '100%' }} label={"Digite sua senha"} setValue={setPassword} value={password} />
                        <Input type={"password"} style={{ width: '100%' }} label={"Repita sua senha"} setValue={setPasswordC} value={passwordC} />
                    </div>
                    <SpaceBox space={5} />
                    <Input type={"code"} label={"Código de convite"} setValue={setCode} value={code} />
                    <SpaceBox space={5} />
                    <div style={{ display: 'flext', alignItems: 'center', justifyContent: 'centers' }}>
                        <div style={{ textAlign: 'center', fontSize: '12px' }}>
                            Ao clicar no botão abaixo "Criar conta", você concorda com <br /> nossos <b style={{ cursor: 'pointer', color: 'var(--primary-color)' }}>termos de uso</b> e a nossa <b style={{ cursor: 'pointer', color: 'var(--primary-color)' }}>política de privacidade</b> e confirma ter mais de 18 anos.
                        </div>
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
                    <center><label style={{ color: 'var(--text-opacity)' }}>Já tem uma conta? <b onClick={() => { navigate('/login') }} style={{ color: 'var(--primary-color)', cursor: 'pointer' }}>Login</b></label></center>
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
