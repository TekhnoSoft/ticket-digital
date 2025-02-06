import React, { useEffect, useState } from 'react';
import './style.css';
import SpaceBox from '../../components/SpaceBox';
import Card from '../Card';
import Input from '../Input';
import Select from '../Select';
import Option from '../Option';
import Switch from '../Switch';
import Button from '../Button';
import Utils from '../../Utils';
import Api from '../../Api';

export default ({ id }) => {

    const [campanha, setCampanha] = useState(null);

    const [titulo, setTitulo] = useState("");
    const [contato, setContato] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState(0);
    const [flgDataSorteio, setFlgDataSorteio] = useState(false);
    const [dataSorteio, setDataSorteio] = useState("");
    const [expiracaoPagamento, setExpiracaoPagamento] = useState("");

    const [categorias, setCategorias] = useState([]);

    const [showButtonLoader, setShowButtonLoader] = useState(false);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        const { success: successCampanhaInfos, data: dataCampanhaInfos } = await Utils.processRequest(Api.parceiro.getCampanhaInfos, { campanha_id: id });
        const { success: successCategorias, data: dataCategorias } = await Utils.processRequest(Api.geral.getSorteioCategorias, {});
        if (successCategorias && successCampanhaInfos) {
            setCategorias(dataCategorias);
            setCampanha(dataCampanhaInfos);
            setFormData(dataCampanhaInfos);
        }
    }

    const setFormData = (data) => {
        setTitulo(data?.name);
        setContato(Utils.formatToCelular(data?.info?.telefone_contato));
        setCategoria(data?.sorteio_categoria_id);
        setTipo(data?.tipo == "SISTEMA_ESCOLHE" ? 0 : 1);
        if(data?.info?.data_sorteio){
            setFlgDataSorteio(true);
            setDataSorteio(data?.info?.data_sorteio);
        }else{
            setFlgDataSorteio(false);
            setDataSorteio(null);
        }
        setExpiracaoPagamento(data?.prazo_pagamento);
    }

    const handleSave = async () => {
        setShowButtonLoader(true);

        if (Utils.stringIsNullOrEmpty(titulo)) {
            Utils.notify("error", "Digite o título da campanha.");
            setShowButtonLoader(false);
            return false;
        }
        if (Utils.stringIsNullOrEmpty(contato)) {
            Utils.notify("error", "Digite o número de contato.");
            setShowButtonLoader(false);
            return false;
        }
        if (!Utils.validarCelular(contato)) {
            Utils.notify("error", "Digite um contato válido.");
            setShowButtonLoader(false);
            return false;
        }
        if (categoria == "") {
            Utils.notify("error", "Selecione a categoria da campanha.");
            setShowButtonLoader(false);
            return false;
        }
        if (flgDataSorteio && Utils.stringIsNullOrEmpty(dataSorteio)) {
            Utils.notify("error", "Informe a data do sorteio.");
            setShowButtonLoader(false);
            return false;
        }
        if (Utils.stringIsNullOrEmpty(expiracaoPagamento)) {
            Utils.notify("error", "Selecione o prazo de expiração de pagamento das cotas.");
            setShowButtonLoader(false);
            return false;
        }

        let infos = {
            campanha_id: id,
            name: titulo, 
            sorteio_categoria_id: categoria, 
            telefone_contato: Utils.replaceMaskPhone(contato), 
            tipo: tipo == 0 ? "SISTEMA_ESCOLHE" : "USUARIO_ESCOLHE", 
            prazo_pagamento: expiracaoPagamento, 
            data_sorteio: flgDataSorteio ? dataSorteio : null
        }

        const { success, data } = await Utils.processRequest(Api.parceiro.saveCampanhaInfos, {infos }, true);

        if(success){
            Utils.notify("success", "Informações salvas com sucesso.");
            load();
        }

        setShowButtonLoader(false);
    }   

    return (
        <>
            <Card title={"Dados básicos"} icon={<ion-icon name="pencil-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <Input type={"text"} label={"Título da campanha"} setValue={setTitulo} value={titulo} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Input style={{ width: '100%' }} hideInputBoxMargin type={"celular"} label={"Celular público"} setValue={setContato} value={contato} />
                    <Select width={"100%"} label={"Categoria"} hideInputBoxMargin setValue={setCategoria} value={categoria}>
                        <Option value={""}>Selecionar...</Option>
                        {categorias?.map(c => (
                            <Option value={c?.id}>{c?.nome}</Option>
                        ))}
                    </Select>
                </div>
            </Card>
            <SpaceBox space={20} />
            <Card title={"Modelo"} icon={<ion-icon name="cube-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
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
            <SpaceBox space={20} />
            <Card title={"Data e expiração"} icon={<ion-icon name="calendar-clear-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
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
            <Button disabled={showButtonLoader} onClick={handleSave} style={{ width: '100%', maxWidth: '1015px' }}>
                {showButtonLoader ? (
                    <>
                        &nbsp;<div class="loader"></div>
                    </>
                ) : (<>Salvar</>)}
            </Button>
        </>
    )
}
