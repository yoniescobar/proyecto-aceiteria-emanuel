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
    this.clickMe = this.clickMe.bind(this);
  }
  clickMe () {
    getPermisosUsuario(getIdusuario()).then(
      data => {
          if(data.id < 0)
            this.mesajeResultado('No tiene perfil asignado en el sistema.', 'warning'); 
          if (data.id > 0) {
            this.setState({
              permisos:data.data
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
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-desktop" />
                    <p>
                      Almacen
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/tblCategoria" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Categoría</p>
                      </Link>
                    </li>
                  </ul>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/tblPresentacion" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Presentacion</p>
                      </Link>
                    </li>
                  </ul>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/tblArticulo" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Artículos</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-truck" />
                    <p>
                      Compras
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/tblProveedor" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Proveedores</p>
                      </Link>
                    </li>
                  </ul>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/compras" className="nav-link">
                          <i className="far fa-circle nav-icon" />
                          <p>Ingreso</p>
                        </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-cart-plus" />
                    <p>
                      Ventas
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/tblCliente" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Clientes</p>
                      </Link>

                    </li>
                  </ul>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/ventas" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Nueva Venta</p>
                      </Link>
                    </li>
                  </ul>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/creditos" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Creditos</p>
                      </Link>
                    </li>
                  </ul>

                </li>
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-user" />
                    <p>
                      Acceso
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/tblUsuario" href="!#" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Usuario</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-chart-line" />
                    <p>
                      Consulta Ventas
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/reporteVenta" href="!#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                        <p className='px-2'>Reporte de Ventas</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/VentasRealizadas" href="!#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                        <p className='px-2'>Ventas realizadas</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/inventario" href="!#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                        <p className='px-2'>Inventario</p>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/reporteCredito" href="!#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                        <p className='px-2'>Creditos</p>
                      </Link>
                    </li>

                  </ul>
                </li>
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
