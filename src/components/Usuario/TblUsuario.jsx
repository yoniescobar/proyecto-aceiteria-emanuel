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

    const response = await axios.get(`${baseUrl}/Persona/all`)
    setUsuario(response.data.data)
    setFilteredUsuario(response.data.data)

  }


  const deleteUsuario = async (id) => {
    await axios.delete(`${baseUrl}/Persona/id/${id}`)
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
      name: 'Código',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Tipo Persona',
      selector: (row) => row.tipo_persona,
      sortable: true,
    },
    {
      name: 'Tipo Documento',
      selector: (row) => row.tipo_documento,
      sortable: true,

    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: 'Dirección',
      selector: (row) => row.direccion,
      sortable: true,
    },
    {
      name: 'Telefono',
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: 'Correo',
      selector: (row) => row.correo,
      sortable: true,
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
          <Link className="btn btn-sm btn-outline-secondary px-3" to="/reporteUsuario"> PDF</Link>,
          <CSVLink data={filteredUsuario} filename={"Tabla de Usuario.csv"}><button className="btn btn-sm btn-outline-secondary px-3"> CSV</button></CSVLink>,
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
