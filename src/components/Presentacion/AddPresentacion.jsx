import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { PeticionPost } from '../../Servicios/PeticionServicio'
import { ListaEstado } from '../../Constantes/ListasSelect'
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";

const AddPresentacion = () => {
    let navigate = useNavigate();
    const [form, setForm] = useState({
        presentacion: "",
        descripcion: "",
        estado: 1
    })

    const { errors, validateForm, onBlurField } = useValidatorForm(form);
    const { descripcion, presentacion, estado } = form;

    const onInputChange = (e) => {
        validarInputForm(e)
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const resultado = await PeticionPost('Presentacion', form);

        if (resultado) {
            navigate("/tblPresentacion");
        }
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
                <h2 className="text-center m-4">Registro de Presentacion</h2>
                <div className="col-12 col-lg-9">
                    <section className />
                    <div className="clas " />
                    <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-row mb-4">
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