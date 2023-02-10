import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import Swal from 'sweetalert2'
import clsx from "clsx";
const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const AddCategoria = props => {

  let navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    condicion: 1
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

  const handleChange = event => {
    setForm({ ...form, ["condicion"]: event.target.value  });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsDisabled(true);
      const resultado = await axios.post(`${baseUrl}/categoria`, form);
      if(resultado){
        mesajeResultado('Categoria creado con exito!', 'success');
        navigate("/categoria");
      }else{
        setIsDisabled(false);
        mesajeResultado('Ocurrio un error al intentar crear la Categoria!', 'warning');
      }
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde', 'warning');
    }

    navigate("/tblCategoria");
    
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
          <h2 className="text-center m-4">Registro de categoria</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3" >
              <label htmlFor="Nombre" className="form-label">Nombre</label>
              <input 
                className={clsx(
                  'form-control',
                  'formField',
                  errors.nombre.dirty && errors.nombre.error && 'formFieldError'
                )}
                type={"text"} 
                placeholder="Nombre categoria"
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
                placeholder="Descripcion producto"
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
              <select id="categoria" nombre="categoria" className="form-select appSelect" onChange={handleChange}>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.estado} >{option.estado}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" disabled={isDisabled} className="btn btn-outline-primary">Guardar</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblCategoria">Cancelar</Link>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategoria