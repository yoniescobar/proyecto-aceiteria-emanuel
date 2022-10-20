import 'styled-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'


//const baseUrl = process.env.REACT_APP_BASE_URL



const TblArticulo = () => {
  const [search, setSearch] = useState('')
  const [Articulo, setArticulo] = useState([])
  const [filteredArticulo, setFilteredArticulo] = useState([])

  useEffect(() => {
    cargarArticulo();
  }, []);

  const cargarArticulo = async () => {

    const response = await axios.get("http://blooming-inlet-46702.herokuapp.com/api/Persona/all")
    setArticulo(response.data.data)
    setFilteredArticulo(response.data.data)

  }


  // const deleteArticulo = async (id) => {
  //   await axios.delete(`${baseUrl}/Articulo/${id}`)
  //   cargarArticulo()
  // }

  // function confirmar(id,nombre) {
  //   Swal.fire({
  //     title: '¿Confirma eliminar el registro: ' + nombre + '?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#6c757d',
  //     confirmButtonText: 'Confirmar'

  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteArticulo(id)

  //     }
  //   });
  // };


  const columns = [
    {
      name: 'Código',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
      sortable: true,


    },
    {
      name: 'Existencia',
      selector: (row) => row.descripcion,


    }


  ]



  useEffect(() => {
    const result = Articulo.filter((country) => {
      return country.nombre.toLowerCase().match(search.toLowerCase())
    })

    setFilteredArticulo(result)
  }, [Articulo, search])

  return (
    <div className='container-fluid ' >
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Listado de Articulo"
        theme='custom'
        columns={columns}
        data={filteredArticulo}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        // selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={[
          <Link className="btn btn-sm btn-primary px-5" to="/addArticulo"> Agregar Articulo</Link>,
          <Link className="btn btn-sm btn-outline-secondary px-3" to="/reporteArticulo"> PDF</Link>,
          <CSVLink data={filteredArticulo} filename={"Tabla de Articulo.csv"}><button className="btn btn-sm btn-outline-secondary px-3"> CSV</button></CSVLink>,
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar Articulo"

            // className="form-control"
            className="w-25 form-control"

            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

    </div>
  )
}
export default TblArticulo
