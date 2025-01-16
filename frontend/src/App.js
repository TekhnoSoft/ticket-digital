import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainContext } from "./helpers/MainContext";
import { Sorteio, Checkout, Market, PageNotFound } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null)
  } , [])

  return (
    <MainContext.Provider value={{user, setUser}}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Market />} />
          <Route path="/campanha/:keybind" element={<Sorteio />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer style={{zIndex: 999999}} />
      </Router>
    </MainContext.Provider>
  );
}

export default App;
