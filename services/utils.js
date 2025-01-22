class Utils {
    static validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        return remainder === parseInt(cpf.substring(10, 11));
    }
    static formatToCelular (numero)  {
        // Remove todos os caracteres não numéricos
        let numeroLimpo = numero?.replace(/\D/g, '');
    
        // Verifica se tem o tamanho correto (11 dígitos: DDD + 9 dígitos do número)
        if (numeroLimpo.length === 11) {
            return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
        }
    
        // Retorna o número sem formatação se não tiver o tamanho esperado
        return numero;
    }
    static validatePhone(numero) {
        // Remove todos os caracteres não numéricos
        let numeroLimpo = numero.replace(/\D/g, '');
    
        // Expressão regular para validar número de celular no Brasil
        const regexCelular = /^(\d{2})9\d{8}$/;
    
        return regexCelular.test(numeroLimpo);
    }
    static validateCEP(cep) {
        if (typeof cep !== 'string') return false;
        cep = cep.replace(/[^\d]/g, '');
        return cep.length === 8 && /^[0-9]{5}-?[0-9]{3}$/.test(cep);
    }
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }
    static removeAllMaskCharacters(str) {
        return str.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(".", "").replaceAll(" ", "");
    }
    static makeid(length = 50) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static formatNumberToTicket(num, maxLength = 10000000) {
        const numStr = num.toString();  // Converte o número para string
        const maxStr = maxLength.toString();  // Converte o valor máximo para string
        const lengthDifference = maxStr.length - numStr.length;  // Calcula a diferença de comprimento

        if (lengthDifference > 0) {
            // Adiciona zeros à esquerda para igualar o comprimento
            return '0'.repeat(lengthDifference) + numStr;
        }
        return numStr;  // Caso o número já tenha o comprimento desejado ou seja maior
    }
    static sortearBilhetes(min, max, quantidade, numerosComprados) {
        const numerosSorteados = new Set();
        const conjuntoComprados = new Set(numerosComprados);

        // Calcula a quantidade máxima de números disponíveis
        const numerosDisponiveis = max - min + 1 - conjuntoComprados.size;

        // Verifica se a quantidade solicitada é maior do que a quantidade de números disponíveis
        const quantidadeFinal = Math.min(quantidade, numerosDisponiveis);

        // Laço para sortear os números
        while (numerosSorteados.size < quantidadeFinal) {
            // Sorteia um número aleatório dentro do intervalo [min, max]
            const numero = Math.floor(Math.random() * (max - min + 1)) + min;

            // Verifica se o número não foi comprado nem já sorteado
            if (!conjuntoComprados.has(numero) && !numerosSorteados.has(numero)) {
                // Adiciona o número ao Set de sorteados
                numerosSorteados.add(numero);
            }
        }

        let numeros = Array.from(numerosSorteados).map(numero => ({
            numero_texto: numero,
            numero_valor: numero
        }));

        if (numeros.length > 0) {
            return numeros;
        } else {
           return [];
        }
    }
    static prazoPagamentoEmMinutosMapper () {
        return {
            "5MIN": 5,
            "10MIN": 10,
            "15MIN": 15,
            "30MIN": 30,
            "1H": 60,
            "5H": 300,
            "10H": 600,
            "24H": 1440,
        };
    }
    static getDateNow() {
        const moment = require('moment-timezone');
        return moment().tz("America/Sao_Paulo").subtract(3, 'hours');
    }
    static getFutureDate (sumDays) {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() + sumDays));
      
        const year = futureDate.getFullYear();
        let month = futureDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = futureDate.getDate();
        day = day < 10 ? '0' + day : day;
      
        return `${year}-${month}-${day}`;
    }
}

module.exports = Utils;