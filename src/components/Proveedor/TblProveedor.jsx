import 'styled-components'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { PeticionGet,  PeticionDelete} from '../../Servicios/PeticionServicio'

const TblProveedor = () => {
  const [search, setSearch] = useState('')
  const [Proveedor, setProveedor] = useState([])
  const [filteredProveedor, setFilteredProveedor] = useState([])

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    const response = await PeticionGet('Persona/all');

    if (response) {
      setProveedor(response.data.data.filter(x => x.tipopersona == 2));
      setFilteredProveedor(response.data.data.filter(x => x.tipopersona == 2));
    }
  }

  const eliminarProveedor = async (id) => {
    await PeticionDelete(`Persona/id/${id}`);
    cargarProveedores();
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
        eliminarProveedor(id)
      }
    });
  };

  const columns = [
    {
      name: 'NIT',
      selector: (row) => row.nodocumento,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: 'Telefono',
      selector: (row) => row.telefono,
    },
    {
      name: 'Direccion',
      selector: (row) => row.direccion,
    },
    {
      name: 'Correo',
      selector: (row) => row.correo,
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
          to={`/editProveedor/${row.id}`}
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
    const result = Proveedor.filter((country) => {
      return country.nombre.toLowerCase().match(search.toLowerCase())
    })

    setFilteredProveedor(result)
  }, [Proveedor, search])

  return (
    <div className='container-fluid' >
      <DataTable className='table border table-responsive  '
        defaultSortField="idTablaData"
        title="Listado de proveedores"
        columns={columns}
        data={filteredProveedor}
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
            placeholder="Buscar Proveedor"
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
