import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const columns = [
    {
      name: 'FECHA ',
      selector: (row) => row.fechaingreso,
      sortable: true,
    },
    {
      name: 'SERIE',
      selector: (row) => row.serie_doc,
      sortable: true,
    },
    {
      name: 'NO DOCUMENTO',
      selector: (row) => row.numero_doc,
    },
    {
      name: 'TOTAL',
      selector: (row) => row.total_ingreso,
    },
    {
      name: 'Opciones',
      cell: (row) => [
        <Link
          className="btn btn-outline-primary mx-1"
        >
          <span className="fa-solid fa-pen-to-square"></span>
        </Link>,
        <button
          className="btn btn-danger mx-1">
          <span className="fa-regular fa-trash-can"></span>
        </button>,
      ],
    },
  ]

function Compras() {

    const [filteredData, setFilteredData] = useState([]);

    return (
        <div className='container-fluid'>
            
        </div>
    )
}

export default Compras