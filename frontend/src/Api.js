import axios from "axios";
import Environment from "./Environment";

const API_BASE = Environment.API_BASE;

const Api = {
    geral: {
        getCampanha: async ({keybind}) => {
            return await axios.get(`${API_BASE}/sorteios/get-by-keybind/${keybind}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getUserByPhone: async ({phone}) => {
            return await axios.get(`${API_BASE}/users/get-by-phone/${phone}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        preRegisterUser: async ({name, phone, email, cpf}) => {
            return await axios.post(`${API_BASE}/users/pre-register`, {name, phone, email, cpf}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        reservarBilheteSelecionado: async ({sorteio_id, numeros, user_id}) => {
            return await axios.post(`${API_BASE}/sorteios/reservar-bilhete-selecionado`, {sorteio_id, numeros, user_id}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        reservarBilheteQuantidade: async ({sorteio_id, quantidade, user_id}) => {
            return await axios.post(`${API_BASE}/sorteios/reservar-bilhete-quantidade`, {sorteio_id, quantidade, user_id}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
    }
}

export default Api;