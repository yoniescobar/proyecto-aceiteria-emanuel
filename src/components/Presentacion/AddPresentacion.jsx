import axios from "axios"
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom"

const baseUrl = process.env.REACT_APP_BASE_URL

const AddPresentacion = () => {
    let navigate = useNavigate();
    const [Presentacion, setPresentacion] = useState({
        presentacion: "",
        descripcion: "",
        estado: ""
    })

    const { descripcion, presentacion, estado } = Presentacion;

    const onInputChange = (e) => {
        setPresentacion({ ...Presentacion, [e.target.name]: e.target.value });
    };

    const handleChange = event => {
        setPresentacion({ ...Presentacion, [event.target.name]: parseInt(event.target.value) });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const resultado = await axios.post(`${baseUrl}/Presentacion/`, Presentacion);

            if (resultado) {
                mesajeResultado('Presentacion creado con exito!', 'success');
            } else {
                mesajeResultado('Ocurrio un error al intentar crear el Presentacion!', 'warning');
            }

            navigate("/tblPresentacion");
        } catch (error) {
            mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
        }
    };

    const mesajeResultado = (mensaje, clase) => {
        Swal.fire(
            mensaje,
            '',
            clase
        )
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h2 className="text-center m-4">Registro de Presentacion</h2>
                <div className="col-12 col-lg-9">
                    <section className />
                    <div className="clas " />
                    <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-row mb-4">

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="presentacion">Presentacion(*):</label>
                                <input type="text" name="presentacion" id="presentacion" className="form-control"
                                    value={presentacion} onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="descripcion">Descripcion(*):</label>
                                <input type="text" name="descripcion" id="descripcion" className="form-control"
                                    value={descripcion} onChange={(e) => onInputChange(e)} />
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="estado">Estado(*):</label>
                                <select id="estado" name="estado" className="form-select appSelect" onChange={handleChange}>
                                    {ListaEstado.map((option) => (
                                        <option key={option.id} value={option.id} >{option.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        <Link className="btn btn-outline-danger mx-2" to="/tblPresentacion">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

const ListaEstado = [
    { id: -1, nombre: 'Seleccione una opcion' },
    { id: 1, nombre: 'Activo' },
    { id: 2, nombre: 'No activo' }
];

export default AddPresentacion