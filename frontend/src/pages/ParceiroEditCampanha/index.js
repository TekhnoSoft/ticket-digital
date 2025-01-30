import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FragmentView from '../../components/FragmentView';
import SpaceBox from '../../components/SpaceBox';
import { Button, CampanhaEditDetails, CampanhaEditImages, CampanhaEditAward, CampanhaEditEbooks, CampanhaEditInfos, CampanhaEditOptions, CampanhaEditSeo, CampanhaEditTicketWinner, Hr, CampanhaEditDescription } from '../../components';
import './style.css';
import Api from '../../Api';
import Utils from '../../Utils';

export default () => {
    const { campanha_id } = useParams();
    const navigate = useNavigate();

    const [abaAtiva, setAbaAtiva] = useState(1); 
    const [campanha, setCampanha] = useState(null);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        const { success, data } = await Utils.processRequest(Api.parceiro.getCampanhaStatus, { campanha_id: campanha_id });
        if (success) {
            setCampanha(data);
        }else{
            navigate("/parceiro");
        }
    }

    const handleClick = (abaId) => {
        setAbaAtiva(abaId);
    };

    const conteudos = [
        <CampanhaEditDetails id={campanha_id} />,
        <CampanhaEditImages id={campanha_id} />,
        <CampanhaEditInfos id={campanha_id} />,
        <CampanhaEditOptions id={campanha_id} />,
        <CampanhaEditDescription id={campanha_id} />,
        <CampanhaEditEbooks id={campanha_id} />,
        <CampanhaEditTicketWinner id={campanha_id} />,
        <CampanhaEditAward id={campanha_id} />,
        <CampanhaEditSeo id={campanha_id} />
    ];

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8} />
            {campanha?.sorteio?.status == "AGUARDANDO_ATIVACAO" ? (
                <>
                    <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                        <div>
                            <h2>Ative sua campanha</h2>
                            <SpaceBox space={10} />
                            <p>Clique no botão abaixo para ativar a sua campanha e começar a faturar com ela!</p>
                            <SpaceBox space={10} />
                            <Button onClick={() => {navigate(`/fatura-campanha/${campanha?.fatura?.id_remessa}`);}}><ion-icon name="checkmark"></ion-icon> Ativar campanha</Button>
                        </div>
                    </div>
                    <SpaceBox space={16} />
                </> 
            ) : (null)}
            <ul id="abas" className="teste">
                {['Detalhes', 'Imagens', 'Informações', 'Opções', 'Descrição', 'Ebooks', 'Cotas premiadas', 'Prêmios', 'SEO'].map((nome, index) => (
                    <li key={index}>
                        <div
                            className={abaAtiva === index + 1 ? 'selecionada' : ''}
                            onClick={() => handleClick(index + 1)}
                        >
                            <ion-icon name={['timer-outline', 'image-outline', 'pencil-outline', 'options-outline', 'chatbox-outline', 'book-outline', 'star-outline', 'trophy-outline', 'search-outline'][index]}></ion-icon>
                            <span>{nome}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <SpaceBox space={25} />
            <div id="conteudos">
                {conteudos.map((item, index) => (
                    <div
                        key={index}
                        id={`conteudo_${index + 1}`}
                        className={`conteudo ${abaAtiva === index + 1 ? 'visivel' : ''}`}>
                        {item}
                    </div>
                ))}
            </div>
            <SpaceBox space={80} />
        </FragmentView>
    );
};