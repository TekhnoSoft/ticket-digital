import React, { useState } from 'react';
import FragmentView from '../../components/FragmentView';
import SpaceBox from '../../components/SpaceBox';
import './style.css';
import Input from '../../components/Input';
import Utils from '../../Utils';

export default () => {
    const [filters, setFilters] = useState({
        nome: '',
        data: '',
        status: ''
    });

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const data = [
        { nome: 'Marcos', campanha: 'BMW 320I OU 120K', quantidade: 5, data: '2025-01-01', subtotal: 100, desconto: 10, taxa: 5, afiliado: 3, total: 95, status: 'Pendente' },
        { nome: 'Paulo', campanha: 'BMW 320I OU 120K', quantidade: 2, data: '2025-01-02', subtotal: 200, desconto: 20, taxa: 10, afiliado: 3, total: 170, status: 'Concluído' },
        { nome: 'Paulo', campanha: 'BMW 320I OU 120K', quantidade: 2, data: '2025-01-02', subtotal: 200, desconto: 20, taxa: 10, afiliado: 3, total: 170, status: 'Cancelado' },
        // Adicione mais dados aqui
    ];

    const filteredData = data.filter(item => {
        return (
            (name ? item.nome.toLowerCase().includes(name.toLowerCase()) : true) &&
            (date ? item.data.includes(date) : true) &&
            (status ? item.status.toLowerCase().includes(status.toLowerCase()) : true)
        );
    });

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8} />
            <h2>Pedidos</h2>
            <SpaceBox space={15} />

            <div className="filter-container-p">
                <Input hideInputBoxMargin type={"text"} label={"Filtrar por nome"} value={name} setValue={setName}/>
                <Input hideInputBoxMargin type={"date"} value={date} setValue={setDate}/>
                <Input hideInputBoxMargin type={"text"} label={"Filtrar por status"} value={status} setValue={setStatus}/>
            </div>

            <div className="table-container-p">
                <table className="sales-table-p">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Campanha</th>
                            <th>Quantidade</th>
                            <th>Data</th>
                            <th>Subtotal</th>
                            <th>Desconto</th>
                            <th>Taxa</th>
                            <th>Afiliado</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>{item.campanha}</td>
                                <td>x{item.quantidade}</td>
                                <td>{item.data}</td>
                                <td>{Utils.convertNumberToBRL(item.subtotal)}</td>
                                <td>{Utils.convertNumberToBRL(item.desconto)}</td>
                                <td>{Utils.convertNumberToBRL(item.taxa)}</td>
                                <td>{Utils.convertNumberToBRL(item.afiliado)}</td>
                                <td>{Utils.convertNumberToBRL(item.total)}</td>
                                <td>
                                    <span className={`status-bubble-p ${item.status.toLowerCase()}`}></span>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </FragmentView>
    );
};
