import React, { useEffect, useState } from 'react';
import './style.css';
import Card from '../Card';
import SpaceBox from '../SpaceBox';
import Hr from '../Hr';
import Api from '../../Api';
import Utils from '../../Utils';
import Button from '../Button';

export default ({ id }) => {

    const MAX_UPLOAD_IMAGES = 5;

    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState([]);
    const [showButtonLoader, setShowButtonLoader] = useState(false);

    useEffect(() => {
        load();
    }, [])

    const load = async () => {
        setLoaded(false);
        const { success, data } = await Utils.processRequest(Api.parceiro.getCampanhaImages, { campanha_id: id });
        if (success) {
            const newImages = data.map(item => {
                const imageBlob = new Blob([new Uint8Array(item?.payload?.data)], { type: 'image/jpeg' });
                return {
                    ref: Utils.makeid(50),
                    id: item?.id,
                    image: URL.createObjectURL(imageBlob),
                    mode: 'LOADED',
                };
            });
            setImages(newImages);
        }
        setLoaded(true);
    }

    const handleImageUpload = (event) => {
        if (images.length >= MAX_UPLOAD_IMAGES) {
            Utils.notify("error", `Máximo de ${MAX_UPLOAD_IMAGES} imagens atingido.`)
            return;
        }

        const files = Array.from(event.target.files);

        const newImages = files.map(file => {
            return {
                ref: Utils.makeid(50),
                id: images?.length + 1,
                image: URL.createObjectURL(file),
                mode: 'CREATED',
                file: file
            }
        });
        setImages([...images, ...newImages]);
    };

    const removeImage = async (_id) => {
        const filteredImages = images.filter((it) => it?.id !== _id);
        const imageToRemove = images.filter(img => { return img?.id == _id })[0];
        setImages(filteredImages);
        if (imageToRemove?.mode !== 'CREATED') {
            const { success, data } = await Utils.processRequest(Api.parceiro.removeSorteioImages, { campanha_id: id, image_id: imageToRemove?.id }, true);
            if (success) {
                setImages([]);
                Utils.notify("success", "Imagem removida com sucesso.");
                load();
            }
        }
    };

    const handleSave = async () => {
        setShowButtonLoader(true);

        let countToCreated = images?.filter(img => { return img?.mode == 'CREATED' })?.length;

        if (countToCreated <= 0) {
            Utils.notify("warning", "Nenhuma imagem selecionada.");
            setShowButtonLoader(false);
            return;
        }

        const formData = new FormData();
        formData.append('campanha_id', id);
        images.forEach(image => {
            if (image.file) {
                formData.append('images[]', image.file);
            }
        });

        const { success, data } = await Api.parceiro.saveSorteioImages({ formData });

        setShowButtonLoader(false);

        if (success) {
            Utils.notify('success', 'Imagens salvas com sucesso.');
            load();
        } else {
            Utils.notify('error', 'Ocorreu um erro ao salvar as imagens.');
        }
    }

    return (
        <>
            <Card title={"Imagens"} icon={<ion-icon name="image-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
                <SpaceBox space={10} />

                {loaded ? (

                    images?.length > 0 ? (

                        <>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                gap: '10px'
                            }}>
                                <label style={{
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#666',
                                    margin: '0 auto'
                                }}>
                                    +
                                    <input type="file" capture accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </label>
                                {images.map((src, index) => (
                                    <div key={index} style={{
                                        position: 'relative',
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        margin: '0 auto'
                                    }}>
                                        <img src={src?.image} alt={`image-${src?.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button onClick={() => removeImage(src?.id)} style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            background: 'rgba(255, 0, 0, 0.7)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            textAlign: 'center'
                                        }}>x</button>
                                    </div>
                                ))}
                            </div>
                        </>

                    ) : (
                        <>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                gap: '10px'
                            }}>
                                <label style={{
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#666',
                                    margin: '0 auto'
                                }}>
                                    +
                                    <input type="file" capture accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </label>
                            </div>
                        </>
                    )

                ) : (
                    <>
                        <SpaceBox space={40} />
                        <center><b>Carregando...</b></center>
                        <SpaceBox space={40} />
                    </>
                )}

                <SpaceBox space={25} />
                <Hr elevation={1} />
                <SpaceBox space={15} />
                <div>
                    <div>
                        <b style={{ color: "black" }}>Imagens: </b>
                        <span style={{ color: 'var(--text-opacity)' }}>{images?.length}/{MAX_UPLOAD_IMAGES}</span>
                    </div>
                    <div>
                        <b style={{ color: "black" }}>Resolução recomendada: </b>
                        <span style={{ color: 'var(--text-opacity)' }}>1280x960</span>
                    </div>
                    <div>
                        <b style={{ color: "black" }}>Formatos aceitos: </b>
                        <span style={{ color: 'var(--text-opacity)' }}>PNG, JPG ou JPEG</span>
                    </div>
                    <div>
                        <b style={{ color: "black" }}>Tamanho máximo: </b>
                        <span style={{ color: 'var(--text-opacity)' }}>5MB por imagem</span>
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
    );
}
