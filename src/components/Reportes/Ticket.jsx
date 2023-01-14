import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio'

const Ticket = () => {
    const { idVenta } = useParams()
    const componentRef = useRef();
    let total = 0;
    let tituloDocumento = "";
    const [DataVentaRealizada, setDataVentaRealizada] = useState([{
        fecha_doc: "",
        serie_doc: "",
        numero_doc: "",
        nombre: "",
        persona: { nombre: "" },
        items: [{
            id: "",
            cantidad: 0,
            precio_venta: 0,
            articulo: { nombre: "" }
        }]
    }])

    const cargarDataVentaRealizada = async () => {
        const response = await PeticionGet(`Egreso/id/${idVenta}`);

        if (response.data.data.length > 0) {
            setDataVentaRealizada(response.data.data);
            tituloDocumento = `Tiket_${DataVentaRealizada.numero_doc}`;
        }
    }

    useEffect(() => {
        cargarDataVentaRealizada();
    }, []);

    return (
        <div style={{ width: '85%', textAlign: 'center' }}>
            <ReactToPrint
                trigger={() => <button className="btn btn-sm btn-outline-secondary px-3 m-2">Imprimir</button>}
                content={() => componentRef.current}
                documentTitle='Ticket'
                pageStyle='@page { size: 80mm 258mm; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 80px !important; } }'
            />
            <Link className="btn btn-sm btn-outline-danger px-3 " to="/ventasRealizadas"> cancelar</Link>
            <hr></hr>
            <div style={{ width: '95%', marginLeft: '35%' }}>
                <div ref={componentRef} >
                    <style type="text/css" media="print">{"\
                    @page {\ size: 80mm 258mm;\ }\
                "}
                    </style>
                    <div style={{ width: '35%', textAlign: 'center' }}>
                        <label><h2>Aceitera Emanuel</h2> </label><br></br>
                        <label>Nit: </label><b class="border-0"> 7455225-5</b><br></br>
                        <label>Telefono: </label><h5 class="border-0"> 7758-8956</h5><br></br>
                        <label>Email: </label><h5 class="border-0"> aceiteraemanuel@gmail.com</h5><br></br>
                        <p>---------------------------------------------</p>
                        <label>Fecha: </label><span class="border-0"> {DataVentaRealizada[0].fecha_doc}</span><br></br>
                        <span><label>Doc:</label> {`${DataVentaRealizada[0].serie_doc.toUpperCase()}-${DataVentaRealizada[0].numero_doc}`}</span><br></br>
                        <span><label>Cliente:</label> {DataVentaRealizada[0].persona.nombre.toUpperCase()}</span><br></br>
                        <span><label>Telefono:</label> N/A</span>
                        <p>---------------------------------------------</p>
                        <table className='w-85 mx-auto table table-borderless table-sm' >
                            <thead>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                            </thead>
                            <tbody>
                                {DataVentaRealizada[0].items.map((item, i) => {
                                    {
                                        total = (total + (item.precio_venta * item.cantidad))
                                    }
                                    return (
                                        
                                        <tr key={item.id} >
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
                        <p>---------------------------------------------</p>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ textAlign: 'right' }}><label>Total a pagar: </label> Q {total}</span><br /><br />
                        </div>
                        <h5 className='d-flex justify-content-center'>Gracias por su compra</h5>
                        <h6 className='d-flex justify-content-center'>*** NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES.</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket
