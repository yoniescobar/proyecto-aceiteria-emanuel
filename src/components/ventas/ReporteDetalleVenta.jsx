import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio'

const ReporteDetalleVenta = () => {
    const { idVenta } = useParams()
    const componentRef = useRef();
    let total = 0;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Listado de DataVentaRealizada',
    })

    const [DataVentaRealizada, setDataVentaRealizada] = useState([{
        fecha_doc: "",
        serie_doc: "",
        numero_doc: "",
        nombre: "",
        persona: {nombre:""},
        items: [{
            id:"",
            cantidad: 0,
            precio_venta: 0,
            articulo:{ nombre:""}
        }]
    }])

    const cargarDataVentaRealizada = async () => {
        const response = await PeticionGet(`Egreso/id/${idVenta}`);

        if(response.data.data.length > 0){
            setDataVentaRealizada(response.data.data)
        }   
    }
    
    useEffect(() => {
        cargarDataVentaRealizada();
    }, []);

    return (
        <>
            <div style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2 ">
                    Aceitera Emanuel
                    <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/tblDataVentaRealizada"> cancelar</Link>
                </h1>

                <div ref={componentRef} class="container">
                    <label>Nit: </label><span class="border-0"> 7455225-5</span><br></br>
                    
                    <label>Telefono: </label><span class="border-0"> 7758-8956</span><br></br>
                    <label>Email: </label><span class="border-0"> aceiteraemanuel@gmail.com</span><br></br>
                    <label>Fecha: </label><span class="border-0"> {DataVentaRealizada[0].fecha_doc}</span><br></br>
                    <br></br>

                    <div class="row">
                        <div class="col-sm">
                            <label>Cliente: </label><span class="border-0"> {DataVentaRealizada[0].persona.nombre}</span>
                        </div>
                        <div class="col-sm">
                            <label>Doc: </label><span class="border-0"> {`${DataVentaRealizada[0].serie_doc}-${DataVentaRealizada[0].numero_doc}`}</span>
                        </div>
                        <div class="col-sm">
                            <label>Telefono: </label><span class="border-0"> N/A</span>
                        </div>
                    </div>

                    <br></br>
                    <table className='w-85 mx-auto table table-striped' >
                        <thead>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </thead>
                        <tbody>
                            {DataVentaRealizada[0].items.map((item, i)=>{
                                {
                                    total = (total + (item.precio_venta * item.cantidad))
                                }
                                return(
                                    <tr key={item.id}>
                                        <td>{item.articulo.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.precio_venta}</td>
                                        <td>Q {item.precio_venta * item.cantidad}</td>
                                    </tr>
                                )      
                            })
                            }
                        </tbody>
                    </table>

                    <div class="row">
                        <div class="col-sm"></div>
                        <div class="col-sm"></div>
                        <div class="col-sm">
                            <label>Total a pagar: </label><span class="border-0"> Q {total}</span>
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default ReporteDetalleVenta
