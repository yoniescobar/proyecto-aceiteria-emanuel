import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { PeticionPost } from '../../Servicios/PeticionServicio'
import { ListaTipoDocumento, ListaEstado } from '../../Constantes/ListasSelect'
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";

const AddProveedor = () => {
    let navigate = useNavigate();
    const [form, setForm] = useState({
        tipopersona: 2,
        tipo_documento: 0,
        nodocumento: "",
        nombre: "",
        direccion: "",
        telefono: "",
        correo: "",
        estado: 1
    })


    const { errors, validateForm, onBlurField } = useValidatorForm(form);
    const { tipopersona, tipo_documento, nodocumento, nombre, direccion, telefono, correo } = form;

    const onInputChange = (e) => {
        validarInputForm(e);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChange = event => {
        setForm({ ...form, [event.target.name]: parseInt(event.target.value) });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const resultado = await PeticionPost('Persona', form);

        if (resultado) {
            navigate("/tblProveedor");
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
                <h2 className="text-center m-4">Registro de proveedor</h2>
                <div className="col-12 col-lg-9">
                    <section className />
                    <div className="clas " />
                    <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-row mb-4">
                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="tipo_documento">Tipo de documento(*):</label>
                                <select id="tipo_documento" name="tipo_documento" className="form-select appSelect" onChange={handleChange}>
                                    {ListaTipoDocumento.map((option) => (
                                        <option key={option.id} value={option.id} >{option.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="nodocumento">Numero de documento(*):</label>
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.nodocumento.dirty && errors.nodocumento.error && 'formFieldError'
                                    )}
                                    type="text"
                                    name="nodocumento"
                                    id="nodocumento"
                                    value={nodocumento}
                                    onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                {errors.nodocumento.dirty && errors.nodocumento.error ? (
                                    <p className="formFieldErrorMessage">{errors.nodocumento.message}</p>
                                ) : null}
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="nombre">Nombre(*):</label>
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.nombre.dirty && errors.nombre.error && 'formFieldError'
                                    )}
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                {errors.nombre.dirty && errors.nombre.error ? (
                                    <p className="formFieldErrorMessage">{errors.nombre.message}</p>
                                ) : null}
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="direccion">Direccion(*):</label>
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.direccion.dirty && errors.direccion.error && 'formFieldError'
                                    )}
                                    type="text"
                                    name="direccion"
                                    id="direccion"
                                    value={direccion}
                                    onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                {errors.direccion.dirty && errors.direccion.error ? (
                                    <p className="formFieldErrorMessage">{errors.direccion.message}</p>
                                ) : null}
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="telefono">Telefono(*):</label>
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.telefono.dirty && errors.telefono.error && 'formFieldError'
                                    )}
                                    type="number"
                                    name="telefono"
                                    id="telefono"
                                    value={telefono}
                                    onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                {errors.telefono.dirty && errors.telefono.error ? (
                                    <p className="formFieldErrorMessage">{errors.telefono.message}</p>
                                ) : null}
                            </div>

                            <div className="form-group col-12 col-sm-6">
                                <label htmlFor="correo">Correo(*):</label>
                                <input
                                    className={clsx(
                                        'form-control',
                                        'formField',
                                        errors.telefono.dirty && errors.telefono.error && 'formFieldError'
                                    )}
                                    type="text"
                                    name="correo"
                                    id="correo"
                                    value={correo} onChange={(e) => onInputChange(e)}
                                    onBlur={onBlurField}
                                    required
                                />
                                {errors.telefono.dirty && errors.telefono.error ? (
                                    <p className="formFieldErrorMessage">{errors.telefono.message}</p>
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
                        <Link className="btn btn-outline-danger mx-2" to="/tblProveedor">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProveedor