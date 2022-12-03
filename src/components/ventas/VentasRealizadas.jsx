import 'styled-components'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'
import { PeticionGet } from '../../Servicios/PeticionServicio'
import { alertMensaje } from '../../utils/alert'

// const baseUrl = process.env.REACT_APP_BASE_URL
const VentasRealizadas = () => {
  const [search, setSearch] = useState('')
  const [VentaRealizada, setVentaRealizada] = useState([])
  const [filteredVentaRealizada, setFilteredVentaRealizada] = useState([])

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const response = await PeticionGet('Egreso/all');
      setVentaRealizada(response.data.data)
      setFilteredVentaRealizada(response.data.data)
    } catch (error) {
      alertMensaje('Ocurrio un error al intentar consultar los VentaRealizadas, intenta mas tarde.', 'warning')
    }
  }

  // const eliminarVentaRealizada = async (id) => {
  //   try {
  //     const resultado = await axios.delete(`${baseUrl}/VentaRealizada/id/${id}`)

  //     if (resultado) {
  //       alertMensaje('VentaRealizada eliminado con exito!', 'success');
  //       cargarVentas()
  //     } else {
  //       alertMensaje('Ocurrio un error al intentar eliminar el VentaRealizada!', 'warning');
  //     }
  //   } catch (error) {
  //     alertMensaje('Ocurrio un error al intentar eliminar el VentaRealizada!', 'warning');
  //   }
  // }

  // function confirmar(id, nombre) {
  //   Swal.fire({
  //     title: '¿Confirma eliminar el registro: ' + nombre + '?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#6c757d',
  //     confirmButtonText: 'Confirmar'

  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       eliminarVentaRealizada(id)
  //     }
  //   });
  // };


  const columns = [
    {
      name: 'Numero',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: (row) => row.fecha_doc,
    },
    {
      name: 'No. documento',
      selector: (row) => `${row.serie_doc}-${row.numero_doc}`,
    },
    {
      name: 'Cliente',
      selector: (row) => row.persona.nombre,
    },
    {
      name: 'Vendedor',
      selector: (row) => row.usuario.nombre,
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
        className="btn btn-sm btn-primary px-5"
          to={`/reporteDetalleVenta/${row.id}`}>
          <span className="fa-solid fa-file-pdf"></span>
        </Link>,
        // <button
        //   className="btn btn-danger mx-1"
        //   onClick={() => confirmar(row.id, row.nombre)}>
        //   <span className="fa-regular fa-trash-can"></span>
        // </button>,
      ],
    },

  ]

  useEffect(() => {
    const result = VentaRealizada.filter((country) => {
      return country.numero_doc.match(search)
    })

    setFilteredVentaRealizada(result)
  }, [VentaRealizada, search])

  return (
    <div className='container-fluid ' >
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Ventas realizadas"
        columns={columns}
        data={filteredVentaRealizada}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        actions={[
          // <Link className="btn btn-sm btn-outline-secondary px-3" to="/reporteVentaRealizada"> PDF</Link>,
          // <CSVLink data={filteredVentaRealizada} filename={"Tabla de VentaRealizada.csv"}><button className="btn btn-sm btn-outline-secondary px-3"> CSV</button></CSVLink>,
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar No. documento"
            className="w-25 form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
    </div>
  )
}
export default VentasRealizadas
