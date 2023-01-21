import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getIdusuario } from "./../utils/token";
import { getPermisosUsuario } from "../Servicios/oauth"
// import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

export default class Menu extends Component {
  mesajeResultado(mensaje, clase){
    Swal.fire(
        mensaje,
        '',
        clase
    )
  };
  
  constructor(props) {
    super(props);
    this.state = {
      permisos: []          
   }

  }
  componentDidMount(){
    //this.clickMe = this.clickMe.bind(this);
    this.clickMe();  
  }
  clickMe () {
    getPermisosUsuario(getIdusuario()).then(
      data => {
          if(data.id < 0)
            this.mesajeResultado('No tiene perfil asignado en el sistema.', 'warning'); 
          if (data.id > 0) {
            /*data.data.map((item) => (
              item.permiso.menu.map((iten) => console.log(iten.menu))
            ));*/
            let menu=[];
            data.data.map((item) => (
              item.permiso.menu.map((iten) => menu.push(iten.menu))
            ));
            menu.sort((a, b) => a.orden - b.orden);
            menu.map((item) => (
              item.menuhijos.sort((a, b) => a.segundoOrden - b.segundoOrden)
            ));
            console.log(menu);
            this.setState({
              permisos:menu
            })
          } 
      }
    )
  }

  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link to="/tablero" href="index.html" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">Emanuel</span>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            {
        /* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to="/tablero" className="nav-link">
                      <i className="nav-icon fas  fas fa-server" />
                      <p>Escritorio</p>
                    </Link>
                  </li>
                {
                  this.state.permisos.map((item) => (
                    <li key={item.id} className="nav-item has-treeview">
                      <a href="#" className="nav-link">
                        <i className={item.classname} />
                        <p>
                           {item.nombre}
                          <i className="fas fa-angle-left right" />
                        </p>
                      </a>   
                      {
                        item.menuhijos.map((iten) => (
                          <ul key={iten.id} className="nav nav-treeview">
                            <li className="nav-item">
                              <Link to={iten.path} className="nav-link">
                                <i className={iten.classname} />
                                <p>{iten.nombre}</p>
                              </Link>
                            </li>
                          </ul>                          
                        ))
                      }                           
                    </li>
                  ))
                }
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    )
  }
}
