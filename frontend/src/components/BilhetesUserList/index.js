import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import Input from '../Input';
import Button from '../Button';
import SpaceBox from '../SpaceBox';
import Card from '../Card';
import Utils from '../../Utils';
import Api from '../../Api';

export default ({ user, setUser }) => {

    const [step, setStep] = useState(1);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneC, setPhoneC] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [faturas, setFaturas] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            setStep(3);
            searchUserTickes();
        }
    }, [user])

    const handleToContinue = async () => {
        setShowButtonLoader(true);

        switch (step) {
            case 1:
                if (!Utils.validarCelular(phone)) {
                    Utils.notify("error", "Celular inválido!");
                    setShowButtonLoader(false);
                    return;
                }

                let ok = await handleGetUser();

                if (ok) {
                    setStep(3);
                } else {
                    setStep(2);
                }
                setShowButtonLoader(false);
                return;
            case 2:
                if (name?.trim().length < 3) {
                    Utils.notify("error", "Nome inválido!");
                    setShowButtonLoader(false);
                    return;
                }

                if (!Utils.validarCelular(phone)) {
                    Utils.notify("error", "Celular inválido!");
                    setShowButtonLoader(false);
                    return;
                }

                if (phone != phoneC) {
                    Utils.notify("error", "Celulares divergentes!");
                    setShowButtonLoader(false);
                    return;
                }

                if (!Utils.validarEmail(email)) {
                    Utils.notify("error", "E-mail inválido!");
                    setShowButtonLoader(false);
                    return;
                }

                if (!Utils.validateCpf(cpf)) {
                    Utils.notify("error", "CPF inválido!");
                    setShowButtonLoader(false);
                    return;
                }

                let registerOk = await handlePreRegister();

                setShowButtonLoader(false);
                break;
            default:
                break;
        }
    }

    const handleGetUser = async () => {
        let sanitizedPhone = Utils.replaceMaskPhone(phone);

        const { success, data: userData } = await Utils.processRequest(Api.geral.getUserByPhone, { phone: sanitizedPhone });

        if (success) {
            setUser(userData?.data);
            localStorage.setItem("user", JSON.stringify(userData?.data));
        }

        return success;
    }

    const handlePreRegister = async () => {
        let sanitizedPhone = Utils.replaceMaskPhone(phone);
        let sanitizedCPF = Utils.replaceMaskCPF(cpf);

        const { success, data: userData } = await Utils.processRequest(Api.geral.preRegisterUser, { name, phone: sanitizedPhone, email, cpf: sanitizedCPF }, true);

        if (success) {
            setUser(userData?.data);
            localStorage.setItem("user", JSON.stringify(userData?.data));
        }

        return success;
    }

    const searchUserTickes = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.geral.searchUserTickes, { user_id: user?.id }, false);
        if (success) {
            setFaturas(data);
        }
        setLoaded(true);
    }

    return (
        <>
            <div>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="ticket-outline"></ion-icon>
                    </div>
                    <h3>Meus bilhetes</h3>
                </div>
            </div>
            {!user ? (
                step == 1 ? (
                    <div>
                        <SpaceBox space={10} />
                        <Input setValue={setPhone} value={phone} label={"Confirmar celular"} type={"celular"} />
                        <SpaceBox space={10} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Button onClick={handleToContinue} style={{ width: '100px' }}>
                                <ion-icon name="search-outline"></ion-icon>&nbsp;
                                <label>Buscar</label>
                            </Button>
                        </div>
                    </div>
                ) : step == 2 ? (
                    <>
                        <SpaceBox space={20} />
                        <div>
                            <Input setValue={setName} hideInputBoxMargin value={name} label={"Digite seu nome (completo)"} type={"text"} />
                            <Input setValue={setPhone} value={phone} label={"Celular com DDD"} type={"celular"} />
                            <Input setValue={setPhoneC} value={phoneC} label={"Confirmar celular"} type={"celular"} />
                            <Input setValue={setEmail} value={email} label={"Endereço de e-mail"} type={"email"} />
                            <Input setValue={setCpf} value={cpf} label={"Seu CPF"} type={"cpf"} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                            <Button onClick={handleToContinue} style={{ width: '100px' }}>
                                <ion-icon name="search-outline"></ion-icon>&nbsp;
                                <label>Continuar</label>
                            </Button>
                        </div>
                    </>
                ) : (null)
            ) : (
                step == 3 ? (
                    <div>
                        <SpaceBox space={15} />
                        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                            {!loaded ? (
                                <>
                                    <SpaceBox space={10}/>
                                    <center><b>Carregando...</b></center>
                                    <SpaceBox space={10}/>
                                </>
                            ) : (null)}
                            {loaded && faturas?.length <= 0 ? (
                                <>
                                    <SpaceBox space={10}/>
                                    <center><b>Não há faturas.</b></center>
                                    <SpaceBox space={10}/>
                                </>
                            ) : (null)}
                            {faturas?.map(fatura => (
                                <Card style={{ marginBottom: '8px', border: 'solid 1px #ddd' }}>
                                    {fatura?.fatura_status == "AGUARDANDO_PAGAMENTO" ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                                <ion-icon name="time-outline"></ion-icon>
                                            </div>
                                            <b>Pedido pendente</b>
                                            <ion-icon name="open-outline" style={{ color: 'black', cursor: 'pointer' }}></ion-icon>
                                        </div>
                                    ) : fatura?.fatura_status == "PAGO" ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                                <ion-icon name="checkmark-outline"></ion-icon>
                                            </div>
                                            <b>Pedido pago</b>
                                        </div>
                                    ) : fatura?.fatura_status == "CANCELADO" ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <div style={{ width: '15px', height: '15px', borderRadius: '8px', background: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '6px' }}>
                                                <ion-icon name="close"></ion-icon>
                                            </div>
                                            <b>Pedido cancelado</b>
                                        </div>
                                    ) : (null)}
                                    <SpaceBox space={8} />
                                    <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '5px' }}>
                                        {fatura?.bilhetes?.map(bilhete => (
                                            <label style={{ background: '#ddd', padding: '2px 4px', borderRadius: '4px', fontSize: '12px' }}>{Utils.formatNumberToTicket(bilhete?.numero, 1000000)}</label>
                                        ))}
                                    </div>
                                    <SpaceBox space={8} />
                                    <div>
                                        <span style={{ color: 'black', fontSize: '14PX' }}>{Utils.convertNumberToBRL(fatura?.total)} · {Utils.formatDateSimple(fatura?.data_compra)}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (null)
            )}
        </>
    )
}
