import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useEffect, useState } from 'react'
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const dataEstado = [
    { id: 1, estado: "Sucursal 1" },
    { id: 2, estado: "Sucursal 2" },
  ]

const baseUrl = process.env.REACT_APP_BASE_URL

const ReporteVenta = () => {
    const [fechaInicial, setfechaInicial] = useState(new Date());;
    const [fechaFinal, setfechaFinal] = useState(new Date());;
    const [categoria, setcategoria] = useState({
        nombre: "",
        descripcion: "",
        condicion:""
      })
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Listado de Categoria',
        //onAfterPrint:()=>alert('Print success')
    })

    const [Categoria, setCategoria] = useState([])

    const cargarCategoria = async () => {
        const response = await axios.get(`${baseUrl}/all`)
        setCategoria(response.data.data)
    

    }

    const handleChange = event => {
        setcategoria({ ...categoria, ["condicion"]: event.target.value  });
      };

    useEffect(() => {
        cargarCategoria();
    }, []);


    return (
        <>
            <h1 className='py-4 d-flex justify-content-center'>Generar reporte personalizado.</h1>
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
                                // placeholderText="dd/mm/aaaa"
                                //  value="fechaFinal"
                                selected={fechaFinal}
                                onChange={date => setfechaFinal(date)}
                            />
                        </div>
                    </div>
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <label>Sucursal </label> <br />
                            <div className="mb-3">
          
              <select id="categoria" nombre="categoria" className="form-select appSelect" onChange={handleChange}>
                <option value="-1">Seleccione una opcion</option>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.estado} >{option.estado}</option>
                ))}
              </select>
            </div>
                        </div>
                    </div>
                    <div className="col-sm d-flex justify-content-center">
                        <div className="grupo">
                            <h1 className="text-center my-3  py-2 ">
                                <Link className="btn btn-sm btn-outline-primary px-3 m-2" to="/ReporteVentaPdf" >Generar Reporte</Link>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ReporteVenta