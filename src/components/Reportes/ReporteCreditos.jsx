import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { PeticionGet } from '../../Servicios/PeticionServicio'
import es from 'date-fns/locale/es';
import numeroAQuetzales from "../../utils/util"

registerLocale('es', es)

const ReporteCreditos = () => {
    let creditos = new Array();
    let total = 0;
    let fecha = '';
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Ventas',
    })

    const [DataCreditos, setDataCreditos] = useState([{
        fechaEgreso: "",
        serie_doc: "",
        numero_doc: "",
        persona: {nombre:""},
        items: [{
            id:"",
            cantidad: 0,
            precio_venta: 0,
            articulo:{ nombre:""}
        }]
    }])

    const armarData = (data) => {
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

    const cargarCredito = async () => {
        const response = await PeticionGet('Egreso/creditos');
        armarData(response.data.data);
    }

    useEffect(() => {
        cargarCredito();
    }, []);

    return (
        <>
            <div className="mx-auto table table-striped">
                <div className="row">
                    <div className="col-sm d-flex justify-content-center">
                        <button type="button" className="btn btn-sm btn-outline-secondary px-3" onClick={handlePrint}>Imprimir</button>
                    </div>
                </div>
            </div>

            <div ref={componentRef} style={{margin: '5%', margin: '5%', marginTop: '5%', marginRight: '5%', marginBottom: '5%', marginLeft: '5%'}}>
                <div className="w-75 mx-auto" style={{ textAlign: 'center' }}>
                    {/* <h1>Aceitera 1</h1> */}
                    <p>Nit: 454832666</p>
                    <p>Tel: 4556-5645</p>
                </div>
                <table className='w-75 mx-auto table table-striped pb-5' >
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
                                if(datosFecha.length == 3){
                                    fecha = `${datosFecha[2]}/${datosFecha[1]}/${datosFecha[0]}`
                                }
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
        </>
    )
}

export default ReporteCreditos