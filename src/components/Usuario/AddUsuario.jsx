import axios from "axios";
import React, { useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";


const baseUrl = process.env.REACT_APP_BASE_URL


const dataEstado = [
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const AddUsuario = () => {

  let navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    password: "",
    id_estado: "1"
  })

  // Initialize a boolean state
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { nombre, usuario, password, id_estado } = form;

  const onInputChange = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultado = await axios.post(`${baseUrl}/Usuario/`, form);

      if (resultado) {
        mesajeResultado('Usuario creado con exito!', 'success');
        navigate("/tblUsuario");
      } else {
        mesajeResultado('Ocurrio un error al intentar crear el Usuario!', 'warning');
      }
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde', 'warning');
    }

    navigate("/tblUsuario");

  };

  // await axios.post(`${baseUrl}/Usuario`, Usuario);
  // alert("Datos Guardados Exitosamente")
  // navigate("/tblUsuario");

  const mesajeResultado = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
  }

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
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Agregar usuario</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre</label>
              <input
                className={clsx(
                  'form-control',
                  'formField',
                  errors.nombre.dirty && errors.nombre.error && 'formFieldError'
                )}
                type={"text"}
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
            <div className="mb-3">
              <label htmlFor="Usuario" className="form-label">Usuario(*)</label>
              <input
                className={clsx(
                  'form-control',
                  'formField',
                  errors.usuario.dirty && errors.usuario.error && 'formFieldError'
                )}
                type={"text"}
                name="usuario"
                value={usuario}
                onChange={(e) => onInputChange(e)}
                onBlur={onBlurField}
                required
              />
              {errors.usuario.dirty && errors.usuario.error ? (
                <p className="formFieldErrorMessage">{errors.usuario.message}</p>
              ) : null}

            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="password">Password(*):</label>
                  <input
                    className={clsx(
                      'form-control',
                      'formField',
                      errors.password.dirty && errors.password.error && 'formFieldError'
                    )}
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => onInputChange(e)}
                    onBlur={onBlurField}
                    required
                  />
                  {errors.password.dirty && errors.password.error ? (
                    <p className="formFieldErrorMessage">{errors.password.message}</p>
                  ) : null}


                </div>
              </div>
              <div className="col">

                <i className="mt-5 fa fa-eye" aria-hidden="true" onClick={togglePassword}>ver</i>

              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="id_estado">Estado(*):</label>
              <select id="id_estado" name="id_estado" className="form-select appSelect" onChange={handleChange}>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.id} >{option.estado}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">Guardar Usuario</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblUsuario">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUsuario