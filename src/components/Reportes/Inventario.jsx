import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { PeticionGet } from '../../Servicios/PeticionServicio'
import numeroAQuetzales from "../../utils/util"

const Inventario = () => {
    const { idVenta } = useParams()
    const componentRef = useRef();

    let creditos = new Array();
    let total = 0;
    let fecha = '';

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Inventario',
    })

    const [DataCreditos, setDataCreditos] = useState([{
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

    const cargarDataCreditos = async () => {
        const response = await PeticionGet('Egreso/creditos');

        console.log(response.data.data);
        if(response.data.data.length > 0){
            armarDataReporte(response.data.data)
        }   
    }
    
    const armarDataReporte = (data) => {
        let articuloEncontrado = false;

        for (let credito of data) {
            if (credito.pagos.length == 0) {
                var itemCredito = {
                    fechaEgreso: credito.fechaegreso,
                    cliente: credito.persona.nombre,
                    totalCredito: credito.total_egreso,
                    descripcion: "",
                    abono: 0,
                    saldo: 0
                }
                creditos.push(itemCredito);
            }

            for (let pago of credito.pagos) {
                var itemCredito = {
                    fechaEgreso: credito.fechaegreso,
                    cliente: credito.persona.nombre,
                    totalCredito: credito.total_egreso,
                    descripcion: "",
                    abono: 0,
                    saldo: 0
                }

                itemCredito.descripcion = pago.observaciones
                itemCredito.abono = pago.abono;
                itemCredito.saldo = pago.saldo
                creditos.push(itemCredito);
            }            
        }

        setDataCreditos(creditos);
    }

    useEffect(() => {
        cargarDataCreditos();
    }, []);

    return (
        <>
            <div style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2 ">
                    <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                    <Link className="btn btn-sm btn-outline-danger px-3 " to="/ventasRealizadas"> cancelar</Link>
                </h1>

                <div ref={componentRef} style={{margin: '10%', margin: '10%', marginTop: '10%', marginRight: '10%', marginBottom: '10%', marginLeft: '10%'}}>
                    <label>Nit: </label><span class="border-0"> 7455225-5</span><br></br>
                    
                    <label>Telefono: </label><span class="border-0"> 7758-8956</span><br></br>
                    <label>Email: </label><span class="border-0"> aceiteraemanuel@gmail.com</span><br></br>
                    {/* <label>Fecha: </label><span class="border-0"> {DataCreditos[0].fecha_doc}</span><br></br>
                    <br></br>

                    <div>
                        <div>
                            <span style={{textAlign: 'right'}}><label>Cliente:</label> {DataCreditos[0].persona.nombre.toUpperCase()}</span>
                            <span style={{marginLeft: '30%', textAlign: 'right'}}><label>Doc:</label> {`${DataCreditos[0].serie_doc.toUpperCase()}-${DataCreditos[0].numero_doc}`}</span>
                            <span style={{marginLeft: '30%', textAlign: 'right'}}><label>Telefono:</label> N/A</span>
                        </div>
                    </div> */}

                    <br></br>
                    <table className='w-85 mx-auto table table-striped' >
                        <thead>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>totalCredito</th>
                            <th>descripcion</th>
                            <th>abono</th>
                            <th>saldo</th>
                        </thead>
                        <tbody>
                            {DataCreditos.map((item, i)=>{
                                {
                                    total = (total + item.saldo)
                                    let datosFecha = item.fechaEgreso.split("-")
                                    fecha = `${datosFecha[2]}/${datosFecha[1]}/${datosFecha[0]}`
                                }
                                return(
                                    <tr>
                                        <td>{fecha}</td>
                                        <td>{item.cliente}</td>
                                        <td>{numeroAQuetzales(item.totalCredito)}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{numeroAQuetzales(item.abono)}</td>
                                        <td>{numeroAQuetzales(item.saldo)}</td>
                                    </tr>
                                )      
                            })
                            }
                        </tbody>
                    </table>

                    <div>
                        <span style={{marginLeft: '65%', textAlign: 'right'}}><label>Total: </label> {numeroAQuetzales(total)}</span>
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Inventario
