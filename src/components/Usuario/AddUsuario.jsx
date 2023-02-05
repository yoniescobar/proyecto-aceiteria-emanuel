import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css";
import clsx from "clsx";
import { PeticionGet, PeticionPost } from '../../Servicios/PeticionServicio';

const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const AddUsuario = () => {
  useEffect(() => {
    cargarSucursal();
  }, []);

  let navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [sucursal, setSucursal] = useState([])
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    password: "",
    estado: "1",
    sucursal: {id: 0}
  })

  // Initialize a boolean state
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { nombre, usuario, password, estado, sucursal: {id } } = form;

  const onInputChange = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  const handleChange = event => {
    if(event.target.name === 'sucursal'){
      setForm({ ...form, [event.target.name]: { id: parseInt(event.target.value) } });
    } else{
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const resultado = await axios.post(`${baseUrl}/Usuario/`, form);

      if (resultado) {
        mesajeResultado('Usuario creado con exito!', 'success');
        navigate("/tblUsuario");
      } else {
        setIsDisabled(false);
        mesajeResultado('Ocurrio un error al intentar crear el Usuario!', 'warning');
      }
    } catch (error) {
      setIsDisabled(false);
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde', 'warning');
    }

    navigate("/tblUsuario");
  };

  const cargarSucursal = async () => {
    const response = await PeticionGet('Sucursal/all');
    if(response) {
      setSucursal(response.data.data);
    }
  }

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
              <label htmlFor="estado">Estado(*):</label>
              <select id="estado" name="estado" className="form-select appSelect" onChange={handleChange}>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.id} >{option.estado}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="sucursal">Sucursal(*):</label>
              <select 
                className={clsx(
                  'form-select',
                  'appSelect',
                  errors.sucursal.dirty && errors.sucursal.error && 'formFieldError'
                )}
                id="sucursal" 
                name="sucursal"
                onChange={handleChange}
                onBlur={onBlurField}
                required
                >
                <option value="" >Seleccione una opcion</option>
                {sucursal.map((option) => (
                  <option key={option.id} value={option.id} >{option.nombre}</option>
                ))}
              </select>
              {errors.sucursal.dirty && errors.sucursal.error ? (
                  <p className="formFieldErrorMessage">{errors.sucursal.message}</p>
                ) : null}
            </div>

            <button type="submit" disabled={isDisabled} className="btn btn-outline-primary">Guardar Usuario</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblUsuario">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUsuario