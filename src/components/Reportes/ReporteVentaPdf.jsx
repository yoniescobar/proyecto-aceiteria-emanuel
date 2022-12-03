import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL


const ReporteVentaPdf = () => {
    const [fechaInicial, setfechaInicial] = useState(null);
    const [fechaFinal, setfechaFinal] = useState(null);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Listado de Ventas',
        //onAfterPrint:()=>alert('Print success')
    })

    const [Egreso, setEgreso] = useState([])

    const cargarEgreso = async () => {
        const response = await axios.get(`${baseUrl}/Egreso/all`)
        setEgreso(response.data.data)

    }
    useEffect(() => {
        cargarEgreso();
    }, []);


    return (

        <>

            <div>
                <h1 className='py-4 d-flex justify-content-center'><button type="button" className="btn btn-sm btn-outline-primary px-3 m-2 d-flex justify-content-center" onClick={handlePrint}>Imprimir</button>
                    <h1> <Link className="btn btn-sm btn-outline-danger px-3 " to="/ReporteVenta"> cancelar</Link></h1>
                </h1>
            </div>




            <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>

                <div className="w-75 mx-auto">
                    <h1>Aceitera 1</h1>
                    <p>Nit: 454832666</p>
                    <p>Tel: 4556-5645</p>

                </div>
                <table className='w-75 mx-auto table table-striped pb-5' >



                    <thead>
                        <th>Ventas realizadas</th>
                        <th>Total de ventas</th>
                        <th>costo de ventas</th>
                        <th>Ganancias</th>
                    </thead>
                    <tbody>
        {Egreso.map((item, i)=>{
            return(
                <tr key={item.id}>
                    <td>{item.descripcion}</td>
                     <td>{item.total_egreso}</td>
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

export default ReporteVentaPdf