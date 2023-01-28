import 'styled-components'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { PeticionGet } from '../../Servicios/PeticionServicio'

import DatePicker from "react-datepicker";
import clsx from "clsx";
import { ListaSucursal, ListaTipoCredito } from '../../Constantes/ListasSelect'

// const baseUrl = process.env.REACT_APP_BASE_URL
const VentasRealizadas = () => {
  const [fechaInicial, setfechaInicial] = useState(new Date());
  const [fechaFinal, setfechaFinal] = useState(new Date());

  const [search, setSearch] = useState('')
  const [VentaRealizada, setVentaRealizada] = useState([])
  const [filteredVentaRealizada, setFilteredVentaRealizada] = useState([])
  const [filtroSelect, setFiltroSelect] = useState({
    sucursal: 1,
    tipoCredito: 1,
  })

  useEffect(() => {
    cargarVentas();
  }, []);

  const handleChange = event => {
    setFiltroSelect({ ...filtroSelect, [event.target.name]: event.target.value });
  };

  const FiltrarEgreso = async () => {
    let fechaInicio = fechaInicial.getFullYear() + '-' + (fechaInicial.getMonth() + 1) + '-' + fechaInicial.getDate();
    let fechaFin = fechaFinal.getFullYear() + '-' + (fechaFinal.getMonth() + 1) + '-' + fechaFinal.getDate();

    const response = await PeticionGet(`Egreso/estado/1/tipoComprobante/1/fechaInicio/${fechaInicio}/fechaFin/${fechaFin}/sucursal/${filtroSelect.sucursal}`);
    if (response) {
      setVentaRealizada(response.data.data.sort(
        (p1, p2) =>
          (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0))

      setFilteredVentaRealizada(response.data.data.filter(x => x.tipopago === parseInt(filtroSelect.tipoCredito)));
    }
  }

  const cargarVentas = async () => {
    const response = await PeticionGet('Egreso/estado/1/tipoComprobante/1/sucursal/1/egresosFechaActual');
    console.log(response);
    if (response) {
      setVentaRealizada(response.data.data.sort(
        (p1, p2) =>
          (p1.id < p2.id) ? 1 : (p1.id > p2.id) ? -1 : 0))

      setFilteredVentaRealizada(response.data.data)
    }
  }

  const CambiarFormatoFecha = (fecha) => {
    const datos = fecha.split("-");

    if (datos.length = 3) {
      return `${datos[2]}/${datos[1]}/${datos[0]}`;
    } else {
      return '';
    }
  }

  const columns = [
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
      grow: 0.5,
      conditionalCellStyles: [
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
        <Link className="btn btn-sm btn-primary mx-1" to={`/FacturaVenta/${row.id}`}>
          <span className="fa-solid fa-file-pdf"></span>
        </Link>,
        <Link className="btn btn-sm btn-primary mx-1" to={`/Ticket/${row.id}`}>
          <span className="fa-solid fa-ticket"></span>
        </Link>,
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
      <div className="row">
        <div className="col-sm d-flex justify-content-center">
          <div className="grupo">
            <label>Fecha inicial </label> <br />
            <DatePicker
              locale="es"
              dateFormat="dd/MM/yyyy"
              selected={fechaInicial}
              onChange={date => setfechaInicial(date)}
              className={clsx(
                'form-control',
                'formField'
              )}
            />
          </div>
        </div>
        <div className="col-sm d-flex justify-content-center">
          <div className="grupo">
            <label>Fecha final </label> <br />
            <DatePicker
              locale="es"
              dateFormat="dd/MM/yyyy"
              selected={fechaFinal}
              onChange={date => setfechaFinal(date)}
              className={clsx(
                'form-control',
                'formField'
              )}
            />
          </div>
        </div>
        <div className="col-sm d-flex justify-content-center">
          <div className="grupo" >
            <label>Tipo Pago </label> <br />
            <div className="mb-3">
              <select id="tipoCredito" name="tipoCredito" nombre="tipoCredito" className="form-select appSelect" onChange={handleChange}>
                {ListaTipoCredito.map((option) => (
                  <option key={option.id} value={option.id} >{option.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-sm d-flex justify-content-center">
          <div className="grupo" >
            <label>Sucursal </label> <br />
            <div className="mb-3">
              <select id="sucursal" name="sucursal" nombre="sucursal" className="form-select appSelect" onChange={handleChange}>
                {ListaSucursal.map((option) => (
                  <option key={option.id} value={option.id} >{option.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-sm d-flex justify-content-center">
          <div className="grupo" >
            <div className="mb-3 my-4">
              <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={FiltrarEgreso}>Filtrar</button>
            </div>
          </div>
        </div>
      </div>

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
