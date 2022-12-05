import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ListaEstado } from '../../Constantes/ListasSelect';
import { PeticionGet, PeticionPut } from '../../Servicios/PeticionServicio'

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

        setPresentacion({ ...Presentacion, ["id"]: idPresentacion });
        const resultado = await PeticionPut('Presentacion/', Presentacion);
    
        if (resultado) {
            navigate("/tblPresentacion");
        }
    };

    const cargarPresentacion = async () => {
        const response = await PeticionGet(`Presentacion/id/${idPresentacion}`);

        if (response) {
            setPresentacion(response.data.data[0])
        }
    }

    const handleChange = event => {
        setPresentacion({ ...Presentacion, [event.target.name]: parseInt(event.target.value) });
    };

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

export default EditPresentacion