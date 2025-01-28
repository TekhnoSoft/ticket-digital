import React, { useEffect, useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Option from '../../components/Option';
import Api from '../../Api';
import Utils from '../../Utils';
import { Button, Modal, Switch } from '../../components';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(0);

    const [titulo, setTitulo] = useState("");
    const [contato, setContato] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("R$ 0,00");

    const [tipo, setTipo] = useState(0);

    const [flgDataSorteio, setFlgDataSorteio] = useState(false);
    const [dataSorteio, setDataSorteio] = useState("");
    const [expiracaoPagamento, setExpiracaoPagamento] = useState("");

    const [nCotas, setNCotas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [showModalPremios, setShowModalPremios] = useState(false);
    const [premios, setPremios] = useState([]);
    const [tituloPremio, setTituloPremio] = useState("");
    const [descricaoPremio, setDescricaoPremio] = useState("");

    const [taxas, setTaxas] = useState([]);
    const [arrecadacao, setArrecadacao] = useState("");
    const [taxaPublicacao, setTaxaPublicacao] = useState("");
    const [showModalTaxas, setShowModalTaxas] = useState(false);

    const [showButtonLoader, setShowButtonLoader] = useState(false);

    useEffect(() => {
        load();
    }, [])

    useEffect(() => {
        let qtdCotas = nCotas.filter(c => { return c?.id == quantidade })[0]?.valor || 0;
        let _valor = Utils.convertBRLToNumber(valor);
        let _arrecadacao = (qtdCotas * _valor);
        setArrecadacao(Utils.convertNumberToBRL(_arrecadacao));
        setTaxaPublicacao(Utils.convertNumberToBRL(obterPreco(_arrecadacao)));
    }, [quantidade, valor])

    const load = async () => {
        const { success: successRegras, data: dataRegras } = await Utils.processRequest(Api.geral.getSorteioRegras, {});
        const { success: successCategorias, data: dataCategorias } = await Utils.processRequest(Api.geral.getSorteioCategorias, {});
        const { success: successTaxas, data: dataTaxas } = await Utils.processRequest(Api.geral.getSorteioPublicacaoTaxas, {});
        if (successRegras && successCategorias && successTaxas) {
            setNCotas(dataRegras);
            setCategorias(dataCategorias);
            setTaxas(dataTaxas);
        }
    }

    const obterPreco = (valor) => {
        const faixa = taxas.find(faixa => valor >= faixa.min && valor <= faixa.max);
        return faixa ? faixa.price : null;
    }

    const next = () => {
        let valid = validateForm();
        if (valid) {
            let newStep = step + 1;
            setStep(newStep);
        }
    }

    const prev = () => {
        let newStep = step - 1;
        setStep(newStep);
    }

    const validateForm = () => {
        switch (step) {
            case 0:
                if (Utils.stringIsNullOrEmpty(titulo)) {
                    Utils.notify("error", "Digite o título da campanha.");
                    return false;
                }
                if (Utils.stringIsNullOrEmpty(contato)) {
                    Utils.notify("error", "Digite o número de contato.");
                    return false;
                }
                if (!Utils.validarCelular(contato)) {
                    Utils.notify("error", "Digite um contato válido.");
                    return false;
                }
                if (Utils.stringIsNullOrEmpty(categoria)) {
                    Utils.notify("error", "Selecione a categoria da campanha.");
                    return false;
                }
                if (Utils.stringIsNullOrEmpty(quantidade)) {
                    Utils.notify("error", "Selecione a quantidade de cotas.");
                    return false;
                }
                if (Utils.stringIsNullOrEmpty(valor)) {
                    Utils.notify("error", "Digite o valor unitário das cotas.");
                    return false;
                }
                if (flgDataSorteio && Utils.stringIsNullOrEmpty(dataSorteio)) {
                    Utils.notify("error", "Informe a data do sorteio.");
                    return false;
                }
                if (Utils.stringIsNullOrEmpty(expiracaoPagamento)) {
                    Utils.notify("error", "Selecione o prazo de expiração de pagamento das cotas.");
                    return false;
                }
                return true;
            case 1:
                if (premios?.length <= 0) {
                    Utils.notify("error", "Informe pelo menos um prêmio.");
                    return false;
                }
                return true;
        }
    }

    const addPremioHandler = () => {
        setShowModalPremios(true);
    }

    const onClosePremiosCallback = () => {
        setShowModalPremios(false);
    }

    const handleAdd = (novoPremio) => {
        if (Utils.stringIsNullOrEmpty(novoPremio?.name)) {
            Utils.notify("error", "Digite o título do prêmio.")
            return;
        }
        setPremios((prev) => [...prev, novoPremio]);
        setShowModalPremios(false);
        setTituloPremio("");
        setDescricaoPremio("");
    };

    const handleRemove = (id) => {
        setPremios((prev) => prev.filter((premio) => premio.id !== id));
    };

    const handleFinish = async () => {

        setShowButtonLoader(true);

        let campanha = {
            nome: titulo,
            contato: Utils.replaceMaskPhone(contato),
            categoria: Number(categoria),
            regra: Number(quantidade),
            valor: Utils.convertBRLToNumber(valor),
            tipo: tipo,
            data: flgDataSorteio ? dataSorteio : null,
            prazo_pagamento: expiracaoPagamento,
            premios: premios
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.createCampanha, { campanha }, true);

        if (success) {
            Utils.notify("success", "Campanha criada com sucesso!");
            navigate(`/parceiro-edit-campanha/${data?.id}`);
        }

        setShowButtonLoader(false);

    }

    const onCloseTaxasCallback = () => {

    }

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <Modal onCloseCallback={onClosePremiosCallback} setShow={setShowModalPremios} show={showModalPremios}>
                <div>
                    <div className="card-header">
                        <div className="icon-circle">
                            <ion-icon name="trophy-outline"></ion-icon>
                        </div>
                        <h3>Adicionar {premios?.length + 1}º prêmio</h3>
                    </div>
                    <SpaceBox space={8} />
                    <Input type={"text"} label={"Título"} setValue={setTituloPremio} value={tituloPremio} />
                    <Input type={"textarea"} label={"Descrição"} setValue={setDescricaoPremio} value={descricaoPremio} />
                    <SpaceBox space={8} />
                    <Button style={{ width: '100%' }} onClick={() => handleAdd({ id: Date.now(), name: tituloPremio, description: descricaoPremio })}>Adicionar</Button>
                </div>
            </Modal>
            <Modal onCloseCallback={onCloseTaxasCallback} show={showModalTaxas} setShow={setShowModalTaxas}>
                <div className='table-container-p' style={{ height: '500px', scrollY: 'auto', marginTop: '0px' }}>
                    <table className='sales-table-p'>
                        <thead>
                            <tr style={{ position: 'sticky', top: '0px' }}>
                                <th style={{ fontSize: '12px' }}>
                                    Arrecadação estimada
                                </th>
                                <th style={{ fontSize: '12px' }}>
                                    Taxa de publicação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxas?.map(t => (
                                <tr>
                                    <td style={{ fontSize: '12px' }}>
                                        {t?.name}
                                    </td>
                                    <td style={{ fontSize: '12px' }}>
                                        {Utils.convertNumberToBRL(Number(t?.price))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '1200px', width: '800px' }}>
                    {step == 0 ? (<>
                        <SpaceBox space={10} />
                        <Card title={"Dados básicos"} icon={<ion-icon name="list-outline"></ion-icon>}>
                            <p style={{ fontSize: '14px', color: 'var(--text-opacity)', lineHeight: '1' }}>Insira os dados de como deseja a sua campanha abaixo, eles poderão ser editados depois:</p>
                            <SpaceBox space={5} />
                            <Input type={"text"} label={"Título da campanha"} setValue={setTitulo} value={titulo} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Input style={{ width: '100%' }} type={"celular"} label={"Celular público"} setValue={setContato} value={contato} />
                                <Select width={"100%"} label={"Categoria"} setValue={setCategoria} value={categoria}>
                                    <Option value={""}>Selecionar...</Option>
                                    {categorias?.map(c => (
                                        <Option value={c?.id}>{c?.nome}</Option>
                                    ))}
                                </Select>
                            </div>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Select hideInputBoxMargin width={"100%"} label={"Nº Cotas"} setValue={setQuantidade} value={quantidade}>
                                    <Option value={""}>Selecionar...</Option>
                                    {nCotas?.map(c => (
                                        <Option value={c?.id}>{c?.name}</Option>
                                    ))}
                                </Select>
                                <Input hideInputBoxMargin style={{ width: '100%' }} type={"moeda"} label={"Valor por cota"} setValue={setValor} value={valor} />
                            </div>
                        </Card>
                        <SpaceBox space={15} />
                        <Card title={"Arrecadação estimada"} icon={<ion-icon name="cash-outline"></ion-icon>}>
                            <SpaceBox space={8} />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <b>Arrecadação</b>
                                <b>{arrecadacao}</b>
                            </div>
                        </Card>
                        <SpaceBox space={15} />
                        <Card title={"Modelo"} icon={<ion-icon name="cube-outline"></ion-icon>}>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { setTipo(0) }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: tipo == 0 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                                    <img width={"100px"} src='../sistema_escolhe.png' />
                                </div>
                                <div style={{ borderTop: tipo == 0 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderBottom: tipo == 0 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderRight: tipo == 0 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', height: '100px', display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <div style={{ paddingLeft: '10px', marginRight: '10px' }}>
                                        <h3>Aleatório</h3>
                                        <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>O usuário recebe as cotas aleatórias (recomendado)</span>
                                    </div>
                                </div>
                            </div>
                            <SpaceBox space={15} />
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { setTipo(1) }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: tipo == 1 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                                    <img width={"100px"} src='../usuario_escolhe.png' />
                                </div>
                                <div style={{ borderTop: tipo == 1 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderBottom: tipo == 1 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderRight: tipo == 1 ? 'solid 1px var(--primary-color)' : 'solid 1px #ddd', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', height: '100px', display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <div style={{ paddingLeft: '10px', marginRight: '10px' }}>
                                        <h3>Mostrar os bilhetes</h3>
                                        <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>O usuário seleciona as cotas que desejar</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <SpaceBox space={15} />
                        <Card title={"Data e expiração"} icon={<ion-icon name="calendar-clear-outline"></ion-icon>}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10PX' }}>
                                <Switch index={0} isOn={flgDataSorteio} onChange={e => { setFlgDataSorteio(e.target.checked) }} colorOne={"var(--primary-color)"} />
                                <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>Informar data do sorteio (opcional)</span>
                            </div>
                            {flgDataSorteio ? (
                                <>
                                    <Input type={"date"} setValue={setDataSorteio} value={dataSorteio} />
                                </>
                            ) : (
                                <SpaceBox space={15} />
                            )}
                            <SpaceBox space={10} />
                            <Select hideInputBoxMargin width={"100%"} label={"Prazo de pagamento das cotas"} setValue={setExpiracaoPagamento} value={expiracaoPagamento}>
                                <Option value={""}>Selecionar...</Option>
                                <Option value={"5MIN"}>5 Minutos (recomendado)</Option>
                                <Option value={"10MIN"}>10 Minutos</Option>
                                <Option value={"15MIN"}>15 Minutos</Option>
                                <Option value={"30MIN"}>30 Minutos</Option>
                                <Option value={"1H"}>1 Hora</Option>
                                <Option value={"5H"}>5 Horas</Option>
                                <Option value={"10H"}>10 Horas</Option>
                                <Option value={"24H"}>24 Horas</Option>
                            </Select>
                        </Card>
                        <SpaceBox space={20} />
                    </>
                    ) : step == 1 ? (
                        <>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <SpaceBox space={20} />
                                <h2>Prêmio(s)</h2>
                                <span style={{ color: 'var(--text-opacity)', fontSize: '14px' }}>Insira um ou mais prêmios que os ganhadores serão contemplados:</span>
                                {premios?.length <= 0 ? (
                                    <div className='trofeu'>
                                        <ion-icon name="trophy-outline"></ion-icon>
                                    </div>
                                ) : (
                                    <>
                                        <SpaceBox space={20} />
                                        {premios?.map((p, index) => (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                                <b style={{ fontSize: '28px' }}>{index + 1}º</b>
                                                <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '20px' }}>
                                                    <b>{p?.name}</b>
                                                    <ion-icon onClick={() => { handleRemove(p?.id) }} name="trash-outline" size={"large"} style={{ cursor: 'pointer', color: 'rgb(82, 82, 82)' }}></ion-icon>
                                                </Card>
                                            </div>
                                        ))}
                                        <SpaceBox space={15} />
                                        <div onClick={addPremioHandler} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center', padding: '20px', borderRadius: '8PX', border: 'dashed 1px gray' }}>
                                            <ion-icon name="add-circle-outline"></ion-icon>
                                            <b>Adicionar prêmio</b>
                                        </div>
                                        <SpaceBox space={20} />
                                        <Card title={"Taxas de publicação"} icon={<ion-icon name="megaphone-outline"></ion-icon>} alignItems={"start"} button={{ title: "Ver taxas", onClick: () => { setShowModalTaxas(true) }, style: { background: "rgb(242, 242, 242)", color: 'rgb(82, 82, 82)', height: '35px', borderRadius: '8px' } }} >
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <b>Taxa de publicação</b>
                                                <b>{taxaPublicacao}</b>
                                            </div>
                                            <SpaceBox space={8} />
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <b>Arrecadação estimada</b>
                                                <b>{arrecadacao}</b>
                                            </div>
                                        </Card>
                                        <SpaceBox space={20} />
                                        <p style={{ fontSize: '12px', color: 'var(--text-opacity)' }}>
                                            Ao criar a sua campanha, você concorda com nossos <b style={{ color: 'black' }}>termos de uso</b> e a nossa <b style={{ color: 'black' }}>política de privacidade</b>p, e confirma ter mais de 18 anos.
                                        </p>
                                        <SpaceBox space={20} />
                                    </>
                                )}
                            </div>
                        </>
                    ) : (null)}
                    {step == 0 ? (
                        <>
                            <Button style={{ width: '100%' }} onClick={next}>Continuar</Button>
                        </>
                    ) : (
                        premios?.length <= 0 ? (
                            <Button style={{ width: '100%' }} onClick={addPremioHandler}>+ Adicionar prêmio</Button>
                        ) : (
                            <>
                                <Button disabled={showButtonLoader} style={{ width: '100%' }} onClick={handleFinish}>
                                    {showButtonLoader ? (
                                        <>
                                            &nbsp;<div class="loader"></div>
                                        </>
                                    ) : (<>Criar campanha</>)}
                                </Button>
                                {step > 0 ? (
                                    <Button style={{ width: '100%', background: 'transparent', color: 'black', fontWeight: 'bold' }} onClick={prev}>
                                        <ion-icon name="arrow-back-outline"></ion-icon>
                                        <b>Voltar</b>
                                    </Button>
                                ) : (null)}
                            </>
                        )
                    )}
                </div>
            </div >
            <SpaceBox space={80} />
        </FragmentView >
    )
}
