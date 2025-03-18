import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Button, Card, FragmentView, Hr, Input, Modal, SpaceBox } from '../../components';
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
import Environment from '../../Environment';
import Utils from '../../Utils';
import { MainContext } from '../../helpers/MainContext';
import Api from '../../Api';

export default () => {

    const navigate = useNavigate();

    const { user, setUser } = useContext(MainContext);

    const [step, setStep] = useState(1);
    const [showButtonLoader, setShowButtonLoader] = useState(false);

    const [checkout, setCheckout] = useState(JSON.parse(localStorage.getItem("checkout")) || null);

    const [paymentStatus, setPaymentStatus] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneC, setPhoneC] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");

    const [qrCode, setQrCode] = useState(null);
    const [barCode, setBarCode] = useState(null);

    const [showWinCartaPremiada, setShowWinCartaPremiada] = useState(false);
    const [showLoseCartaPremiada, setShowLoseCartaPremiada] = useState(false);

    useEffect(() => {
        if (!checkout) {
            navigate("/");
        }

        if (user) {
            setStep(3);
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

                /*if (!Utils.validateCpf(cpf)) {
                    Utils.notify("error", "CPF inválido!");
                    setShowButtonLoader(false);
                    return;
                }*/

                let registerOk = await handlePreRegister();

                setShowButtonLoader(false);
                break;
            case 3:
                let sinishOk = await handleFinish();
                setShowButtonLoader(false);
                break;
            case 4:
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
            window.scrollTo(0, 0);
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
            window.scrollTo(0, 0);
        }

        return success;
    }

    const handleFinish = async () => {
        switch (checkout?.viewMode) {
            case "USUARIO_ESCOLHE":
                const { success: successBilheteSelecionado, data: dataBilheteSelecionado } = await Utils.processRequest(Api.geral.reservarBilheteSelecionado, { sorteio_id: checkout?.campanha?.id, numeros: checkout?.numeros, user_id: user?.id, idSorteioSocio: checkout?.idSorteioSocio, idCartaPremiada: checkout?.idCartaPremiada }, true);
                if (successBilheteSelecionado) {
                    localStorage.setItem("fatura", dataBilheteSelecionado?.id_remessa);
                    checkFaturaIsPayed(dataBilheteSelecionado?.id_remessa, null);
                    let interval = setInterval(() => { checkFaturaIsPayed(dataBilheteSelecionado?.id_remessa, interval) }, 3000)
                    setStep(4);
                    window.scrollTo(0, 0);
                }
                break;
            case "SISTEMA_ESCOLHE":
                const { success: successBilheteQuantidade, data: dataBilheteQuantidade } = await Utils.processRequest(Api.geral.reservarBilheteQuantidade, { sorteio_id: checkout?.campanha?.id, quantidade: checkout?.qtd, user_id: user?.id, idSorteioSocio: checkout?.idSorteioSocio, idCartaPremiada: checkout?.idCartaPremiada }, true);
                if (successBilheteQuantidade) {
                    localStorage.setItem("fatura", dataBilheteQuantidade?.id_remessa);
                    checkFaturaIsPayed(dataBilheteQuantidade?.id_remessa, null);
                    let interval = setInterval(() => { checkFaturaIsPayed(dataBilheteQuantidade?.id_remessa, interval) }, 3000)
                    setStep(4);
                    window.scrollTo(0, 0);
                }
                break;
        }
    }

    const checkFaturaIsPayed = async (id_remessa, interval) => {
        const { success, data } = await Utils.processRequest(Api.geral.checkFaturaIsPayed, { id_remessa: id_remessa }, true);
        if (success) {
            setQrCode(data?.qr_code_payment_image);
            setBarCode(data?.qr_code_payment_barcode);
            switch (data?.status) {
                case "PAGO":
                    setPaymentStatus("PAGO");
                    setStep(5);
                    window.scrollTo(0, 0);
                    if (interval) {
                        clearInterval(interval);
                    }
                    await checkIfCartaPremiada();
                    break;
                case "CANCELADO":
                    setPaymentStatus("CANCELADO");
                    setStep(5);
                    window.scrollTo(0, 0);
                    if (interval) {
                        clearInterval(interval);
                    }
                    break;
            }
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(barCode)
            .then(() => Utils.notify("success", "Código copiado!"))
            .catch(err => Utils.notify("error", "Erro ao copiar"));
    };

    const checkIfCartaPremiada = async () => {
        if (!Utils.stringIsNullOrEmpty(checkout?.idCartaPremiada)) {
            const { success, data } = await Utils.processRequest(Api.geral.checkIfCartaPremiada, { codigo: checkout?.idCartaPremiada }, true);
            if(success){
                console.log(data);
                if(data?.flg_premiada == true){
                    setShowWinCartaPremiada(true);
                }else{
                    setShowLoseCartaPremiada(true);
                }
                localStorage.removeItem("id_carta_premiada");
            }
        }
    }

    return (
        <FragmentView headerMode={"PAYMENT"} headerPaymentStep={step}>
            <Modal setShow={setShowLoseCartaPremiada} show={showLoseCartaPremiada}>
                <div className='carta-content'>
                    <center>
                        <h2 style={{ textAlign: 'center' }}>
                            😕 Foi por pouco, essa não é a carta premiada.
                        </h2>
                        <div style={{ marginTop: '80px', transform: 'rotateZ(-25deg)' }}>
                            <span style={{ background: 'gray', padding: '10px 20px', borderRadius: '8px' }}>
                                <b style={{ color: 'white' }}>Continue procurando...</b>
                            </span>
                        </div>
                        <img src='../bad.png' style={{ width: '300px', maxWidth: '500px', marginTop: '-60px' }} />
                    </center>
                </div>
            </Modal>
            <Modal backdropCancelEvents={true} setShow={setShowWinCartaPremiada} show={showWinCartaPremiada}>
                <div className='carta-content'>
                    <div className="confetti-container">
                        <div className="confetti">
                            {Utils.getConffetis().map((item, index) => (
                                <i
                                    key={index}
                                    style={{
                                        '--speed': item.speed,
                                        '--bg': item.bg,
                                    }}
                                    className={item.shape}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <center>
                            <h2 style={{ textAlign: 'center' }}>
                                🎉 Parabéns, você achou a carta premiada!
                            </h2>
                            <div style={{ marginTop: '50px', transform: 'rotateZ(-25deg)' }}>
                                <span style={{ background: 'var(--primary-color)', padding: '10px 20px', borderRadius: '8px' }}>
                                    <b style={{ color: 'white' }}>R$ 250,00</b>
                                </span>
                            </div>
                            <img src='../win.png' style={{ width: '100%', maxWidth: '500px', marginTop: '-50px' }} />
                        </center>
                    </div>
                </div>
            </Modal>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div className='checkout-all'>
                    <div className='checkout-left' style={{ width: '100%' }}>
                        <SpaceBox space={20} />
                        {step == 1 ? ( //digite o numero
                            <div>
                                <Card style={{ padding: '20px' }}>
                                    <div className="card-header">
                                        <div className="icon-circle">
                                            <ion-icon name="person-outline"></ion-icon>
                                        </div>
                                        <h3>Dados pessoais</h3>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div>
                                        <Input setValue={setPhone} value={phone} hideInputBoxMargin label={"Telefone com DDD"} type={"celular"} />
                                    </div>
                                </Card>
                                <SpaceBox space={20} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                    <Button className={"checkout-button"} onClick={handleToContinue}>
                                        {showButtonLoader ? (
                                            <>
                                                &nbsp;<div class="loader"></div>
                                            </>
                                        ) : (<>Continuar</>)}
                                    </Button>
                                </div>
                                <SpaceBox space={20} />
                            </div>
                        ) : step == 2 ? ( //criar conta
                            <div>
                                <Card style={{ padding: '20px' }}>
                                    <div className="card-header">
                                        <div className="icon-circle">
                                            <ion-icon name="person-outline"></ion-icon>
                                        </div>
                                        <h3>Dados pessoais</h3>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div>
                                        <Input setValue={setName} hideInputBoxMargin value={name} label={"Digite seu nome (completo)"} type={"text"} />
                                        <Input setValue={setPhone} value={phone} label={"Celular com DDD"} type={"celular"} />
                                        <Input setValue={setPhoneC} value={phoneC} label={"Confirmar celular"} type={"celular"} />
                                        <Input setValue={setEmail} value={email} label={"Endereço de e-mail"} type={"email"} />
                                        <Input setValue={setCpf} value={cpf} label={"Seu CPF"} type={"cpf"} />
                                    </div>
                                </Card>
                                <SpaceBox space={20} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                    <Button className={"checkout-button"} onClick={handleToContinue}>
                                        {showButtonLoader ? (
                                            <>
                                                &nbsp;<div class="loader"></div>
                                            </>
                                        ) : (<>Continuar</>)}
                                    </Button>
                                </div>
                                <SpaceBox space={20} />
                            </div>
                        ) : step == 3 ? ( //conta existente
                            <div>
                                <Card style={{ padding: '20px' }}>
                                    <div className="card-header">
                                        <div className="icon-circle">
                                            <ion-icon name="document-outline"></ion-icon>
                                        </div>
                                        <h3>Revisar</h3>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <label className='text-opacity'>Dados pessoais</label>
                                            {/*<Button onClick={() => { setStep(2) }} style={{ background: '#ededf1', color: '#000', fontWeight: 'bold', borderRadius: '8px', padding: '8px 10px' }}>
                                                <ion-icon name="create-outline"></ion-icon>&nbsp;Editar
                                            </Button>*/}
                                        </div>
                                        <SpaceBox space={10} />
                                        <div className='resume-user-info'>
                                            <div style={{ padding: '12px' }}>
                                                <b style={{ color: 'black' }}>Nome:</b>
                                                <div className='text-opacity'>{user?.name}</div>
                                                <SpaceBox space={10} />
                                                <b style={{ color: 'black' }}>Celular:</b>
                                                <div className='text-opacity'>{Utils.formatToCelular(user?.phone)}</div>
                                                <SpaceBox space={10} />
                                                <b style={{ color: 'black' }}>Email:</b>
                                                <div className='text-opacity'>{user?.email}</div>
                                                <SpaceBox space={10} />
                                                <b style={{ color: 'black' }}>CPF:</b>
                                                <div className='text-opacity'>{Utils.formatCpf(user?.cpf)}</div>
                                            </div>
                                        </div>
                                        <SpaceBox space={20} />
                                        <label className='text-opacity'>Forma de pagamento</label>
                                        <SpaceBox space={15} />
                                        <div className='resume-user-info'>
                                            <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '50%', border: 'solid #ddd 1px' }}>
                                                    <img style={{ width: '24px', height: '24px' }} src='pix.png' />
                                                </div>
                                                <b>Pix</b>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <SpaceBox space={30} />
                                <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#828791', textAlign: 'center' }}>
                                    Ao reservar este pedido declaro ter lido e concordado com o <b style={{ color: 'black' }}>regulamento da campanha</b>, e com os <b style={{ color: 'black' }}>termos de uso</b> e a <b style={{ color: 'black' }}>política de privacidade</b>.
                                </p>
                                <SpaceBox space={30} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                    <Button disabled={showButtonLoader} className={"checkout-button"} onClick={handleToContinue}>
                                        {showButtonLoader ? (
                                            <>
                                                &nbsp;<div class="loader"></div>
                                            </>
                                        ) : (<>Finalizar compra</>)}
                                    </Button>
                                </div>
                                <SpaceBox space={20} />
                            </div>
                        ) : step == 4 ? ( //qrcode pix
                            <div>
                                <div style={{ textAlign: 'center', background: 'gray', padding: '20px' }}>
                                    <SpaceBox space={20} />
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div class="dot-typing"></div>
                                    </div>
                                    <SpaceBox space={20} />
                                    <h3 style={{ color: 'white' }}>Quase lá!</h3>
                                    <p style={{ color: 'white' }}>Efetue o pagamento do seu pedido para garantir a sua participação</p>
                                </div>
                                <div className='payment-pix-content'>
                                    <div className="card-header">
                                        <div className="icon-circle">
                                            <ion-icon name="copy-outline"></ion-icon>
                                        </div>
                                        <h3>Copie o código para pagar</h3>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="icon-quad">
                                                1
                                            </div>
                                            <span style={{ color: 'black', fontSize: '14px' }}>Abra o aplicativo do seu banco.</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="icon-quad">
                                                2
                                            </div>
                                            <span style={{ color: 'black', fontSize: '14px' }}>Escolha pagar via Pix, e clique em código copia e cola.</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="icon-quad">
                                                3
                                            </div>
                                            <span style={{ color: 'black', fontSize: '14px' }}>Cole o código abaixo:</span>
                                        </div>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {barCode ? (
                                            <>
                                                <Input style={{ width: '100%', borderRadius: '4px 0px 0px 4px' }} value={barCode} type={"text"} readOnly={true} />
                                                <Button onClick={handleCopy} style={{ width: '90px', borderRadius: '0px 4px 4px 0px' }}>
                                                    Copiar
                                                </Button>
                                            </>
                                        ) : (null)}
                                    </div>
                                    <SpaceBox space={20} />
                                    <Hr elevation={1} />
                                    <SpaceBox space={20} />
                                    <div className="card-header">
                                        <div className="icon-circle">
                                            <ion-icon name="qr-code-outline"></ion-icon>
                                        </div>
                                        <h3>Ou escaneie o QR code</h3>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="icon-quad">
                                                1
                                            </div>
                                            <span style={{ color: 'black', fontSize: '14px' }}>Abra o aplicativo do seu banco.</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="icon-quad">
                                                2
                                            </div>
                                            <span style={{ color: 'black', fontSize: '14px' }}>Escolha pagar via Pix, e escaneie o código abaixo:</span>
                                        </div>
                                        <SpaceBox space={20} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div>
                                                <center>
                                                    {barCode ? (
                                                        <QRCode
                                                            size={256}
                                                            style={{ height: "auto", maxWidth: "212px", width: "212px" }}
                                                            value={barCode}
                                                            viewBox={`0 0 256 256`}
                                                        />
                                                    ) : (null)}
                                                </center>
                                                <SpaceBox space={10} />
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <ion-icon name="time-outline"></ion-icon>
                                                    <span style={{ color: 'black' }}>Pague e será creditado na hora</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <SpaceBox space={20} />
                                    <Hr elevation={1} />
                                    <SpaceBox space={20} />
                                    <div className="card-header">
                                        <div className="icon-circle">
                                            <ion-icon name="list-outline"></ion-icon>
                                        </div>
                                        <h3>Detalhes do Pedido</h3>
                                    </div>
                                    <SpaceBox space={20} />
                                    <div style={{ fontSize: '14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>Comprador(a):</b>
                                            <span>{user?.name}</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>E-mail(a):</b>
                                            <span>{user?.email}</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>Celular:</b>
                                            <span>{Utils.formatToCelular(user?.phone)}</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>CPF:</b>
                                            <span>{Utils.formatCpf(user?.cpf)}</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>Status:</b>
                                            <span>Aguardando pagamento</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>Data:</b>
                                            <span>{Utils.formatDateTime(new Date())}</span>
                                        </div>
                                        <SpaceBox space={8} />
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <b>Bilhetes:</b>
                                            <span>Disponíveis somente após realizar o pagamento</span>
                                        </div>
                                    </div>
                                </div>
                                <SpaceBox space={20} />
                            </div>
                        ) : ( //status de pagamento 
                            <div>
                                {paymentStatus == "PAGO" ? (
                                    <>
                                        <div style={{ textAlign: 'center', background: 'var(--primary-color)', padding: '20px' }}>
                                            <SpaceBox space={20} />
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                                <ion-icon name="checkmark-outline" size={"large"}></ion-icon>
                                            </div>
                                            <SpaceBox space={20} />
                                            <h3 style={{ color: 'white' }}>Tudo certo!</h3>
                                        </div>
                                        <div className='payment-pix-content'>
                                            <p style={{ color: 'black' }}>Seu pagamento foi aprovado.</p>
                                        </div>
                                    </>
                                ) : paymentStatus == "CANCELADO" ? (
                                    <>
                                        <div style={{ textAlign: 'center', background: 'red', padding: '20px' }}>
                                            <SpaceBox space={20} />
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                                <ion-icon name="close-outline" size={"large"}></ion-icon>
                                            </div>
                                            <SpaceBox space={20} />
                                            <h3 style={{ color: 'white' }}>Ah não :(</h3>
                                        </div>
                                        <div className='payment-pix-content'>
                                            <p style={{ color: 'black' }}>Seu pagamento foi expirado.</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ textAlign: 'center', background: 'gray', padding: '20px' }}>
                                            <SpaceBox space={20} />
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <div class="dot-typing"></div>
                                            </div>
                                            <SpaceBox space={20} />
                                            <h3 style={{ color: 'white' }}>Processando...</h3>
                                            <p style={{ color: 'white' }}>Analisando status de pagamento.</p>
                                        </div>
                                        <div className='payment-pix-content'>
                                            <p style={{ color: 'black' }}>O pagamento está sendo processado.</p>
                                        </div>
                                    </>
                                )}
                                <SpaceBox space={20} />
                            </div>
                        )}
                    </div>
                    <div className="checkout-resume">
                        <div className="product-summary">
                            <img
                                className="product-img"
                                src={Environment.API_BASE + `/sorteios/imagem/${checkout?.campanha?.imagens[0]?.id}` || `../placeholder-image.png`}
                                alt="Produto"
                            />
                            <div>
                                <h4>{checkout?.campanha?.name}</h4>
                                <label>Quantidade: <b>{checkout?.qtd}</b></label>
                            </div>
                        </div>
                        <SpaceBox space={20} />
                        <div className="totals">
                            <div>
                                <label>Subtotal</label>
                                <b>{Utils.convertNumberToBRL(checkout?.qtd * checkout?.campanha?.valor_por_bilhete)}</b>
                            </div>
                            <div>
                                <label>Taxa de serviço</label>
                                <b>{Utils.convertNumberToBRL(checkout?.taxa_cliente)}</b>
                            </div>
                            <div>
                                <label>Desconto</label>
                                <b>R$ 0,00</b>
                            </div>
                            <div>
                                <label>Total</label>
                                <b>{Utils.convertNumberToBRL((checkout?.qtd * checkout?.campanha?.valor_por_bilhete) + checkout?.taxa_cliente)}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FragmentView>
    );
};
