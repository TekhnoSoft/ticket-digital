import React, { useEffect, useState } from 'react';
import './style.css';
import TextEditor from '../TextEditor';
import Card from '../Card';
import Button from '../Button';
import SpaceBox from '../SpaceBox';
import Api from '../../Api';
import Utils from '../../Utils';

export default ({ id }) => {

    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [content, setContent] = useState(null);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        const { success, data } = await Utils.processRequest(Api.parceiro.getCampanhaDescriptionn, { campanha_id: id });
        if (success) {
            setContent(data);
        }
    }

    const handleChange = (newContent) => { };

    const sanitizeHTML = (input) => {
        return input
            .replace(/<script.*?>.*?<\/script>/gi, "")            // Remove <script> e seu conteúdo
            .replace(/<style.*?>.*?<\/style>/gi, "")              // Remove <style> e seu conteúdo
            .replace(/on\w+=".*?"/gi, "")                          // Remove eventos in-line (ex: onclick, onload)
            .replace(/javascript:/gi, "")                          // Remove URLs com javascript:
            .replace(/<iframe.*?>.*?<\/iframe>/gi, "")            // Remove <iframe> e seu conteúdo
            .replace(/<object.*?>.*?<\/object>/gi, "")            // Remove <object> e seu conteúdo
            .replace(/<embed.*?>.*?<\/embed>/gi, "")              // Remove <embed> e seu conteúdo
            .replace(/<link.*?>/gi, "")                            // Remove <link> tags
            .replace(/<meta.*?>/gi, "")                            // Remove <meta> tags
            .replace(/<button.*?>.*?<\/button>/gi, "")            // Remove <button> e seu conteúdo
            .replace(/<a.*?>.*?<\/a>/gi, "")                      // Remove <a> e seu conteúdo
            .replace(/<[^>]+(javascript:|data:|vbscript:)[^>]*>/gi, ""); // Remove qualquer tag com atributos perigosos
    };

    const handleSave = async () => {
        setShowButtonLoader(true);
        let _data = window.document.getElementsByTagName('textarea')[1].value;
        let _content = sanitizeHTML(_data);

        const { success, data } = await Utils.processRequest(Api.parceiro.editCampanhaDescriptionn, { campanha_id: id, content: _content }, true);
        if (success) {
            Utils.notify("success", "Descrição atualizada.")
            load();
        }
        setShowButtonLoader(false);
    }

    return (
        <>
            <Card title={"Descrição"} icon={<ion-icon name="chatbox-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <TextEditor onChange={handleChange} placeholder={"Digite sua descrição/regulamento aqui..."} readOnly={false} value={content} />
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
