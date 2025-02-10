import React, { useEffect, useState } from 'react';
import { Button, Card, FragmentView, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import Api from '../../Api';
import Environment from '../../Environment';
import { useNavigate } from 'react-router-dom';

export default () => {

    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);
    const [ebooks, setEbooks] = useState([]);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success: ebooksSuccess, data: dataEbooks } = await Utils.processRequest(Api.geral.getEbooks, {});
        if (ebooksSuccess) {
            setEbooks(dataEbooks);
        }
        setLoaded(true);
    }

    const handleContact = (item) => {
        if(item?.telefone_contato){
            window.open(`https://api.whatsapp.com/send/?phone=${item?.telefone_contato}&text=Ol%C3%A1%20gostaria%20de%20adquirir%20o%20ebook%20${item?.name}&type=phone_number&app_absent=0`, 'blank')
        }else{
            window.open(`https://api.whatsapp.com/send/?phone=61981147957&text=Ol%C3%A1%20gostaria%20de%20adquirir%20o%20ebook%20${item?.name}&type=phone_number&app_absent=0`, 'blank')
        }
    }

    const handleCampanha = (item) => {
        navigate(`/campanha/${item?.keybind}`)
    }

    return (
        <FragmentView headerMode={"USER"}>
            <div className='responsive-margin'>
                <SpaceBox space={20} />
                <h2 className='text-opacity'>Catálogo de eBooks</h2>
                <SpaceBox space={20} />
                <img style={{width: '100%'}} src='../bannner_ebook_2.png'/>
                {!loaded ? (
                    <>
                        <SpaceBox space={10} />
                        <center><b>Carregando...</b></center>
                        <SpaceBox space={10} />
                    </>
                ) : (null)}
                {loaded && ebooks?.length <= 0 ? (
                    <>
                        <SpaceBox space={10} />
                        <center><b>Não há ebooks no momento :(</b></center>
                        <SpaceBox space={10} />
                    </>
                ) : (null)}
                <SpaceBox space={40} />
                <div className="grid-container">
                    {ebooks?.map(item => (
                        <Card style={{ width: '145px' }}>
                            <img
                                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
                                src={Environment.API_BASE + '/ebookviewer/view-thumb/' + item?.id}
                            />
                            <SpaceBox space={4} />
                            <p
                                style={{
                                    fontSize: '12px',
                                    whiteSpace: 'nowrap', // Evita quebra de linha
                                    overflow: 'hidden', // Oculta o texto que excede o limite
                                    textOverflow: 'ellipsis', // Adiciona '...' no final do texto
                                    width: '100%', // Garante que o p ocupe todo o espaço disponível
                                    display: 'block' // Garante que o p se comporte como um bloco
                                }}
                            >
                                {item?.name}
                            </p>
                            <SpaceBox space={8} />
                            {item?.sorteio_id > 0 && item?.status == 'ATIVO'? (
                                <>
                                    <div className='acao-promocional' onClick={() => {handleCampanha(item)}}>
                                        <span>ação promocional</span>
                                        <ion-icon name="open-outline"></ion-icon>
                                    </div>
                                    <SpaceBox space={8} /> 
                                </>
                            ) : (null)}
                            <Button
                                style={{ height: '40px', width: '100%', borderRadius: '8px' }}
                                onClick={() => { handleContact(item) }}
                            >
                                Comprar
                            </Button>
                        </Card>
                    ))}
                </div>
                <SpaceBox space={40} />
                <img style={{width: '100%'}} src='../bannner_ebook_1.png'/>
                <SpaceBox space={40} />
            </div>
        </FragmentView>
    )
}
