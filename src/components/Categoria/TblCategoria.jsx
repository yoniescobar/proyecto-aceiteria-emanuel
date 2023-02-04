import 'styled-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'


const baseUrl = process.env.REACT_APP_BASE_URL



const TblCategoria = () => {
  const [search, setSearch] = useState('')
  const [Categoria, setCategoria] = useState([])
  const [filteredCategoria, setFilteredCategoria] = useState([])

  useEffect(() => {
    cargarCategoria();
  }, []);

  const cargarCategoria = async () => {



    try {
      const response = await axios.get(`${baseUrl}/all`)
      setCategoria(response.data.data)
      setFilteredCategoria(response.data.data)
    } catch (error) {
      
    }

  }


  const deleteCategoria = async (id) => {
    const del = await axios.delete(`${baseUrl}/categoria/${id}`)
    console.log(del);
    cargarCategoria()
  }

  function confirmar(id,nombre) {
    Swal.fire({
      title: '¿Confirma eliminar el registro: ' + nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Confirmar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoria(id)

      }
    });
  };


  const columns = [
   
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
      sortable: true,


    },
    {
      name: 'Descripcion',
      selector: (row) => row.descripcion,
      sortable: true,
      // grow:3 fila mas grande que las demas
    },

    {
      name: 'Estado',
      selector: (row) => row.condicion === '1' ? 'Activo' : 'No activo',
      sortable: true,
      grow:0.5,
      conditionalCellStyles:[
        {
            when: row => row.condicion === '1',
            classNames: ['badge badge-pill badge-success m-3 mb-3'],
        },
        {
          when: row => row.condicion !== '1',
            classNames: ['badge badge-pill badge-danger  m-3 mb-3']
        }
      ]
    },

    {
      name: 'Opciones',
      cell: (row) => [
        <Link
          className="btn btn-outline-primary mx-1"
          to={`/editCategoria/${row.id}`}
        // onClick={() => alert(row.id)}
        >
          <span className="fa-solid fa-pen-to-square"></span>

        </Link>,

        <button
          className="btn btn-danger mx-1"
          onClick={() => confirmar(row.id,row.nombre)}>
          <span className="fa-regular fa-trash-can"></span>
        </button>,

      ],
    },
  ]


  useEffect(() => {
    const result = Categoria.filter((country) => {
      return country.nombre.toLowerCase().match(search.toLowerCase())
    })

    setFilteredCategoria(result)
  }, [Categoria, search])

  return (
    <div className='container-fluid'>
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Listado de Categoría"
        
        columns={columns}
        data={filteredCategoria}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        // selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={[
          <Link className="btn btn-sm btn-primary px-5" to="/addCategoria"> Agregar Categoria</Link>,
          <Link className="btn btn-sm btn-outline-secondary px-3" to="/reporteCategoria"> PDF</Link>,
          <CSVLink data={filteredCategoria} filename={"Tabla de categoria.csv"}><button className="btn btn-sm btn-outline-secondary px-3"> CSV</button></CSVLink>,
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar Categoria"

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
export default TblCategoria
