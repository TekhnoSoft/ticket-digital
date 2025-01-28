import React, { useEffect, useState } from 'react';
import './style.css';
import { Button, Hr, Input, SpaceBox } from '../../components';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';
import Api from '../../Api';

export default () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordC, setPasswordC] = useState("");

    const sendCode = async () => {

        if(!Utils.validarEmail(email)){
            Utils.notify("error", "E-mail inválido");
            return;
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.resetPasswordSendCode, {email}, true);

        if(success){
            Utils.notify("success", "Enviamos o código de recuperação para seu e-mail.")
            setStep(1);
        }

    }

    const confirmCode = async () => {
        if(Utils.stringIsNullOrEmpty(code)){
            Utils.notify("error", "Código inválido");
            return;
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.resetPasswordValidCode, {email, code}, true);

        if(success){
            Utils.notify("success", "Código validado com sucesso.")
            setStep(2);
        }
    }

    const changePassword = async () => {
        
        if(password != passwordC){
            Utils.notify("error", "As senhas não se coincidem.")
            return;
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.resetPasswordChange, {email, code, password}, true);

        if(success){
            Utils.notify("success", "Senha alterada com sucesso, faça loginn.")
            navigate("/login");
            setStep(2);
        }

    }

    return (
        <div className='login-content'>
            <div className='login-left'>
                <div className='login-left-content'>
                    <img src='../Logo.png' width={"100px"} />
                    <SpaceBox space={15} />
                    <h1 style={{ color: 'var(--text-opacity)' }}>Recuperar senha</h1>
                    <p style={{ color: 'var(--text-opacity)' }}>Digite o endereço de e-mail da sua conta e enviaremos <br/> um link para redefinir sua senha.</p>
                    <SpaceBox space={15} />
                    {step == 0 ? (
                        <>
                            <Input type={"email"} label={"Digite seu e-mail"} setValue={setEmail} value={email} />
                            <SpaceBox space={25} />
                            <Button style={{ width: '100%' }} onClick={sendCode}>
                                Enviar link
                            </Button>
                        </>
                    ) : step == 1 ? (
                        <>
                            <Input type={"code"} label={"Digite o código"} setValue={setCode} value={code} />
                            <SpaceBox space={25} />
                            <Button style={{ width: '100%' }} onClick={confirmCode}>
                                Validar código
                            </Button>
                        </>
                    ) : step == 2 ? (
                        <>
                            <Input type={"password"} label={"Nova senha"} setValue={setPassword} value={password} />
                            <SpaceBox space={5} />
                            <Input type={"password"} label={"Confirmar senha"} setValue={setPasswordC} value={passwordC} />
                            <SpaceBox space={25} />
                            <Button style={{ width: '100%' }} onClick={changePassword}>
                                Mudar senha
                            </Button>
                        </>
                    ) : (null)}
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
