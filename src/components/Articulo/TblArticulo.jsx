import 'styled-components'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CSVLink } from 'react-csv'
import { PeticionGet,  PeticionDelete} from '../../Servicios/PeticionServicio'

const TblArticulo = () => {
  const [search, setSearch] = useState('')
  const [Articulo, setArticulo] = useState([])
  const [filteredArticulo, setFilteredArticulo] = useState([])

  useEffect(() => {
    cargarArticulos();
  }, []);

  const cargarArticulos = async () => {
    const response = await PeticionGet('Articulo/all/');

    if(response) {
      setArticulo(response.data.data);
      setFilteredArticulo(response.data.data);
    }
  }

  const eliminarArticulo = async (id) => {
      const resultado = await PeticionDelete(`Articulo/id/${id}`);
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
      name: 'Categoría',
      selector: (row) => row.categoria.nombre,
    },
    {
      name: 'Existencia',
      selector: (row) => row.existencia,
    },
    {
      name: 'Imagen',
      selector: (row) => <img width={50} height={50} src={row.imagen} />,
    },
    {
      name: 'Estado',
      selector: (row) => row.categoria.condicion,
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
        title="Listado de Articulo"
        columns={columns}
        data={filteredArticulo}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
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
