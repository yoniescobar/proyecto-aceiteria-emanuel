import React from 'react'
import { getIngresos, delIngreso } from './servicios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import numeroAQuetzales from "../../utils/util";
import Swal from 'sweetalert2'


const ComprasLista = () => {
    const [filteredList, setFilteredList] = useState([]);
    const [search, setSearch] = useState('');
    const mesajeResultado = (mensaje, clase) => {
        Swal.fire(
          mensaje,
          '',
          clase
        )
      }    
    const columns = [
        {
          name: 'Fecha',
          selector: (row) => parseFecha(row.fechaingreso),
          sortable: true,
        },
        {
          name: 'Documento',
          selector: (row) => row.serie_doc == null ? ' --': row.serie_doc  +' - '+row.numero_doc,
          sortable: true,
        },
        {
            name: 'Total',
            selector: (row) => numeroAQuetzales(row.total_ingreso),
            sortable: true,
        },
        {
          name: 'Condicion',
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
            <Link
              className="btn btn-outline-primary mx-1"
              to={`/editUsuario/${row.id}`}
            >
              <span className="fa-solid fa-pen-to-square"></span>
            </Link>,
            <button
              className="btn btn-danger mx-1"
              onClick={() => confirmar(row)}>
              <span className="fa-regular fa-trash-can"></span>
            </button>,
    
          ],
        },
      ]

      const confirmar = (item) => {
        let msj = item.serie_doc == null ? item.id : (item.serie_doc  +' - '+item.numero_doc);
        Swal.fire({
            title: '¿Confirma eliminar el registro: ' + msj + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarRegistro(item.id)
            }
          });
      }

      const eliminarRegistro = (id) => {
        delIngreso(id).then(
            data => {
              if(data.id > 0){
                const newFilteredList = filteredList.filter(function( obj ) {
                    return obj.id !== id;
                });
                setFilteredList(newFilteredList);
                mesajeResultado('Registro Anulado', 'success');
              }else{
                mesajeResultado('Error al anular el registro', 'warning');
              };
            }
          )
      }
      const parseFecha = (fecha) =>{
        let datosFecha = fecha.split("T");
        let datosFechaHora = datosFecha[1].split("-")[0].split(":");
        let datosFechaLast = `${datosFecha[0]}`.split("-");
        let fechaHora = datosFechaLast[2]+'/'+datosFechaLast[1]+'/'+datosFechaLast[0]+' - ' +datosFechaHora[0]+':'+datosFechaHora[1];
        return fechaHora;
      }
 // Obtiene lista de compras
 useEffect(() =>{
    getIngresos().then(
        data => {
          setFilteredList(data.data);
        }
      )
  }, []);
  return (
    <div className="container">
      <DataTable className='table border table-responsive'
        defaultSortField="idTablaData"
        title="Listado de Compras"
        theme='custom'
        columns={columns}
        data={filteredList}
        pagination
        sortIcon={<i className="fa-solid fa-sort"></i>}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRowsHighlight
        highlightOnHover
        actions={[
          <Link className="btn btn-sm btn-primary px-5" to="/compras"> Agregar Compra</Link>,
        ]}
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Buscar Usuario"
            className="w-25 form-control"

            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />        
    </div>
  )
}

export default ComprasLista