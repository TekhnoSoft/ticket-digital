import { toast } from 'react-toastify';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

const Utils = {
    formatNumberToTicket: (num, maxLength = 1000000) => {
        const numStr = num.toString();  // Converte o número para string
        const maxStr = maxLength.toString();  // Converte o valor máximo para string
        const lengthDifference = maxStr.length - numStr.length;  // Calcula a diferença de comprimento

        if (lengthDifference > 0) {
            // Adiciona zeros à esquerda para igualar o comprimento
            return '0'.repeat(lengthDifference) + numStr;
        }
        return numStr;  // Caso o número já tenha o comprimento desejado ou seja maior
    },
    mobileCheck: () => {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    processRequest: async (apiCall, params = {}, showToast = false) => {
        try {
            const response = await apiCall(params);
            if (response && response.status >= 200 && response.status < 300) {
                return { success: true, data: response.data }; // Sucesso com os dados
            }
            console.error('Erro na resposta da API:', response);
            if (showToast) {
                Utils.notify("error", response?.response?.data?.message);
            }
            return { success: false, data: null }; // Falha na resposta
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
            return { success: false, data: null }; // Falha geral
        }
    },
    convertNumberToBRL: (number) => {
        let n = Number(number);

        return n.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    },
    formatBase64Image: (bufferObject, mimeType = 'image/png') => {
        if (!bufferObject || !bufferObject.data) return '';

        // Cria um Uint8Array a partir dos dados do buffer
        const uint8Array = new Uint8Array(bufferObject.data);

        // Converte o Uint8Array para uma string base64
        let binaryString = '';
        for (let i = 0; i < uint8Array.length; i++) {
            binaryString += String.fromCharCode(uint8Array[i]);
        }

        // Converte a string binária para base64
        const base64String = btoa(binaryString);

        // Prefixo para o tipo MIME
        const prefix = `data:${mimeType};base64,`;

        // Retorna a string base64 completa com o prefixo
        return `${prefix}${base64String}`;
    },
    notify: (type, message) => {
        switch (type) {
            case "success":
                toast.success(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                break;
            case "error":
                toast.error(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                break;
            case "warning":
                toast.warning(message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                break;
        }
    },
    replaceMaskPhone: (phone) => {
        return phone?.replaceAll("(", "").replaceAll(")", "").replaceAll(".", "").replaceAll("-", "").replace(" ", "");
    },
    replaceMaskCPF: (phone) => {
        return phone?.replaceAll(".", "").replaceAll("-", "").replaceAll(" ", "");
    },
    validarCelular: (numero) => {
        // Remove todos os caracteres não numéricos
        let numeroLimpo = numero.replace(/\D/g, '');

        // Expressão regular para validar número de celular no Brasil
        const regexCelular = /^(\d{2})9\d{8}$/;

        return regexCelular.test(numeroLimpo);
    },
    validarEmail: (email) => {
        // Expressão regular para validar e-mails
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return regexEmail.test(email);
    },
    formatToCelular: (numero) => {
        if(!numero || numero == null || numero == undefined){
            return "(não informado)"
        }
        // Remove todos os caracteres não numéricos
        let numeroLimpo = numero?.replace(/\D/g, '');

        // Verifica se tem o tamanho correto (11 dígitos: DDD + 9 dígitos do número)
        if (numeroLimpo?.length === 11) {
            return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;
        }

        // Retorna o número sem formatação se não tiver o tamanho esperado
        return numero;
    },
    validateCpf: (cpf) => {
        if (!cpf) return false;
        cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais, o que não é válido para um CPF
        if (/^(\d)\1+$/.test(cpf)) return false;

        // Algoritmo de validação do CPF
        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    },
    formatCpf: (cpf) => {
        if(!cpf || cpf == null || cpf == undefined){
            return "(não informado)"
        }
        // Remove todos os caracteres não numéricos
        let cpfLimpo = cpf?.replace(/\D/g, '');

        // Verifica se tem 11 dígitos (formato válido de CPF)
        if (cpfLimpo.length === 11) {
            return cpfLimpo?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }

        // Retorna sem formatação se o CPF for inválido
        return cpf;
    },
    formatDateTime: (dateString) => {
        const date = new Date(dateString);

        const pad = (num) => num.toString().padStart(2, '0');

        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1); // Mês é baseado em zero
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
    formatDateNoTime: (dateString) => {
        const date = new Date(dateString);

        const pad = (num) => num.toString().padStart(2, '0');

        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1); // Mês é baseado em zero
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${day}/${month}/${year}`;
    },
    formatDateSimple: (dateString) => {
        const timeZone = 'America/Sao_Paulo'; // Ajuste para o seu fuso horário local

        // Converte a data para o fuso horário correto
        const zonedDate = toZonedTime(dateString, timeZone);

        // Calcula a diferença, retornando a tradução para português
        const diff = formatDistanceToNow(zonedDate, { addSuffix: true, locale: ptBR });

        return diff;
    },
    stringIsNullOrEmpty: (str) => {
        return !str || str?.trim() === "" || str == null || str == undefined;
    },
    getModo: (modo) => {
        switch (modo) {
            case "BILHETE":
                return {
                    singular: "bilhete",
                    plural: "bilhetes",
                    title: "Bilhetes",
                    pertence: "Meus"
                }
            case "EBOOK":
                return {
                    singular: "e-book",
                    plural: "e-books",
                    title: "E-books/Números",
                    pertence: "Meus"
                }
            case "COTA":
                return {
                    singular: "cota",
                    plural: "Cotas",
                    title: "E-books/Cotas",
                    pertence: "Minhas"
                }
            default:
                return {
                    singular: "...",
                    plural: "...",
                    title: "...",
                    pertence: "",
                }
        }
    },
    formatDataISO: (dataISO) => {
        const [data, hora] = dataISO.split('T');
        const [ano, mes, dia] = data.split('-');
        const [horas, minutos] = hora.split(':');

        return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    },
    convertBRLToNumber(brlString) {
        if (!brlString) return 0;

        const str = String(brlString);

        return parseFloat(
            str
                .replace(/\s/g, '')  // Remove espaços
                .replace('R$', '')   // Remove o símbolo "R$"
                .replace(/\./g, '')  // Remove os pontos dos milhares
                .replace(',', '.')   // Substitui a vírgula decimal por ponto
        ) || 0;
    },
    makeid: (length = 50) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    getConffetis: () => {
        const confettiItems = [
            { speed: 10, bg: 'yellow', shape: 'square' },
            { speed: 18, bg: 'white', shape: 'pentagram' },
            { speed: 29, bg: 'green', shape: 'rectangle' },
            { speed: 17, bg: 'blue', shape: 'hexagram' },
            { speed: 33, bg: 'red', shape: 'pentagram' },
            { speed: 26, bg: 'yellow', shape: 'dodecagram' },
            { speed: 24, bg: 'pink', shape: 'wavy-line' },
            { speed: 5, bg: 'blue', shape: 'wavy-line' },
            { speed: 40, bg: 'white', shape: 'square' },
            { speed: 17, bg: 'green', shape: 'rectangle' },
            { speed: 25, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 15, bg: 'yellow', shape: 'wavy-line' },
            { speed: 32, bg: 'yellow', shape: 'pentagram' },
            { speed: 25, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 37, bg: 'yellow', shape: 'dodecagram' },
            { speed: 23, bg: 'pink', shape: 'wavy-line' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 37, bg: 'pink', shape: 'wavy-line' },
            { speed: 36, bg: 'white', shape: 'hexagram' },
            { speed: 32, bg: 'green', shape: 'wavy-line' },
            { speed: 32, bg: 'yellow', shape: 'pentagram' },
            { speed: 29, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 23, bg: 'pink', shape: 'wavy-line' },
            { speed: 30, bg: 'pink', shape: 'rectangle' },
            { speed: 30, bg: 'red', shape: 'square' },
            { speed: 18, bg: 'red', shape: 'pentagram' },
            { speed: 19, bg: 'green', shape: 'rectangle' },
            { speed: 16, bg: 'blue', shape: 'hexagram' },
            { speed: 23, bg: 'red', shape: 'pentagram' },
            { speed: 34, bg: 'yellow', shape: 'dodecagram' },
            { speed: 39, bg: 'pink', shape: 'wavy-line' },
            { speed: 40, bg: 'purple', shape: 'square' },
            { speed: 21, bg: 'green', shape: 'rectangle' },
            { speed: 14, bg: 'white', shape: 'square' },
            { speed: 38, bg: 'green', shape: 'rectangle' },
            { speed: 19, bg: 'red', shape: 'dodecagram' },
            { speed: 29, bg: 'pink', shape: 'wavy-line' },
            { speed: 21, bg: 'white', shape: 'hexagram' },
            { speed: 17, bg: 'purple', shape: 'wavy-line' },
            { speed: 32, bg: 'yellow', shape: 'pentagram' },
            { speed: 23, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 48, bg: 'pink', shape: 'wavy-line' },
            { speed: 38, bg: 'pink', shape: 'rectangle' },
            { speed: 13, bg: 'red', shape: 'pentagram' },
            { speed: 49, bg: 'yellow', shape: 'dodecagram' },
            { speed: 19, bg: 'cyan', shape: 'wavy-line' },
            { speed: 15, bg: 'steelblue', shape: 'square' },
            { speed: 10, bg: 'yellow', shape: 'square' },
            { speed: 18, bg: 'white', shape: 'pentagram' },
            { speed: 29, bg: 'green', shape: 'rectangle' },
            { speed: 17, bg: 'blue', shape: 'hexagram' },
            { speed: 33, bg: 'red', shape: 'pentagram' },
            { speed: 26, bg: 'yellow', shape: 'dodecagram' },
            { speed: 24, bg: 'pink', shape: 'wavy-line' },
            { speed: 5, bg: 'white', shape: 'wavy-line' },
            { speed: 40, bg: 'purple', shape: 'square' },
            { speed: 17, bg: 'green', shape: 'rectangle' },
            { speed: 25, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 15, bg: 'cyan', shape: 'wavy-line' },
            { speed: 32, bg: 'yellow', shape: 'pentagram' },
            { speed: 45, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 23, bg: 'pink', shape: 'wavy-line' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 37, bg: 'pink', shape: 'wavy-line' },
            { speed: 26, bg: 'white', shape: 'hexagram' },
            { speed: 32, bg: 'cyan', shape: 'wavy-line' },
            { speed: 32, bg: 'yellow', shape: 'pentagram' },
            { speed: 45, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 23, bg: 'pink', shape: 'wavy-line' },
            { speed: 50, bg: 'pink', shape: 'rectangle' },
            { speed: 30, bg: 'red', shape: 'square' },
            { speed: 18, bg: 'red', shape: 'pentagram' },
            { speed: 19, bg: 'green', shape: 'rectangle' },
            { speed: 16, bg: 'blue', shape: 'hexagram' },
            { speed: 23, bg: 'red', shape: 'pentagram' },
            { speed: 33, bg: 'yellow', shape: 'dodecagram' },
            { speed: 39, bg: 'white', shape: 'wavy-line' },
            { speed: 40, bg: 'orange', shape: 'square' },
            { speed: 21, bg: 'green', shape: 'rectangle' },
            { speed: 14, bg: 'white', shape: 'square' },
            { speed: 38, bg: 'green', shape: 'rectangle' },
            { speed: 19, bg: 'red', shape: 'dodecagram' },
            { speed: 29, bg: 'pink', shape: 'wavy-line' },
            { speed: 34, bg: 'white', shape: 'hexagram' },
            { speed: 17, bg: 'indigo', shape: 'wavy-line' },
            { speed: 32, bg: 'yellow', shape: 'pentagram' },
            { speed: 23, bg: 'white', shape: 'square' },
            { speed: 18, bg: 'green', shape: 'rectangle' },
            { speed: 37, bg: 'red', shape: 'dodecagram' },
            { speed: 48, bg: 'pink', shape: 'wavy-line' },
            { speed: 38, bg: 'pink', shape: 'rectangle' },
            { speed: 13, bg: 'red', shape: 'pentagram' },
            { speed: 49, bg: 'yellow', shape: 'dodecagram' },
            { speed: 19, bg: 'purple', shape: 'wavy-line' },
            { speed: 15, bg: 'cyan', shape: 'square' },
        ];
        return confettiItems;
    },
    sortearMaisProximo: (arr, numero) => {
        if (arr.includes(numero)) {
            return numero;
        }
      
        let maisProximo = arr[0];
        let menorDiferenca = Math.abs(numero - arr[0]);
      
        for (let i = 1; i < arr.length; i++) {
            const diferencaAtual = Math.abs(numero - arr[i]);
            if (diferencaAtual < menorDiferenca) {
                menorDiferenca = diferencaAtual;
                maisProximo = arr[i];
            }
        }
      
        return maisProximo;
    }
}

export default Utils;