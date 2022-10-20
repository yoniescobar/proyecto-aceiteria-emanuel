
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const ReactPdfPrintUsuario = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Listado de Usuario',
        //onAfterPrint:()=>alert('Print success')
    })

    const [Usuario, setUsuario] = useState([])

    const cargarUsuario = async () => {
        const response = await axios.get(`${baseUrl}/Persona/all`)
        setUsuario(response.data.data)
    
      }
      useEffect(() => {
        cargarUsuario();
      }, []);

    return (
        <>
            <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2 ">
                    Datos Usuarios 
                    <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/tblUsuario"> cancelar</Link>
                </h1>
                <table className='w-75 mx-auto table table-striped' >
                    <thead>
                        <th>Código</th>
                        <th>Tipo Persona</th>
                        <th>Tipo Documento</th>
                        <th>nombre</th>
                        <th>no_documento</th>
                        <th>direccion</th>
                        <th>telefono</th>
                        <th>correo</th>
                    </thead>
                    <tbody>
                        {Usuario.map((item, i)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.tipo_persona}</td>
                                    <td>{item.tipo_documento}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.no_documento}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.telefono}</td>
                                    <td>{item.correo}</td>

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

export default ReactPdfPrintUsuario
