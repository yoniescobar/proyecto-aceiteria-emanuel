import 'styled-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'


const baseUrl = process.env.REACT_APP_BASE_URL



const TblUsuario = () => {
  const [search, setSearch] = useState('')
  const [Usuario, setUsuario] = useState([])
  const [filteredUsuario, setFilteredUsuario] = useState([])

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {

    const response = await axios.get(`${baseUrl}/Usuario/all`)
    setUsuario(response.data.data)
    setFilteredUsuario(response.data.data)

  }


  const deleteUsuario = async (id) => {
    await axios.delete(`${baseUrl}/Usuario/id/${id}`)
    cargarUsuario()
  }

  function confirmar(id, nombre) {
    Swal.fire({
      title: '¿Confirma eliminar el registro: ' + nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Confirmar'

    }).then((result) => {
      if (result.isConfirmed) {
        deleteUsuario(id)

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
      name: 'Usuario',
      selector: (row) => row.usuario,
      sortable: true,
    },

    {
      name: 'Condicion',
      selector: (row) => row.estado === '1' ? 'Activo' : 'No activo',
      sortable: true,
      grow: 0.5,
      conditionalCellStyles: [
        {
          when: row => row.estado === '1',
          classNames: ['badge badge-pill badge-success m-3 mb-3'],
        },
        {
          when: row => row.estado !== '1',
          classNames: ['badge badge-pill badge-danger  m-3 mb-3']
        }
      ]
    },


    {
      name: 'Opciones',
      cell: (row) => [
        <Link
          className="btn btn-outline-primary mx-1"
          to={`/editUsuario/${row.id}`}

        >
          <span className="fa-solid fa-pen-to-square"></span>

        </Link>,

        <button
          className="btn btn-danger mx-1"
          onClick={() => confirmar(row.id, row.nombre)}>
          <span className="fa-regular fa-trash-can"></span>
        </button>,

      ],
    },
  ]


  useEffect(() => {
    const result = Usuario.filter((usuario) => {
      return usuario.nombre.toLowerCase().match(search.toLowerCase())
    })

    setFilteredUsuario(result)
  }, [Usuario, search])

  return (
    <div className='container-fluid ' >
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Listado de Usuarios"
        theme='custom'
        columns={columns}
        data={filteredUsuario}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        // selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={[
          <Link className="btn btn-sm btn-primary px-5" to="/addUsuario"> Agregar Usuario</Link>,
         
          
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar Usuario"

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
export default TblUsuario
