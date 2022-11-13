
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
        documentTitle: 'Listado de articulos',
    })

    const [Articulo, setArticulo] = useState([])

    const cargarArticulo = async () => {
        const response = await axios.get(`${baseUrl}/Articulo/all`)
        // console.log(response.data.data.categoria);
        setArticulo(response.data.data);
    }
    useEffect(() => {
        cargarArticulo();
    }, []);

    return (
        <>
            <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2 ">
                    Datos Articulos
                    <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/tblArticulo"> cancelar</Link>
                </h1>
                <table className='w-75 mx-auto table table-striped' >
                    <thead>
                        <th>Id</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Existencia</th>
                        <th>Categoria</th>
                    </thead>
                    <tbody>
                        {Articulo.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.codigo}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.existencia}</td>
                                    <td>{item.categoria.nombre}</td>
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
