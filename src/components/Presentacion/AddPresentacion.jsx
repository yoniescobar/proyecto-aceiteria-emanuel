import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { PeticionPost } from '../../Servicios/PeticionServicio'
import { ListaEstado } from '../../Constantes/ListasSelect'

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

        const resultado = await PeticionPost('Presentacion', Presentacion);

        if (resultado) {
            navigate("/tblPresentacion");
        }
    };

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
                                <label htmlFor="descripcion">Descripcion(*):</label>
                                <input type="text" name="descripcion" id="descripcion" className="form-control"
                                    value={descripcion} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="presentacion">Presentacion(*):</label>
                                <input type="text" name="presentacion" id="presentacion" className="form-control"
                                    value={presentacion} onChange={(e) => onInputChange(e)} />
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

export default AddPresentacion