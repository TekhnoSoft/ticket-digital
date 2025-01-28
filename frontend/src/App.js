import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainContext } from "./helpers/MainContext";
import { Sorteio, Checkout, Market, Fatura, PageNotFound, Parceiro, Login, Register, ParceiroPedidos, ParceiroPagamentos, ParceiroVisual, ParceiroPerfil, Forgot, ParceiroAddCampanha, ParceiroEditCampanha, FaturaCampanha, PoliticaPrivacidade, TermosUso } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Api from './Api';
import Utils from './Utils';

function App() {

  const [user, setUser] = useState(null);

  const [authenticated, setAuthenticated] = useState(false);
  const [userParceiro, setUserParceiro] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null)
  }, [])

  useEffect(() => {
    load();
  }, [])

  const load = async () => {
    const { success: authSuccess } = await Utils.processRequest(Api.parceiro.auth, {}, true);
    if (authSuccess) {
      const { success: userSuccess, data: userData } = await Utils.processRequest(Api.parceiro.get, {}, true);
      setAuthenticated(true);
      setUserParceiro(userData?.data)
    } else {
      setAuthenticated(false);
      setUserParceiro(null);
    }
  }

  const logout = (callback) => {
    localStorage.removeItem("TICKETDIGITAL_ACCESS_TOKEN");
    localStorage.removeItem("fatura");
    localStorage.removeItem("user");
    localStorage.removeItem("checkout");
    localStorage.removeItem("pageIndex");
    if (callback) {
      callback();
      window.location.reload();
    }
  }

  return (
    <MainContext.Provider value={{ authenticated, user, setUser, userParceiro, setUserParceiro, logout }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Market />} />
          <Route path="/campanha/:keybind" element={<Sorteio />} />
          <Route path="/fatura/:id_remessa" element={<Fatura />} />
          <Route path="/fatura-campanha/:id_remessa" element={<FaturaCampanha />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          <Route path="*" element={<PageNotFound />} />
          {/*==================PRIVATE-ROUTES===================*/}
          <Route path="/parceiro" element={userParceiro ? <Parceiro /> : <Login />} />
          <Route path="/parceiro-pedidos" element={userParceiro ? <ParceiroPedidos /> : <Login />} />
          <Route path="/parceiro-pagamentos" element={userParceiro ? <ParceiroPagamentos /> : <Login />} />
          <Route path="/parceiro-visual" element={userParceiro ? <ParceiroVisual /> : <Login />} />
          <Route path="/parceiro-perfil" element={userParceiro ? <ParceiroPerfil /> : <Login />} />
          <Route path="/parceiro-add-campanha" element={userParceiro ? <ParceiroAddCampanha /> : <Login />} />
          <Route path="/parceiro-edit-campanha/:campanha_id" element={userParceiro ? <ParceiroEditCampanha /> : <Login />} />
        </Routes>
        <ToastContainer style={{ zIndex: 999999 }} />
      </Router>
    </MainContext.Provider>
  );
}

export default App;
