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
        idCredito: 0,
        fechaEgreso: "",
        serie_doc: "",
        numero_doc: "",
        cliente: "",
        idCliente: 0,
        items: [{
            id:"",
            cantidad: 0,
            precio_venta: 0,
            articulo:{ nombre:""}
        }]
    }])

    const armarData = (data) => {
        let clienteEncontrado = false;
        
        for (let credito of data) {
            var itemCredito = {
                idCredito: credito.id,
                fechaEgreso: credito.fechaegreso,
                cliente: credito.persona.nombre,
                idCliente: 0,
                totalCredito: credito.total_egreso,
                descripcion: "",
                abono: 0,
                saldo: 0
            }

            // Si no tiene abonos, su saldo es igual al total de credito
            if (credito.pagos.length == 0) {
                itemCredito.saldo = itemCredito.totalCredito;
                creditos.push(itemCredito);
            }

            // Se recorren los pagos realizados
            for (let pago of credito.pagos) {
                itemCredito.abono += pago.abono;
                itemCredito.saldo = pago.saldo;
            }       
            creditos.push(itemCredito);     
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
                    <h1 style={{ textAlign: 'center' }}>Aceitera Emanuel</h1>
                    <br></br>
                    <p>Nit: 454832666</p>
                    <p>Tel: 4556-5645</p>
                </div>
                <table className='w-75 mx-auto table table-striped pb-5' >
                    <thead>
                        <th>Fecha</th>
                        <th>No. CRedito</th>
                        <th>Cliente</th>
                        <th>Total credito</th>
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
                                    <td>{item.idCredito}</td>
                                    <td>{item.cliente}</td>
                                    <td>{numeroAQuetzales(item.totalCredito)}</td>
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