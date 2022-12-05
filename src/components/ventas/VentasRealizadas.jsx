import 'styled-components'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { PeticionGet } from '../../Servicios/PeticionServicio'

// const baseUrl = process.env.REACT_APP_BASE_URL
const VentasRealizadas = () => {
  const [search, setSearch] = useState('')
  const [VentaRealizada, setVentaRealizada] = useState([])
  const [filteredVentaRealizada, setFilteredVentaRealizada] = useState([])

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    
    const response = await PeticionGet('Egreso/all');
    
    if (response) {
      setVentaRealizada(response.data.data)
      setFilteredVentaRealizada(response.data.data)
    }
  }

  const CambiarFormatoFecha = (fecha) => {
    const datos = fecha.split("-");
    
    if (datos.length = 3) {
      return `${datos[2]}/${datos[1]}/${datos[0]}`;
    } else {
      return "";
    }
  }

  const columns = [
    // {
    //   name: 'Numero',
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: 'Fecha',
      selector: (row) => CambiarFormatoFecha(row.fecha_doc),
    },
    {
      name: 'No. documento',
      selector: (row) => `${row.serie_doc.toUpperCase()}-${row.numero_doc}`,
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
