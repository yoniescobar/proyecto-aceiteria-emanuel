import Menu from './Layout/Menu';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Contenido from './Layout/Contenido'
import {BrowserRouter as Router, Routes} from 'react-router-dom'




function App() {
  return (
    <div className="wrapper">
        
       <Router>
          <Header/>
          <Menu/>
          <Contenido/>
          <Footer/>
  
       </Router>
            
       
        
    </div>
  );
}

export default App;
