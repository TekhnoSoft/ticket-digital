import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainContext } from "./helpers/MainContext";
import { Sorteio, Checkout, Market, Fatura, PageNotFound, Parceiro, Login, Register, ParceiroPedidos, ParceiroAfiliados, ParceiroVisual, ParceiroPerfil, Forgot } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null)
  }, [])

  return (
    <MainContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Market />} />
          <Route path="/campanha/:keybind" element={<Sorteio />} />
          <Route path="/fatura/:id_remessa" element={<Fatura />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="*" element={<PageNotFound />} />
          {/*==================PRIVATE-ROUTES===================*/}
          <Route path="/parceiro" element={<Parceiro />} />
          <Route path="/parceiro-pedidos" element={<ParceiroPedidos />} />
          <Route path="/parceiro-afiliados" element={<ParceiroAfiliados />} />
          <Route path="/parceiro-visual" element={<ParceiroVisual />} />
          <Route path="/parceiro-perfil" element={<ParceiroPerfil />} />
        </Routes>
        <ToastContainer style={{ zIndex: 999999 }} />
      </Router>
    </MainContext.Provider>
  );
}

export default App;
