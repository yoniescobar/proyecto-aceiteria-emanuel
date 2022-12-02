import Menu from './Layout/Menu';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Contenido from './Layout/Contenido'
import { BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './components/Login';
import { getToken } from "./utils/token";
import { useEffect } from "react";



function App() {

  const token = getToken();
  useEffect(() => {
  }, []);


  return (
    <div className="wrapper">
      {token ? (
        <>
          <Router>
            <Header />
            <Menu />
            <Contenido />
            <Footer />
          </Router>
        </>
      ) : (
        <>
          <Login />
        </>
      )}

    </div>
  );
}

export default App;
