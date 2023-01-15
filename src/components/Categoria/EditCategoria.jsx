import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";

const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const EditCategoria = () => {

  let navigate = useNavigate();

  const { id } = useParams()

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    condicion: "",
  })

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { nombre, descripcion, condicion } = form;

  const onInputChange = (e) => {
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

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarcategoria()
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/categoria`, form);
      if (response) {
        mesajeResultado('Se actualizo existosamente la categoria!', 'success');
      } else {
        mesajeResultado('Ocurrio un error al intentar actualizar la categoria!', 'warning');
      }
    }catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
    }
    navigate("/tblCategoria");
  };


  const cargarcategoria = async () => {
    const response = await axios.get(`${baseUrl}/categoria/${id}`)
    setForm(response.data.data[0])
    
  }
  const handleChange = event => {
    setForm({ ...form, ["condicion"]: event.target.value  });
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
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar categoria</h2>
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
              <label htmlFor="Descripcion" className="form-label">Descripcion</label>
              <input 
                className={clsx(
                  'form-control',
                  'formField',
                  errors.descripcion.dirty && errors.descripcion.error && 'formFieldError'
                )}
                type={"text"} 
                name="descripcion" 
                value={descripcion} 
                onChange={(e) => onInputChange(e)} 
                onBlur={onBlurField}
                required
              />
              {errors.descripcion.dirty && errors.descripcion.error ? (
                <p className="formFieldErrorMessage">{errors.descripcion.message}</p>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="categoria">Estado(*):</label>
              <select 
                value={form.condicion}
                id="categoria" nombre="categoria" className="form-select appSelect" onChange={handleChange}>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.id} >{option.estado}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">Guardar</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblCategoria">Cancelar</Link>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCategoria