import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FragmentView from '../../components/FragmentView';
import SpaceBox from '../../components/SpaceBox';
import { Button, CampanhaEditDetails, CampanhaEditImages, CampanhaEditAward, CampanhaEditEbooks, CampanhaEditInfos, CampanhaEditOptions, CampanhaEditSeo, CampanhaEditTicketWinner, Hr } from '../../components';
import './style.css';

export default () => {
    const { campanha_id } = useParams();
    const [abaAtiva, setAbaAtiva] = useState(1); // Definindo a aba ativa inicialmente como 1

    const handleClick = (abaId) => {
        setAbaAtiva(abaId);
    };

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8} />
            <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                <div>
                    <h2>Ative sua campanha</h2>
                    <SpaceBox space={10} />
                    <p>Clique no botão abaixo para ativar a sua campanha e começar a faturar com ela!</p>
                    <SpaceBox space={10} />
                    <Button><ion-icon name="checkmark"></ion-icon> Ativar campanha</Button>
                </div>
            </div>
            <SpaceBox space={16} />
            <ul id="abas" className="teste">
                {['Detalhes', 'Imagens', 'Informações', 'Opções', 'Ebooks', 'Cotas premiadas', 'Prêmios', 'SEO'].map((nome, index) => (
                    <li key={index}>
                        <div
                            className={abaAtiva === index + 1 ? 'selecionada' : ''}
                            onClick={() => handleClick(index + 1)}
                        >
                            <ion-icon name={['timer-outline', 'image-outline', 'pencil-outline', 'options-outline', 'book-outline', 'star-outline', 'trophy-outline', 'search-outline'][index]}></ion-icon>
                            <span>{nome}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <SpaceBox space={25} />
            <div id="conteudos">
                {[...Array([
                    <CampanhaEditDetails id={0}/>, 
                    <CampanhaEditImages id={0}/>, 
                    <CampanhaEditInfos id={0}/>, 
                    <CampanhaEditOptions id={0}/>, 
                    <CampanhaEditEbooks id={0}/>, 
                    <CampanhaEditTicketWinner id={0}/>, 
                    <CampanhaEditAward id={0}/>, 
                    <CampanhaEditSeo id={0}/>
                ])].map((item, index) => (
                    <div
                        key={index}
                        id={`conteudo_${index + 1}`}
                        className={`conteudo ${abaAtiva === index + 1 ? 'visivel' : ''}`}
                    >
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </FragmentView>
    );
};