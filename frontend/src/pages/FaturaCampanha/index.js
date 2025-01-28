import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Button, Card, FragmentView, Hr, Input, SpaceBox } from '../../components';
import QRCode from "react-qr-code";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Environment from '../../Environment';
import Utils from '../../Utils';
import { MainContext } from '../../helpers/MainContext';
import Api from '../../Api';

export default () => {

    const navigate = useNavigate();

    const { id_remessa } = useParams();

    const [paymentStatus, setPaymentStatus] = useState("");

    const [qrCode, setQrCode] = useState(null);
    const [barCode, setBarCode] = useState(null);

    const [step, setStep] = useState(1);

    const [campanha, setCampanha] = useState(null);

    const [loaded, setLoaded] = useState(false);

    const [taxaCliente, setTaxaCliente] = useState(null);

    const [idLogo, setIdLogo] = useState(null); 
    const [color, setColor] = useState(null);

    useEffect(() => {
        load();
        checkFaturaIsPayed(id_remessa, null);
        let interval = setInterval(() => { checkFaturaIsPayed(id_remessa, interval) }, 3000);
    }, [])

    useEffect(() => {
        if(campanha){
            setColor(campanha?.parceiro?.colorPrimary)
            console.log(campanha?.logo?.id)
            setIdLogo(campanha?.logo?.id);
        }
    }, [campanha])

    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', color);
    }, [color])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.geral.getFatura, { id_remessa }, true);
        const { success: successTaxas, data: taxasData } = await Utils.processRequest(Api.geral.getTaxas, { user_id: data?.sorteio?.user_id });
        if (success && successTaxas) {
            setCampanha(data);
            setTaxaCliente(taxasData);
        } else {
            navigate(-1);
        }
        setLoaded(true);
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

    return (
        <FragmentView headerMode={"PAYMENT"} headerPaymentStep={3} logo={idLogo}>
            {loaded ? (
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div className='checkout-all'>
                        <div className='checkout-left' style={{ width: '100%' }}>
                            <SpaceBox space={20} />
                            {step == 1 ? (
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
                                                <span>{campanha?.user?.name}</span>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <b>E-mail(a):</b>
                                                <span>{campanha?.user?.email}</span>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <b>Celular:</b>
                                                <span>{Utils.formatToCelular(campanha?.user?.phone)}</span>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <b>CPF:</b>
                                                <span>{Utils.formatCpf(campanha?.user?.cpf)}</span>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <b>Status:</b>
                                                <span>Aguardando pagamento</span>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <b>Data:</b>
                                                <span>{Utils.formatDateTime(campanha?.fatura?.data_compra)}</span>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <b>Campanha:</b>
                                                <span>Ativação somente após realizar o pagamento</span>
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
                                    src={campanha?.imagem ? Environment.API_BASE + `/sorteios/imagem/${campanha?.imagem}` : `../placeholder-image.png`}
                                    alt="Produto"
                                />
                                <div>
                                    <h4>{campanha?.sorteio?.name}</h4>
                                    <label>Campanha</label>
                                </div>
                            </div>
                            <SpaceBox space={20} />
                            <div className="totals">
                                <div>
                                    <label>Subtotal</label>
                                    <b>{Utils.convertNumberToBRL(campanha?.fatura?.subtotal)}</b>
                                </div>
                                <div>
                                    <label>Taxa de serviço</label>
                                    <b>{Utils.convertNumberToBRL(campanha?.fatura?.taxa_cliente)}</b>
                                </div>
                                <div>
                                    <label>Desconto</label>
                                    <b>{Utils.convertNumberToBRL(campanha?.fatura?.desconto)}</b>
                                </div>
                                <div>
                                    <label>Total</label>
                                    <b>{Utils.convertNumberToBRL(campanha?.fatura?.total)}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (null)}
        </FragmentView>
    )
}
