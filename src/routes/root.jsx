import { 
  Outlet
} from "react-router-dom";
import Header from '../Layout/Header';
import Menu from '../Layout/Menu';
import Footer from '../Layout/Footer';


export default function Root() {
    return (
      <>
        <div className="wrapper">
          <Header/>
          <Menu/>
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <Outlet />
              </div>
            </div>  
          </div>
          <Footer/>
        </div>
      </>
    );
  }