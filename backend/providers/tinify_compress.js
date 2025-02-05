const tinify = require("tinify");

const apiKeys = [
    "dBKnDGRpfTH43ZRyKrLjFpTl6zdjvs5z",
    "qcKFxhxPcKsknB8mPhS19nyvYwX66hRZ",
    "CHgLgMr0lT11B6l6QvcrLhf5Xc3JNMb6",
    "3xx3qBXgsYwBFvD1p6QLR9s7y9Fms2Nz"
];

let currentApiKeyIndex = 0;

function setApiKey() {
    tinify.key = apiKeys[currentApiKeyIndex];
}

function switchApiKey() {
    currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
    setApiKey(); 
}

async function compressImageFromBuffer(buffer) {
    try {
        setApiKey(); 
        const compressedBuffer = await tinify.fromBuffer(buffer).toBuffer();
        console.log("Imagem comprimida com sucesso!");
        return compressedBuffer;
    } catch (error) {
        console.error("Erro ao comprimir a imagem:", error.message);

        switchApiKey(); 
        try {
            const compressedBuffer = await tinify.fromBuffer(buffer).toBuffer();
            console.log("Imagem comprimida com sucesso usando uma nova chave!");
            return compressedBuffer;
        } catch (error) {
            console.error("Erro ao comprimir a imagem novamente:", error.message);
            throw error;
        }
    }
}

module.exports = { compressImageFromBuffer }