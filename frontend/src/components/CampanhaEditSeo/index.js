import React, { useEffect, useState } from 'react';
import './style.css';
import Card from '../Card';
import Button from '../Button';
import SpaceBox from '../SpaceBox';
import Input from '../Input';
import Utils from '../../Utils';
import Api from '../../Api';
import Environment from '../../Environment';

export default ({ id }) => {

    const [loaded, setLoaded] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [img, setImg] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keybind, setKeybind] = useState("");

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getCampanhaSeo, { campanha_id: id });
        if(success){
            setTitle(data?.seo_title);
            setDescription(data?.seo_description);
            setKeybind(data?.link);
            setImg(Environment.API_BASE + `/sorteios/imagem/${data?.id_image}`)
        }
        setLoaded(true);
    }

    const handleSave = async () => {
        setShowButtonLoader(true);
        const { success, data } = await Utils.processRequest(Api.parceiro.updateCampanhaSeo, { campanha_id: id, title, description });
        if(success){
            Utils.notify("success", "SEO atualizado com sucesso.");
            load();
        }
        setShowButtonLoader(false);
    }

    return (
        <>
            <Card title={"SEO"} icon={<ion-icon name="search-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <Input type={"text"} label={"Título SEO"} maxLegth={60} setValue={setTitle} value={title}/>
                <SpaceBox space={8} />
                <Input type={"textarea"} hideInputBoxMargin label={description ? "" :  "Descrição SEO"} maxLegth={150} setValue={setDescription} value={description}/>
            </Card>
            <SpaceBox space={20} />
            <Card title={"Pré-visualização"} icon={<ion-icon name="eye-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <label style={{color: 'var(--text-opacity)', fontSize: '14px'}}>Whatsapp:</label>
                <div className='whatsapp-content'>
                    <div className='whatsapp-content-image'>
                        <img src={img || '../placeholder-image.png'} />
                    </div>
                    <div className='whatsapp-content-text'>
                        <span className='whatsapp-content-text-title'>{title || "Título"}</span>
                        <span className='whatsapp-content-text-description'>{description || "Descrição"}</span>
                        <span className='whatsapp-content-text-link'>ebookdasorte.com</span>
                    </div>
                    <span className='whatsapp-content-text-link-bottom'>
                        https://campanha.ebookdasorte.com/?keybind={keybind} <br/>
                    </span>
                </div>
                <SpaceBox space={20}/>
                <label style={{color: 'var(--text-opacity)', fontSize: '14px'}}>Facebook:</label>
                <div className='facebook-content'>
                    <div className='facebook-content-div'>
                        <img src={img || '../placeholder-image.png'} />
                    </div>
                    <div className='facebook-content-text'>
                        <span className='facebook-content-link'>ebookdasorte.com</span>
                        <span className='facebook-content-title'>{title || "Título"}</span>
                        <span className='facebook-content-description'>{description || "Descrição"}</span>
                    </div>
                </div>
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
