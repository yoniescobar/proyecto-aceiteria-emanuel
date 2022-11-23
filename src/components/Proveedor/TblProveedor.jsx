import 'styled-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'

const baseUrl = process.env.REACT_APP_BASE_URL

const TblProveedor = () => {
  const [search, setSearch] = useState('')
  const [Articulo, setArticulo] = useState([])
  const [filteredArticulo, setFilteredArticulo] = useState([])

  useEffect(() => {
    cargarArticulos();
  }, []);

  const cargarArticulos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Articulo/all`)
      setArticulo(response.data.data)
      setFilteredArticulo(response.data.data)
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar los articulos, intenta mas tarde.', 'warning')
    }
  }

  const eliminarArticulo = async (id) => {
    try {
      const resultado = await axios.delete(`${baseUrl}/Articulo/id/${id}`)

      if (resultado) {
        mesajeResultado('Articulo eliminado con exito!', 'success');
        cargarArticulos()
      } else {
        mesajeResultado('Ocurrio un error al intentar eliminar el articulo!', 'warning');
      }
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar eliminar el articulo!', 'warning');
    }
  }

  const mesajeResultado = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
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
        eliminarArticulo(id)
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
      name: 'Telefono',
      selector: (row) => row.categoria.nombre,
    },
    {
      name: 'Correo',
      selector: (row) => row.existencia,
    },
    {
      name: 'Estado',
      selector: (row) => row.categoria.condicion,
      sortable: true,
      grow:0.5,
      conditionalCellStyles:[
        {
            when: row => row.categoria.condicion === 'Activo',
            classNames: ['badge badge-pill badge-success m-3 mb-3'],
        },
        {
          when: row => row.categoria.condicion !== 'Activo',
            classNames: ['badge badge-pill badge-danger  m-3 mb-3']
        }
      ]
    },
    {
      name: 'Opciones',
      cell: (row) => [
        <Link
          className="btn btn-outline-primary mx-1"
          to={`/editArticulo/${row.id}`}
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
    const result = Articulo.filter((country) => {
      return country.nombre.toLowerCase().match(search.toLowerCase())
    })

    setFilteredArticulo(result)
  }, [Articulo, search])

  return (
    <div className='container-fluid ' >
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Listado de proveedores"
        columns={columns}
        data={filteredArticulo}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        actions={[
          <Link className="btn btn-sm btn-primary px-5" to="/addProveedor"> Agregar proveedor</Link>,
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar Articulo"
            className="w-25 form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  )
}
export default TblProveedor
