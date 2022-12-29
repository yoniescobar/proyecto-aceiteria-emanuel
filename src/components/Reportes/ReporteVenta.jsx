import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ListaSucursal } from '../../Constantes/ListasSelect'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { PeticionGet } from '../../Servicios/PeticionServicio'
import es from 'date-fns/locale/es';
import numeroAQuetzales from "../../utils/util"

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
    const [sucursal, setSucursal] = useState([])

    const armarDataEgreso = (data) => {
        console.log(data);
        let articuloEncontrado = false;

        for (let venta of data) {
            var itemEgreso = {
                fechaEgreso: venta.fechaegreso,
                idArticulo: 0,
                nombreArticulo: "",
                cantidad: 0,
                precioCompra: 0,
                precioVenta: 0
            }

            for (let detalleVenta of venta.items) {
                if ((datosEgreso.length > 0) && datosEgreso.find(x => x.fechaEgreso === venta.fechaegreso && x.idArticulo === detalleVenta.articulo.id)) {
                    itemEgreso = datosEgreso.find(x => x.fechaEgreso === venta.fechaegreso && x.idArticulo === detalleVenta.articulo.id);
                    console.log(itemEgreso);
                    itemEgreso.cantidad = itemEgreso.cantidad + detalleVenta.cantidad;
                    itemEgreso.precioVenta = (detalleVenta.cantidad * detalleVenta.precio_venta) + itemEgreso.precioVenta;
                    articuloEncontrado = true;
                }

                if (!articuloEncontrado) {
                    itemEgreso.idArticulo = detalleVenta.articulo.id;
                    itemEgreso.nombreArticulo = detalleVenta.articulo.nombre;
                    itemEgreso.cantidad = detalleVenta.cantidad;
                    itemEgreso.precioCompra = detalleVenta.articulo.precio_compra;
                    itemEgreso.precioVenta = detalleVenta.cantidad * detalleVenta.precio_venta;

                    datosEgreso.push(itemEgreso);
                }
            }            
        }

        setEgreso(datosEgreso);
    }

    const cargarEgreso = async () => {
        const response = await PeticionGet('Egreso/estado/1/tipoComprobante/1/egresosFechaActual');
        armarDataEgreso(response.data.data);
    }

    const FiltrarEgreso = async () => {
        let fechaInicio = fechaInicial.getFullYear() + '-' + (fechaInicial.getMonth() + 1) + '-' + fechaInicial.getDate();
        let fechaFin = fechaFinal.getFullYear() + '-' + (fechaFinal.getMonth() + 1) + '-' + fechaFinal.getDate();

        //const response = await PeticionGet('Egreso/estado/1/tipoComprobante/1/fechaInicio/2022-12-27/fechaFin/2022-12-29');
        const response = await PeticionGet(`Egreso/estado/1/tipoComprobante/1/fechaInicio/${fechaInicio}/fechaFin/${fechaFin}`);
        armarDataEgreso(response.data.data);
    }

    const handleChange = event => {
        setSucursal({ ...sucursal, ["condicion"]: event.target.value });
    };

    useEffect(() => {
        cargarEgreso();
    }, []);

    return (
        <>
            <div className="bg-white w-75 mx-auto table table-striped">
                <div className="row">
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <label>Fecha inicial </label> <br />
                            <DatePicker
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                selected={fechaInicial}
                                onChange={date => setfechaInicial(date)}
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
                            />
                        </div>
                    </div>
                    {/* <div className="col-sm d-flex justify-content-center">
                        <div className="grupo" >
                            <label>Sucursal </label> <br />
                            <div className="mb-3">

                                <select id="sucursal" nombre="sucursal" className="form-select appSelect" onChange={handleChange}>
                                    <option value="-1">Seleccione una opcion</option>
                                    {ListaSucursal.map((option) => (
                                        <option key={option.id} value={option.nombre} >{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <h1 className="text-center my-3  py-2 ">
                            <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={FiltrarEgreso}>Filtrar</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary px-3 m-2" onClick={handlePrint}>Imprimir</button>
                                {/* <Link className="btn btn-sm btn-outline-primary px-3 m-2" to="/ReporteVentaPdf" >Generar Reporte</Link> */}
                            </h1>
                        </div>
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
                        <th>Articulo</th>
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