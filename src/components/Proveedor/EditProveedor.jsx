import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PeticionGet, PeticionPut } from '../../Servicios/PeticionServicio'
import { ListaTipoDocumento, ListaEstado } from '../../Constantes/ListasSelect'
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditProveedor = () => {
  let navigate = useNavigate();

  const { idProveedor } = useParams()

  const [form, setForm] = useState({
    id: "",
    tipopersona: 2,
    tipo_documento: 0,
    nodocumento: "",
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    estado: 0
  })

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { id, tipopersona, tipo_documento, nodocumento, nombre, direccion, telefono, correo, estado } = form;

  const onInputChange = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarProveedor()
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setForm({ ...form, ["id"]: idProveedor });
    const resultado = await PeticionPut('Persona/', form);

    if (resultado) {
      navigate("/tblProveedor");
    }
  };

  const cargarProveedor = async () => {
    const response = await PeticionGet(`Persona/id/${idProveedor}`);
    
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
        <h2 className="text-center m-4">Editar proveedor</h2>
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
                <label htmlFor="direccion">Direccion:</label>
                <input
                    className={clsx(
                        'form-control',
                        'formField'
                    )}
                    type="text"
                    name="direccion"
                    id="direccion"
                    value={direccion}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="telefono">Telefono:</label>
                <input
                    className={clsx(
                        'form-control',
                        'formField'
                    )}
                    type="number"
                    name="telefono"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="correo">Correo:</label>
                <input
                    className={clsx(
                        'form-control',
                        'formField'
                    )}
                    type="text"
                    name="correo"
                    id="correo"
                    value={correo} onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="tipo_documento">Estado(*):</label>
                <select 
                  value={form.estado}
                  id="tipo_documento" 
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
            <Link className="btn btn-outline-danger mx-2" to="/tblProveedor">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProveedor