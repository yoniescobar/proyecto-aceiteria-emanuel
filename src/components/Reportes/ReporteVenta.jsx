import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ListaSucursal, ListaTipoCredito } from '../../Constantes/ListasSelect'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { PeticionGet } from '../../Servicios/PeticionServicio'
import es from 'date-fns/locale/es';
import numeroAQuetzales from "../../utils/util"
import clsx from "clsx";

registerLocale('es', es)

const ReporteVenta = () => {
    const [fechaInicial, setfechaInicial] = useState(new Date());
    const [fechaFinal, setfechaFinal] = useState(new Date());

    let datosEgreso = new Array();
    let total = 0;
    let fecha = '';
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Ventas',
        //onAfterPrint:()=>alert('Print success')
    })

    const [Egreso, setEgreso] = useState([])
    const [filtroSelect, setFiltroSelect] = useState({
        sucursal: 1,
        tipoCredito: 1,
    })

    const armarDataEgreso = (data) => {
        let idGenerado = 0;

        for (let venta of data) {
            let articuloEncontrado = false;
            var itemEgreso = {
                idItem: idGenerado,
                idEgreso: venta.id,
                fechaEgreso: venta.fechaegreso,
                tipopago: venta.tipopago,
                idArticulo: 0,
                nombreArticulo: "",
                cantidad: 0,
                precioCompra: 0,
                precioVenta: 0,
                tipoPagoDescripcion: venta.tipopago === 1 ? 'Contado' : 'Credito'
            }

            for (let detalleVenta of venta.items) {

                itemEgreso.idArticulo = detalleVenta.articulo.id;
                itemEgreso.nombreArticulo = detalleVenta.articulo.nombre;
                itemEgreso.cantidad = detalleVenta.cantidad;
                itemEgreso.precioCompra = detalleVenta.articulo.precio_compra;
                itemEgreso.precioVenta = detalleVenta.cantidad * detalleVenta.precio_venta;

                if ((datosEgreso.length > 0) && datosEgreso.find(x => x.fechaEgreso === venta.fechaegreso && x.idArticulo === detalleVenta.articulo.id && x.tipopago === itemEgreso.tipopago)) {
                    var itemEncontrado = datosEgreso.find(x => x.fechaEgreso === venta.fechaegreso && x.idArticulo === detalleVenta.articulo.id && x.tipopago === itemEgreso.tipopago);
                    itemEgreso.cantidad = itemEgreso.cantidad + itemEncontrado.cantidad;
                    itemEgreso.precioVenta = (itemEgreso.cantidad * itemEgreso.precioVenta);
                    itemEgreso.idEgreso = itemEgreso.idEgreso + ',' + itemEncontrado.idEgreso;

                    const index = datosEgreso.findIndex((x) => x.idItem === itemEncontrado.idItem);
                    datosEgreso[index] = itemEgreso
                    articuloEncontrado = true;
                }

                if(!articuloEncontrado) {
                    datosEgreso.push(itemEgreso);
                }
            }   
            
            idGenerado++;
        }
        
        setEgreso(datosEgreso.filter(x => x.tipopago === parseInt(filtroSelect.tipoCredito)));
    }

    const cargarEgreso = async () => {
        const response = await PeticionGet('Egreso/estado/1/tipoComprobante/1/sucursal/1/egresosFechaActual');
        armarDataEgreso(response.data.data);
    }

    const FiltrarEgreso = async () => {
        let fechaInicio = fechaInicial.getFullYear() + '-' + (fechaInicial.getMonth() + 1) + '-' + fechaInicial.getDate();
        let fechaFin = fechaFinal.getFullYear() + '-' + (fechaFinal.getMonth() + 1) + '-' + fechaFinal.getDate();

        const response = await PeticionGet(`Egreso/estado/1/tipoComprobante/1/fechaInicio/${fechaInicio}/fechaFin/${fechaFin}/sucursal/${filtroSelect.sucursal}`);
        armarDataEgreso(response.data.data);
    }

    const handleChange = event => {
        setFiltroSelect({ ...filtroSelect, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        cargarEgreso();
    }, []);

    return (
        <>
            <div className="w-75 mx-auto">
                <div className="row">
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <label>Fecha inicial </label> <br />
                            <DatePicker
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                selected={fechaInicial}
                                onChange={date => setfechaInicial(date)}
                                className={clsx(
                                    'form-control',
                                    'formField'
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <label>Fecha final </label> <br />
                            <DatePicker
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                selected={fechaFinal}
                                onChange={date => setfechaFinal(date)}
                                className={clsx(
                                    'form-control',
                                    'formField'
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo" >
                            <label>Tipo Pago </label> <br />
                            <div className="mb-3">
                                <select id="tipoCredito" name="tipoCredito" nombre="tipoCredito" className="form-select appSelect" onChange={handleChange}>
                                    {ListaTipoCredito.map((option) => (
                                        <option key={option.id} value={option.id} >{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo" >
                            <label>Sucursal </label> <br />
                            <div className="mb-3">
                                <select id="sucursal" name="sucursal" nombre="sucursal" className="form-select appSelect" onChange={handleChange}>
                                    {ListaSucursal.map((option) => (
                                        <option key={option.id} value={option.id} >{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <h1 className="text-center">
                            <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={FiltrarEgreso}>Filtrar</button>
                            </h1>
                        </div>

                        <div className="grupo">
                            <h1 className="text-center">
                            <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                            </h1>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>

            <div ref={componentRef} style={{margin: '5%', margin: '5%', marginTop: '2%', marginRight: '5%', marginBottom: '5%', marginLeft: '5%'}}>
                <div className="w-75 mx-auto" style={{ textAlign: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Aceitera Emanuel</h1>
                    <br></br>
                    <p>Nit: 454832666</p>
                    <p>Tel: 4556-5645</p>
                </div>
                <table className='w-75 mx-auto table table-striped pb-5' >
                    <thead>
                        <th>Fecha</th>
                        <th>Articulo</th>
                        <th>Tipo pago</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </thead>
                    <tbody>
                        {Egreso.map((item, i) => {
                            {
                                total = (total + item.precioVenta)
                                let datosFecha = item.fechaEgreso.split("-")
                                fecha = `${datosFecha[2]}/${datosFecha[1]}/${datosFecha[0]}`
                            }
                            return (
                                <tr>
                                    <td>{fecha}</td>
                                    <td>{item.nombreArticulo}</td>
                                    <td>{item.tipoPagoDescripcion}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{numeroAQuetzales(item.precioVenta)}</td>
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

export default ReporteVenta