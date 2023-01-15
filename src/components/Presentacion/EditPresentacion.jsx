import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ListaEstado } from '../../Constantes/ListasSelect';
import { PeticionGet, PeticionPut } from '../../Servicios/PeticionServicio'
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";


const EditPresentacion = () => {
    let navigate = useNavigate();

    const { idPresentacion } = useParams()

    const [form, setForm] = useState({
        id: "",
        presentacion: "",
        descripcion: "",
        estado: 0
    })

    const { errors, validateForm, onBlurField } = useValidatorForm(form);
    const { id, descripcion, presentacion, estado } = form;


    const onInputChange = (e) => {
        validarInputForm(e);
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    useEffect(() => {
        cargarPresentacion()
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        setForm({ ...form, ["id"]: idPresentacion });
        const resultado = await PeticionPut('Presentacion/', form);

        if (resultado) {
            navigate("/tblPresentacion");
        }
    };

    const cargarPresentacion = async () => {
        const response = await PeticionGet(`Presentacion/id/${idPresentacion}`);

        if (response) {
            setForm(response.data.data[0])
        }
    }

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
    };

    const validarInputForm = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };

        setForm(nextFormState);

        if (errors[field].dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            });
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
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.presentacion.dirty && errors.presentacion.error && 'formFieldError'
                                    )}
                                    type="text"
                                    name="presentacion"
                                    id="presentacion"
                                    value={presentacion}
                                    onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                {errors.presentacion.dirty && errors.presentacion.error ? (
                                    <p className="formFieldErrorMessage">{errors.presentacion.message}</p>
                                ) : null}
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="descripcion">Descripcion(*):</label>
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.descripcion.dirty && errors.descripcion.error && 'formFieldError'
                                    )}
                                    type="text"
                                    name="descripcion"
                                    id="descripcion"
                                    value={descripcion}
                                    onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                 {errors.descripcion.dirty && errors.descripcion.error ? (
                                    <p className="formFieldErrorMessage">{errors.descripcion.message}</p>
                                ) : null}
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="estado">Estado(*):</label>
                                <select 
                                    value={form.estado}
                                    id="estado" 
                                    name="estado" 
                                    className="form-select appSelect" 
                                    onChange={handleChange}>
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