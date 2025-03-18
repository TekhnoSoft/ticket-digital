import axios from "axios";
import Environment from "./Environment";

const API_BASE = Environment.API_BASE;

const Api = {
    geral: {
        getConexaoCount: async () => {
            return await axios.get(`${API_BASE}/conexao/count`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getEbooks: async ({}) => {
            return await axios.get(`${API_BASE}/ebookviewer/all`).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
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
        reservarBilheteSelecionado: async ({sorteio_id, numeros, user_id, idSorteioSocio}) => {
            return await axios.post(`${API_BASE}/sorteios/reservar-bilhete-selecionado`, {sorteio_id, numeros, user_id, idSorteioSocio}).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        reservarBilheteQuantidade: async ({sorteio_id, quantidade, user_id, idSorteioSocio}) => {
            return await axios.post(`${API_BASE}/sorteios/reservar-bilhete-quantidade`, {sorteio_id, quantidade, user_id, idSorteioSocio}).then(async (response) => {
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
        },
        getCampanhaImages: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/images/${campanha_id}`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        saveSorteioImages: async ({ formData }) => {
            try {
                const response = await axios.put(
                    `${API_BASE}/sorteios/campanha/save-images`,
                    formData,
                    { 
                        headers: {
                            ...Environment.HEADERS.headers,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                return response.data;
            } catch (err) {
                return err;
            }
        },
        removeSorteioImages: async ({ campanha_id, image_id }) => {
            try{
                return await axios.delete(`${API_BASE}/sorteios/campanha/${campanha_id}/delete-image/${image_id}`, Environment.HEADERS).then(async (response) => {
                    return await response;
                }).catch(err => {
                    return err;
                });
            }catch (err) {
                return err;
            }
        },
        getCampanhaSeo: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/seo/${campanha_id}`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        updateCampanhaSeo: async ({ campanha_id, title, description }) => {
            return await axios.put(`${API_BASE}/sorteios/campanha/update-seo`, {campanha_id, title, description}, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhaPremios: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/premios/${campanha_id}`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        deleteCampanhaPremio: async ({ campanha_id, premio_id }) => {
            return await axios.delete(`${API_BASE}/sorteios/campanha/${campanha_id}/premio-delete/${premio_id}`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        newCampanhaPremio: async ({ campanha_id, premio }) => {
            return await axios.post(`${API_BASE}/sorteios/campanha/premio-create`, {campanha_id, premio}, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCotasPremiadas: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/${campanha_id}/cotas-premiadas`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        saveCotaPremiada: async ({ campanha_id, numero, premio }) => {
            return await axios.post(`${API_BASE}/sorteios/campanha/save-cotas-premiadas`, {campanha_id, numero, premio}, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        saveCotaPremiadaAleatoria: async ({ campanha_id, premio  }) => {
            return await axios.post(`${API_BASE}/sorteios/campanha/save-cotas-premiadas-aleatoria`, {campanha_id, premio}, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        deleteCampanhaCotaPremiada: async ({ campanha_id, cota_id, numero }) => {
            return await axios.delete(`${API_BASE}/sorteios/campanha/${campanha_id}/cota-premiada-delete/${cota_id}/${numero}`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getEbooks: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/${campanha_id}/get-ebooks`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        saveEbook: async (formData) => {
            try {
                const response = await axios.post(
                    `${API_BASE}/sorteios/campanha/save-ebook`,
                    formData,
                    {
                        headers: {
                            ...Environment.HEADERS.headers,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                return response.data;
            } catch (err) {
                console.error("Erro ao salvar o eBook:", err);
                return { success: false, error: "Erro ao salvar o eBook" };
            }
        },
        deleteEbook: async ({ campanha_id, id_ebook }) => {
            return await axios.delete(`${API_BASE}/sorteios/campanha/${campanha_id}/ebook-delete/${id_ebook}`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        getCampanhaInfos: async ({ campanha_id }) => {
            return await axios.get(`${API_BASE}/sorteios/campanha/${campanha_id}/get-campanha-info`, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        },
        saveCampanhaInfos: async ({ infos }) => {
            return await axios.put(`${API_BASE}/sorteios/campanha/save-campanha-info`, {infos}, Environment.HEADERS).then(async (response) => {
                return await response;
            }).catch(err => {
                return err;
            });
        }
    }
}

export default Api;