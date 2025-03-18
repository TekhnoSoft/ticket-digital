import React, { useEffect, useState } from 'react';
import FragmentView from '../../components/FragmentView';
import SpaceBox from '../../components/SpaceBox';
import './style.css';
import Input from '../../components/Input';
import Utils from '../../Utils';
import Api from '../../Api';
import { Button, Card, Option, Select } from '../../components';

export default () => {

    const [loaded, setLoaded] = useState(false);
    const [pedidos, setPedidos] = useState([]);
    const [campanhas, setCampanhas] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [status, setStatus] = useState('');
    const [campanha, setCampanha] = useState('');
    const [filterVisible, setFilterVisible] = useState(false);

    const isMobile = Utils.mobileCheck();

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success: successPedidos, data: dataPedidos } = await Utils.processRequest(Api.parceiro.getPedidos, {});
        const { success: successCampanhas, data: dataCampanhas } = await Utils.processRequest(Api.parceiro.getCampanhas, {});
        if (successPedidos && successCampanhas) {
            setPedidos(dataPedidos);
            setCampanhas(dataCampanhas);
        }
        setLoaded(true);
    }

    const filteredData = pedidos.filter(item => {
        return (
            (name ? item.name.toLowerCase().includes(name.toLowerCase()) : true) &&
            (date ? item.data_compra.includes(date) : true) &&
            (status ? item.status.toLowerCase().includes(status.toLowerCase()) : true) &&
            (campanha ? item.sorteio_name.toLowerCase().includes(campanha.toLowerCase()) : true)
        );
    });

    const getStatusProps = (status) => {
        switch (status) {
            case "AGUARDANDO_PAGAMENTO":
                return "pendente"
            case "PAGO":
                return "pago"
            case "CANCELADO":
                return "cancelado"
        }
    }

    const handleClearFilter = () => {
        setName('');
        setDate('');
        setStatus('');
        setCampanha('');
    }

    const toggleFilterVisibility = () => {
        setFilterVisible(!filterVisible);
    }

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8} />
            <h2>Pedidos</h2>
            <SpaceBox space={15} />

            <Card title={"Filtros"} icon={<ion-icon name="filter-outline"></ion-icon>}>
                {isMobile && (
                    <div className="filter-toggle" onClick={toggleFilterVisibility} style={{display: 'flex', justifyContent: 'end'}}>
                        <ion-icon name={filterVisible ? "chevron-up-outline" : "chevron-down-outline"} style={{color: 'var(--text-opacity)', position: 'absolute', marginTop: '-30px', fontSize: '28px'}}></ion-icon>
                    </div>
                )}
                {(filterVisible || !isMobile) && (
                    <div className="filter-container-p">
                        <Select hideInputBoxMargin value={campanha} setValue={setCampanha}>
                            <Option value={""}>(Campanha)</Option>
                            {campanhas?.map(c => (
                                <Option value={c?.name} key={c?.name}>{c?.name}</Option>
                            ))}
                        </Select>
                        <Input hideInputBoxMargin type={"text"} label={"Filtrar por nome"} value={name} setValue={setName} />
                        <Input hideInputBoxMargin type={"date"} value={date} setValue={setDate} />
                        <Select hideInputBoxMargin value={status} setValue={setStatus}>
                            <Option value={""}>(Status)</Option>
                            <Option value={"AGUARDANDO_PAGAMENTO"}>Pendente</Option>
                            <Option value={"PAGO"}>Pago</Option>
                            <Option value={"CANCELADO"}>Cancelado</Option>
                        </Select>
                        <Button onClick={handleClearFilter}>Limpar filtro</Button>
                    </div>
                )}
            </Card>

            {loaded ? (
                filteredData?.length > 0 ? (
                    <div className="table-container-p">
                        <table className="sales-table-p">
                            <thead>
                                <tr>
                                    <th style={{textAlign: 'left'}}>Status</th>
                                    <th>Total</th>
                                    <th>Quantidade</th>
                                    <th>Campanha</th>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Subtotal</th>
                                    <th>Desconto</th>
                                    <th>Taxa Afiliado</th>
                                    <th>Referência</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{textAlign: 'left'}}>
                                            <span className={`status-bubble-p ${getStatusProps(item.status)}`}></span>&nbsp;{getStatusProps(item.status)}
                                        </td>
                                        <td>{Utils.convertNumberToBRL(item.total)}</td>
                                        <td>x{item.quantidade}</td>
                                        <td>{item.sorteio_name}</td>
                                        <td>{item.name}</td>
                                        <td>{Utils.formatDataISO(item.data_compra)}</td>
                                        <td>{Utils.convertNumberToBRL(item.subtotal)}</td>
                                        <td>{Utils.convertNumberToBRL(item.desconto)}</td>
                                        <td>{Utils.convertNumberToBRL(item.taxa_afiliado)}</td>
                                        <td>{item.observacao || "Plataforma"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>) : (
                    <>
                        <SpaceBox space={40} />
                        <center><b>Não há dados...</b></center>
                        <SpaceBox space={40} />
                    </>
                )
            ) : (
                <>
                    <SpaceBox space={40} />
                    <center><b>Carregando...</b></center>
                    <SpaceBox space={40} />
                </>
            )}

            <SpaceBox space={80} />
        </FragmentView>
    );
};
