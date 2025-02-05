import React, { useState } from 'react';
import './style.css';
import SpaceBox from '../../components/SpaceBox';
import Card from '../Card';
import Input from '../Input';
import Select from '../Select';
import Option from '../Option';
import Switch from '../Switch';

export default ({ id }) => {

    const [titulo, setTitulo] = useState("");
    const [contato, setContato] = useState("");
    const [categoria, setCategoria] = useState("");

    const [tipo, setTipo] = useState(0);

    const [flgDataSorteio, setFlgDataSorteio] = useState(false);
    const [dataSorteio, setDataSorteio] = useState("");
    const [expiracaoPagamento, setExpiracaoPagamento] = useState("");

    const [nCotas, setNCotas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [arrecadacao, setArrecadacao] = useState("");

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
        </>
    )
}
