import React, { useState } from 'react';
import './style.css';
import Card from '../Card';
import SpaceBox from '../SpaceBox';
import Hr from '../Hr';

export default ({ id }) => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages([...images, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <Card title={"Imagens"} icon={<ion-icon name="image-outline"></ion-icon>} style={{ maxWidth: '1000px' }}>
            <SpaceBox space={10}/>
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
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
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
                        <img src={src} alt={`img-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button onClick={() => removeImage(index)} style={{
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
            <SpaceBox space={25}/>
            <Hr elevation={1}/>
            <SpaceBox space={15}/>
            <div>
                <div>
                    <b style={{color: "black"}}>Imagens: </b>
                    <span style={{color: 'var(--text-opacity)'}}>1/15</span>
                </div>
                <div>
                    <b style={{color: "black"}}>Resolução recomendada: </b>
                    <span style={{color: 'var(--text-opacity)'}}>1280x960</span>
                </div>
                <div>
                    <b style={{color: "black"}}>Formatos aceitos: </b>
                    <span style={{color: 'var(--text-opacity)'}}>PNG, JPG ou JPEG</span>
                </div>
                <div>
                    <b style={{color: "black"}}>Tamanho máximo: </b>
                    <span style={{color: 'var(--text-opacity)'}}>5MB por imagem</span>
                </div>
            </div>
        </Card>
    );
}
