import React, { useEffect, useState } from 'react';
import './style.css';
import Utils from '../../Utils';
import SpaceBox from '../SpaceBox';
import Button from '../Button';
import Api from '../../Api';
import Modal from '../Modal';
import Input from '../Input';
import ModalConfirm from '../ModalConfirm';
import Environment from '../../Environment';

export default ({ id }) => {

    const [loaded, setLoaded] = useState(true);
    const [ebooks, setEbooks] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [description, setDescription] = useState("");
    const [thumb, setThumb] = useState(null);
    const [file, setFile] = useState(null);

    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [showModalEbook, setShowModalEbook] = useState(false);
    const [showModalDeleteEbook, setShowModalDeleteEbook] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getEbooks, { campanha_id: id });
        if (success) {
            setEbooks(data);
        }
        setLoaded(true);
    }

    const onCloseEbookCallback = () => {
        setTitulo("");
        setDescription("");
        setThumb(null);
        setFile(null);
    }

    const handleAddEbook = async () => {
        setShowButtonLoader(true);
    
        if (Utils.stringIsNullOrEmpty(titulo)) {
            Utils.notify("error", "Informe o título do eBook.");
            setShowButtonLoader(false);
            return;
        }
    
        if (Utils.stringIsNullOrEmpty(description)) {
            Utils.notify("error", "Informe a descrição do eBook.");
            setShowButtonLoader(false);
            return;
        }
    
        if (!thumb) {
            Utils.notify("error", "Selecione a capa do eBook.");
            setShowButtonLoader(false);
            return;
        }
    
        if (!file) {
            Utils.notify("error", "Selecione o eBook (arquivo PDF).");
            setShowButtonLoader(false);
            return;
        }
    
        // Criação do FormData para enviar os dados
        const formData = new FormData();
        formData.append('thumb', thumb);  // A capa do eBook
        formData.append('payload', file); // O arquivo PDF do eBook
        formData.append('name', titulo);  // Nome do eBook
        formData.append('description', description); // Descrição do eBook
        formData.append('campanha_id', id); // ID da campanha
    
        // Chama a função saveEbook passando formData diretamente
        const { success, data } = await Api.parceiro.saveEbook(formData);
    
        if (success) {
            Utils.notify("success", "Ebook adicionado com sucesso.");
            setShowModalEbook(false);
            onCloseEbookCallback();
            load();
        } else {
            Utils.notify("error", "Erro ao adicionar o eBook.");
        }
    
        setShowButtonLoader(false);
    }

    const handleRemove = (item) => {
        setShowModalDeleteEbook(true);
        setSelectedItem(item);
    }

    const onCancelEbookDelete = () => {
        setShowModalDeleteEbook(false);
        setSelectedItem(null);
    }

    const onConfirmCotaDelete = async () => {
        setEbooks((prev) => prev.filter((b) => b.id !== selectedItem?.id));
        setShowModalDeleteEbook(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.deleteEbook, { campanha_id: id, id_ebook: selectedItem.id }, true);
        if (success) {
            Utils.notify("success", "Ebook removido com sucesso.");
            load();
            onCancelEbookDelete();
        }
    }

    return (
        <>
            <Modal onCloseCallback={onCloseEbookCallback} setShow={setShowModalEbook} show={showModalEbook}>
                <div>
                    <div className="card-header">
                        <div className="icon-circle">
                            <ion-icon name="book-outline"></ion-icon>
                        </div>
                        <h3>Adicionar eBook</h3>
                    </div>
                    <SpaceBox space={8} />
                    <Input type={"text"} label={"Título do eBook"} setValue={setTitulo} value={titulo} />
                    <Input type={"textarea"} label={"Descrição do eBook"} setValue={setDescription} value={description} />
                    <label htmlFor='capa'>
                        <div style={{width: '100%', background: '#f5f5f5', borderRadius: '8px', border: 'dashed #ddd 1px', paddingTop: '15px', paddingBottom: '15px', fontSize: '16px', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--text-opacity)', cursor: 'pointer'}}>
                            &nbsp;&nbsp;&nbsp;<ion-icon name="image-outline"></ion-icon>&nbsp;
                            &nbsp;<span>{thumb ? `${thumb?.name?.substring(0, 25)}...` : `(Selecionar capa)`}</span>
                        </div>
                    </label>
                    <input id='capa' hidden type="file" label="Capa do eBook" onChange={e => setThumb(e.target.files[0])} />
                    <SpaceBox space={10}/>
                    <label htmlFor='ebook'>
                        <div style={{width: '100%', background: '#f5f5f5', borderRadius: '8px', border: 'dashed #ddd 1px', paddingTop: '15px', paddingBottom: '15px', fontSize: '16px', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--text-opacity)', cursor: 'pointer'}}>
                            &nbsp;&nbsp;&nbsp;<ion-icon name="book-outline"></ion-icon>&nbsp;
                            &nbsp;<span>{file ? `${file?.name?.substring(0, 25)}...` : `(Selecionar ebook)`}</span>
                        </div>
                    </label>
                    <input type="file" hidden id='ebook' label="Arquivo PDF do eBook" onChange={e => setFile(e.target.files[0])} />

                    <SpaceBox space={15} />
                    <Button disabled={showButtonLoader} style={{ width: '100%' }} onClick={handleAddEbook}>
                        {showButtonLoader ? (
                            <>
                                &nbsp;<div className="loader"></div>
                            </>
                        ) : (<>Adicionar</>)}
                    </Button>
                </div>
            </Modal>

            <ModalConfirm setShow={setShowModalDeleteEbook} show={showModalDeleteEbook} onCancel={onCancelEbookDelete} onConfirm={onConfirmCotaDelete}>
                <div className="card-header">
                    <div className="icon-circle">
                        <ion-icon name="trash-outline"></ion-icon>
                    </div>
                    <b>Confirmar remoção do eBook?</b>
                </div>
            </ModalConfirm>

            <div style={{ width: '100%', textAlign: 'left', maxWidth: '1000px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>eBook(s)</h2>
                    <Button onClick={() => { setShowModalEbook(true) }}>+ Adicionar</Button>
                </div>
                <SpaceBox space={10} />
                {loaded ? (
                    ebooks?.length > 0 ? (
                        <div className="table-container-p">
                            <table className="sales-table-p">
                                <thead>
                                    <tr>
                                        <th>Capa</th>
                                        <th>Título</th>
                                        <th>Data</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ebooks.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img style={{width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px'}} src={Environment.API_BASE + '/ebookviewer/view-thumb/' + item?.id}/>
                                            </td>
                                            <td>{item?.name}</td>
                                            <td>{Utils.formatDateNoTime(item?.createdAt)}</td>
                                            <td style={{textAlign: "center" }}>
                                                <ion-icon onClick={() => { handleRemove(item) }} name="trash-outline" size={"large"} style={{ cursor: 'pointer', color: 'rgb(82, 82, 82)' }}></ion-icon>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>) : (
                        <>
                            <SpaceBox space={40} />
                            <center><b>Não há ebooks...</b></center>
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
            </div>
        </>
    );
}
