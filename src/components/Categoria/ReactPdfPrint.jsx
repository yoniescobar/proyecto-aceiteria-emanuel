
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const ReactPdfPrint = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Listado de Categoria',
        //onAfterPrint:()=>alert('Print success')
    })

    const [Categoria, setCategoria] = useState([])

    const cargarCategoria = async () => {
        const response = await axios.get(`${baseUrl}/all`)
        setCategoria(response.data.data)
    
      }
      useEffect(() => {
        cargarCategoria();
      }, []);

    return (
        <>
            <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2 ">
                    Datos Categorias 
                    <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/tblCategoria"> cancelar</Link>
                </h1>
                <table className='w-75 mx-auto table table-striped' >
                    <thead>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>condición</th>
                    </thead>
                    <tbody>
                        {Categoria.map((item, i)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.condicion}</td>

                                </tr>
                            )      
                        })
                        }
                    </tbody>
                </table>
            </div>
            
        </>
    )
}

export default ReactPdfPrint
