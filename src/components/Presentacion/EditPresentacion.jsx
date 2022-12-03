import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditPresentacion = () => {
    let navigate = useNavigate();

    const { idPresentacion } = useParams()

    const [Presentacion, setPresentacion] = useState({
        id: "",
        presentacion: "",
        descripcion: ""
    })

    const { id, descripcion, presentacion, estado } = Presentacion;

    const onInputChange = (e) => {
        setPresentacion({ ...Presentacion, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        cargarPresentacion()
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setPresentacion({ ...Presentacion, ["id"]: idPresentacion });
            const resultado = await axios.put(`${baseUrl}/Presentacion/`, Presentacion);

            if (resultado) {
                mesajeResultado('Los datos fueron actualizados con exito!', 'success');
            } else {
                mesajeResultado('Ocurrio un error al intentar actualizar el Presentacion!', 'warning');
            }

            navigate("/tblPresentacion");
        } catch (error) {
            mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
        }
    };

    const cargarPresentacion = async () => {
        try {
            const response = await axios.get(`${baseUrl}/Presentacion/id/${idPresentacion}`)
            setPresentacion(response.data.data[0])
        } catch (error) {
            mesajeResultado('Ocurrio un error al intentar consultar los datos del Presentacion, intenta mas tarde.', 'warning')
        }
    }

    const handleChange = event => {
        setPresentacion({ ...Presentacion, [event.target.name]: parseInt(event.target.value) });
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
                <h2 className="text-center m-4">Editar Presentacion</h2>
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

export default EditPresentacion