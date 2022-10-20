import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddCategoria from '../components/Categoria/AddCategoria'
import EditCategoria from '../components/Categoria/EditCategoria'
import ReactPdfPrint from '../components/Categoria/ReactPdfPrint'

import TblCategoria from '../components/Categoria/TblCategoria'
import TblArticulo from '../components/Articulo/TblArticulo'


import Menu from './Menu'
import Tablero from './Tablero'
import AddArticulo from '../components/Articulo/AddArticulo'
import TblUsuario from '../components/Usuario/TblUsuario'
import AddUsuario from '../components/Usuario/AddUsuario'
import EditUsuario from '../components/Usuario/EditUsuario'
import ReactPdfPrintUsuario from '../components/Usuario/ReactPdfPrintUsuario'




export default class Contenido extends Component {
    render() {
        return (
            <>
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-md-12">
            <h5 className="m-0 text-dark">Contenido Principal</h5>

            <div className="col-sm-12">
            <ol className="breadcrumb float-sm-right ">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>{/* /.col */}
            
            <div className='my-5'></div>
            <div className='container-fluid'>
          
               <Routes>
               <Route exact path='/' element={<Tablero/>}/>
               <Route exact path='/tablero' element={<Tablero/>}></Route>


               <Route exact path='/tblCategoria' element={<TblCategoria/>}></Route>
               <Route exact path='/addCategoria' element={<AddCategoria/>}></Route>
               <Route exact path='/editCategoria/:id' element={<EditCategoria/>}></Route>


               <Route exact path='/tblArticulo' element={<TblArticulo/>}></Route>
               <Route exact path='/addArticulo' element={<AddArticulo/>}></Route>
               

               <Route exact path='/tblUsuario' element={<TblUsuario/>}></Route>
               <Route exact path='/addUsuario' element={<AddUsuario/>}></Route>
               <Route exact path='/editUsuario/:id' element={<EditUsuario/>}></Route>

              
               
               <Route exact path='/reporteCategoria' element={<ReactPdfPrint/>}></Route>
               <Route exact path='/reporteUsuario' element={<ReactPdfPrintUsuario/>}></Route>


               
               


            </Routes>


               
              

            </div>
            
          </div>{/* /.col */}
          
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
 
    

  </div>
</>

        )
    }
}
