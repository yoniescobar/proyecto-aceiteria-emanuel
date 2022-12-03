import 'styled-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'
import { PeticionGet, PeticionDelete } from '../../Servicios/PeticionServicio'
import { alertMensaje } from '../../utils/alert'

// const baseUrl = process.env.REACT_APP_BASE_URL
const TblPresentacion = () => {
  const [search, setSearch] = useState('')
  const [Presentacion, setPresentacion] = useState([])
  const [filteredPresentacion, setFilteredPresentacion] = useState([])

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const response = await PeticionGet('Presentacion/all');
      console.log(response)
      setPresentacion(response.data.data)
      setFilteredPresentacion(response.data.data)
    } catch (error) {
      alertMensaje('Ocurrio un error al intentar consultar los Presentacions, intenta mas tarde.', 'warning')
    }
  }

  const eliminarPresentacion = async (id) => {
    try {
      const resultado = await PeticionDelete(`Presentacion/id/${id}`)

      if (resultado) {
        alertMensaje('Presentacion eliminado con exito!', 'success');
        cargarVentas()
      } else {
        alertMensaje('Ocurrio un error al intentar eliminar el Presentacion!', 'warning');
      }
    } catch (error) {
      alertMensaje('Ocurrio un error al intentar eliminar el Presentacion!', 'warning');
    }
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
        eliminarPresentacion(id)
      }
    });
  };


  const columns = [
    {
      name: 'Presentacion',
      selector: (row) => row.presentacion,
      sortable: true,
    },
    {
      name: 'Descripcion',
      selector: (row) => row.descripcion,
    },
    {
      name: 'Estado',
      selector: (row) => row.estado === 1 ? 'Activo' : 'No activo',
      sortable: true,
      grow:0.5,
      conditionalCellStyles:[
        {
            when: row => row.estado === 1,
            classNames: ['badge badge-pill badge-success m-3 mb-3'],
        },
        {
          when: row => row.estado !== 1,
            classNames: ['badge badge-pill badge-danger  m-3 mb-3']
        }
      ]
    },
    {
      name: 'Opciones',
      cell: (row) => [
        <Link
        className="btn btn-outline-primary mx-1"
          to={`/editPresentacion/${row.id}`}>
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
    const result = Presentacion.filter((country) => {
      return country.presentacion.match(search)
    })

    setFilteredPresentacion(result)
  }, [Presentacion, search])

  return (
    <div className='container-fluid ' >
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Ventas realizadas"
        columns={columns}
        data={filteredPresentacion}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        actions={[
            <Link className="btn btn-sm btn-primary px-5" to="/addPresentacion"> Agregar proveedor</Link>,
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar presentacion"
            className="w-25 form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  )
}
export default TblPresentacion
