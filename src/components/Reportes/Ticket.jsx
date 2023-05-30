import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio';
import numeroAQuetzales from "../../utils/util";

const Ticket = () => {
    const { idVenta } = useParams()
    const componentRef = useRef();
    let total = 0;
    let tituloDocumento = "";
    let fecha = "";

    const [DataVentaRealizada, setDataVentaRealizada] = useState([{
        id: 0,
        fecha_doc: "",
        serie_doc: "",
        numero_doc: "",
        nombre: "",
        usuario: {nombre: ""},
        persona: { nombre: "" },
        items: [{
            id: "",
            cantidad: 0,
            precio_venta: 0,
            descuento: 0,
            articulo: { nombre: "" }
        }]
    }])

    const cargarDataVentaRealizada = async () => {
        const response = await PeticionGet(`Egreso/id/${idVenta}`);

        if (response.data.data.length > 0) {
            armarData(response.data.data);
        }
    }

    const armarData = (data) => {
        tituloDocumento = `Tiket_${data[0].id}`;

        const arrayFecha = data[0].fechaegreso.split("T")

        if (arrayFecha.length == 2){
            const datosFecha = arrayFecha[0].split("-")
            const hora = arrayFecha[1].split(":")

            if(datosFecha.length == 3 && hora.length >= 3) {
                fecha = `${datosFecha[2]}/${datosFecha[1]}/${datosFecha[0]} ${hora[0]}:${hora[1]}`
                data[0].fecha_doc = fecha;
            }
        }


        setDataVentaRealizada(data);
    }

    useEffect(() => {
        cargarDataVentaRealizada();
    }, []);

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <ReactToPrint
                trigger={() => <button className="btn btn-sm btn-outline-secondary px-3 m-2">Imprimir</button>}
                content={() => componentRef.current}
                documentTitle='Ticket'
                pageStyle='@page { size: 80mm 258mm; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 90px !important; } }'
            />
            <Link className="btn btn-sm btn-outline-danger px-3 " to="/ventasRealizadas"> cancelar</Link>
            <Link className="btn btn-sm btn-outline-primary px-3 " to="/ventas"> Nueva Venta</Link>
            <hr style={{ width: '50%', marginLeft: '25%' }}></hr>
            <div style={{ width: '100%', marginLeft: '35%' }}>
                <div ref={componentRef} >
                    <style type="text/css" media="print">{"\
                        @page {\ size: 80mm 258mm;\ }\
                    "}
                    </style>
                    <div style={{ width: '35%', textAlign: 'center' }}>
                        <label><h2>Aceitera Emanuel</h2> </label><br></br>
                        <label>Nit: </label><span class="border-0"> 7455225-5</span><br></br>
                        <label>Telefono: </label><span class="border-0"> 7758-8956</span><br></br>
                        <label>Email: </label><span class="border-0"> aceiteraemanuel@gmail.com</span><br></br>
                        <label>Vendedor: </label><span class="border-0"> {DataVentaRealizada[0].usuario.nombre}</span><br></br>
                        <hr></hr>

                        <label>No. Ticket: </label><span class="border-0"> {DataVentaRealizada[0].id}</span><br></br>
                        <label>Fecha: </label><span class="border-0"> {DataVentaRealizada[0].fecha_doc}</span><br></br>
                        <span><label>Doc:</label> {`${DataVentaRealizada[0].serie_doc.toUpperCase()}-${DataVentaRealizada[0].numero_doc}`}</span><br></br>
                        <span><label>Cliente:</label> {DataVentaRealizada[0].persona.nombre.toUpperCase()}</span><br></br>
                        <span><label>Telefono:</label> N/A</span>
                        <hr></hr>
                        <table className='w-100 mx-auto table table-borderless table-sm' >
                            <thead>
                                {/* <th>Nombre</th> */}
                                <th>Cant.</th>
                                <th>Precio</th>
                                <th>Desc.</th>
                                <th>Subtotal</th>
                            </thead>
                            <tbody>
                                {DataVentaRealizada[0].items.map((item, i) => {
                                    {
                                        total = (total + ((item.precio_venta * item.cantidad) - item.descuento))
                                    }
                                    return (
                                        
                                        <tr key={item.id} >
                                            <td style={{ verticalAlign: 'middle' }}>{item.cantidad}</td>
                                            <td>
                                                {item.articulo.nombre}
                                                <p>{numeroAQuetzales(item.precio_venta)}</p>
                                            </td>
                                            <td>{numeroAQuetzales(item.descuento)}</td>
                                            <td style={{ verticalAlign: 'middle' }}>{numeroAQuetzales((item.precio_venta * item.cantidad) - item.descuento)}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                        <hr></hr>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ textAlign: 'right' }}><label>Total a pagar: </label> {numeroAQuetzales(total)}</span><br /><br />
                            <span style={{ textAlign: 'right' }}><label>Pago: </label>{numeroAQuetzales(DataVentaRealizada[0].pago)}</span><br /><br />
                            <span style={{ textAlign: 'right' }}><label>Cambio: </label>{numeroAQuetzales(DataVentaRealizada[0].cambio)}</span><br /><br />
                        </div>
                        <h5 className='d-flex justify-content-center'>Gracias por su compra</h5>
                        <span className='d-flex justify-content-center'>*** NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES.***</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket
