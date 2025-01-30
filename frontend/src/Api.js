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
        getSorteio: async ({id_sorteio}) => {
            return await axios.get(`${API_BASE}/sorteios/get-by-id/${id_sorteio}`).then(async (response) => {
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
        checkFaturaIsPayed: async ({id_remessa}) => {
            return await axios.get(`${API_BASE}/sorteios/get-fatura-by-remessa/${id_remessa}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getBilhetesPagos: async ({sorteio_id}) => {
            return await axios.get(`${API_BASE}/sorteios/bilhetes-pagos/${sorteio_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getBilhetesReservados: async ({sorteio_id}) => {
            return await axios.get(`${API_BASE}/sorteios/bilhetes-reservados/${sorteio_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        searchUserTickes: async ({user_id}) => {
            return await axios.get(`${API_BASE}/users/faturas/${user_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getFatura: async ({id_remessa}) => {
            return await axios.get(`${API_BASE}/users/fatura/${id_remessa}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getRankBuyers: async ({sorteio_id}) => {
            return await axios.get(`${API_BASE}/sorteios/rank-buyers/${sorteio_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getRankWinners: async ({sorteio_id}) => {
            return await axios.get(`${API_BASE}/sorteios/rank-winners/${sorteio_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhas: async ({}) => {
            return await axios.get(`${API_BASE}/sorteios/campanhas`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getTaxas: async ({user_id}) => {
            return await axios.get(`${API_BASE}/users/${user_id}/taxas`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getBilhetesPremiados: async ({sorteio_id}) => {
            return await axios.get(`${API_BASE}/sorteios/bilhetes-premiados/${sorteio_id}`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getSorteioRegras: async ({}) => {
            return await axios.get(`${API_BASE}/sorteios/regras`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getSorteioCategorias: async ({}) => {
            return await axios.get(`${API_BASE}/sorteios/categorias`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getSorteioPublicacaoTaxas: async ({}) => {
            return await axios.get(`${API_BASE}/sorteios/taxas`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        }
    },
    parceiro: {
        auth: async () => {
            return await axios.get(`${API_BASE}/users/auth`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        get: async () => {
            return await axios.get(`${API_BASE}/users/get`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        login: async ({ email, password }) => {
            return await axios.post(`${API_BASE}/users/login`, {email, password}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        register: async ({ name, email, password, code }) => {
            return await axios.post(`${API_BASE}/users/register`, {name, email, password, code}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        resetPasswordSendCode: async ({ email }) => {
            return await axios.post(`${API_BASE}/users/reset-password-send-code`, {email}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        resetPasswordValidCode: async ({ email, code }) => {
            return await axios.post(`${API_BASE}/users/reset-password-valid-code`, {email, code}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        resetPasswordChange: async ({ email, code, password }) => {
            return await axios.post(`${API_BASE}/users/reset-password-change`, {email, code, password}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhas: async ({}) => {
            return await axios.get(`${API_BASE}/users/parceiro/campanhas`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getPedidos: async ({}) => {
            return await axios.get(`${API_BASE}/users/parceiro/pedidos`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        createCampanha: async ({campanha}) => {
            return await axios.post(`${API_BASE}/users/parceiro/create-campanha`, {campanha}, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        editCampanhaDescription: async ({ campanha_id, content }) => {
            return await axios.post(`${API_BASE}/sorteios/campanha/update-description`, { campanha_id, content }, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhaDescription: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/${campanha_id}/get-description`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhaDetails: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/${campanha_id}/get-details`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhaStatus: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/${campanha_id}/get-status`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getPagamentoOperadoras: async ({}) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/payment-providers`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        updatePagamentoOperadora: async ({ operadora, operadoraAccessToken, operadoraPublicKey, operadoraClientKey, operadoraSecretKey }) => {
            return await axios.put(`${API_BASE}/users/parceiro/update-payment-provider`, { operadora, operadoraAccessToken, operadoraPublicKey, operadoraClientKey, operadoraSecretKey }, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getPagamentoOperadora: async ({}) => {
            return await axios.get(`${API_BASE}/users/parceiro/get-payment-provider`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        }
    }
}

export default Api;