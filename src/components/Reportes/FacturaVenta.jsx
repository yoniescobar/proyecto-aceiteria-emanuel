import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio'
import numeroAQuetzales from "../../utils/util";

const FacturaVenta = () => {
    const { idVenta } = useParams()
    const componentRef = useRef();
    let total = 0;
    let fecha = "";

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'FacturaVenta',
    })

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
            armarData(response.data.data)
        }
    }

    const armarData = (data) => {
        const datosFecha = data[0].fechaegreso.split("-")

        if (datosFecha.length == 3) {
            fecha = `${datosFecha[2]}/${datosFecha[1]}/${datosFecha[0]}`
            data[0].fecha_doc = fecha;
        }

        setDataVentaRealizada(data);
    }

    useEffect(() => {
        cargarDataVentaRealizada();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-center">
                    <button type="button" className="btn btn-sm btn-outline-secondary m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/ventasRealizadas"> cancelar</Link>
                    <hr></hr>
                </h1>

                <div ref={componentRef} style={{ margin: '10%', margin: '10%', marginTop: '5%', marginRight: '10%', marginBottom: '10%', marginLeft: '10%' }}>
                    <h1 style={{ textAlign: 'center' }}>Aceitera Emanuel</h1>
                    <br></br>
                    <label>Nit: </label><span class="border-0"> 7455225-5</span><br></br>

                    <label>Telefono: </label><span class="border-0"> 7758-8956</span><br></br>
                    <label>Email: </label><span class="border-0"> aceiteraemanuel@gmail.com</span><br></br>
                    <label>Fecha: </label><span class="border-0"> {DataVentaRealizada[0].fecha_doc}</span><br></br>
                    <br></br>

                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ textAlign: 'right' }}><label>Cliente:</label> {DataVentaRealizada[0].persona.nombre.toUpperCase()}</span>
                            <span style={{ marginLeft: '10%', textAlign: 'center' }}><label>Doc:</label> {`${DataVentaRealizada[0].serie_doc.toUpperCase()}-${DataVentaRealizada[0].numero_doc}`}</span>
                            <span style={{ marginLeft: '10%', textAlign: 'right' }}><label>Telefono:</label> N/A</span>
                        </div>
                    </div>

                    <br></br>
                    <table className='w-85 mx-auto table table-striped' >
                        <thead>
                            <th>Producto</th>
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
                                    <tr key={item.id}>
                                        <td>{item.articulo.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.precio_venta}</td>
                                        <td>{numeroAQuetzales(item.precio_venta * item.cantidad)}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'right' }}>
                        <span><label>Total a pagar: </label> {numeroAQuetzales(total)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FacturaVenta
