
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPermisosUsuario } from "../../Servicios/oauth"
import { getPermisos } from "../../Servicios/oauth"
import { addUsuarioPermiso } from "../../Servicios/oauth"
import { delUsuarioPermiso } from "../../Servicios/oauth"
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";
import { PeticionGet, PeticionPost } from '../../Servicios/PeticionServicio';

const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  // { id: -1, estado: 'Seleccione una opcion' },
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const EditUsuario = () => {
  let navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledPermiso, setIsDisabledPermiso] = useState(false);
  const { idUsuario } = useParams()
  const [sucursal, setSucursal] = useState([])
  const [usuariopermiso, setUsuarioPermiso] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [usrpermiso, setUsrpermiso] = useState({
    usuario: {
      id: idUsuario
    },
    permiso: {
      id: 0
    },
    estado: 1
  });
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    password: "",
    usuario: "",
    sucursal: {id: 0}
  })

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { id, nombre, usuario, password, estado } = form;

  // Initialize a boolean state
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  const onInputChange = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarUsuario();
    cargarSucursal();
    getPermisos().then(
      data => {
        setPermisos(data.data);
      }
    )
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      setForm({ ...form, ["id"]: idUsuario });
      const response = await axios.put(`${baseUrl}/Usuario/`, form);

      if (response) {
        mesajeResultado('Se actualizo existosamente la usuario!', 'success');
        navigate("/tblUsuario");
      } else {
        setIsDisabled(false);
        mesajeResultado('Ocurrio un error al intentar actualizar la usuario!', 'warning');
      }
    } catch (error) {
      setIsDisabled(false);
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
    }

  };

  const cargarSucursal = async () => {
    const response = await PeticionGet('Sucursal/all');

    if(response) {
      setSucursal(response.data.data);
    }
  }

  const cargarUsuario = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Usuario/id/${idUsuario}`)
      setForm(response.data.data[0])
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar los datos del usuario, intenta mas tarde.', 'warning')
    }

    getPermisosUsuario(idUsuario).then(
      data => {
        if (data.id < 0)
          this.mesajeResultado('No tiene perfil asignado en el sistema.', 'warning');
        if (data.id > 0) {
          //console.log(data.data);
          let menu = [];
          data.data.map((item) => {
            item.permiso.idUsuarioPermiso = item.id;
            menu.push(item.permiso)
          });
          setUsuarioPermiso(menu);
        }
      }
    )

  }

  const handleChange = event => {
    if(event.target.name === 'sucursal'){
      setForm({ ...form, [event.target.name]: { id: parseInt(event.target.value) } });
    } else{
      setForm({ ...form, ["estado"]: event.target.value });
    }
  };
  const mesajeResultado = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
  }

  const handleChangePermiso = (item) => {
    const setUsrpermisoCP = { ...usrpermiso };
    setUsrpermisoCP.permiso.id = item.target.value;
    setUsrpermiso(setUsrpermisoCP);
  }

  const handleAddPermiso = () => {
    const result = usuariopermiso.find(({ id }) => id == usrpermiso.permiso.id);
    if (result) return mesajeResultado('Permiso ya agregado', 'warning');
    addUsuarioPermiso(usrpermiso).then(
      data => {
        if (data.id > 0)
          mesajeResultado('Permiso agregado exitosamente!', 'success');
        else
          mesajeResultado('Problemas al asignar el mermiso', 'warning');
      }
    )
  }

  const handleDelUsuarioPermiso = (e, item) => {
    e.preventDefault();
    setIsDisabledPermiso(true);
    delUsuarioPermiso(item.idUsuarioPermiso).then(
      data => {
        if (data.id > 0) {
          setIsDisabledPermiso(false);
          mesajeResultado('Permiso anulado exitosamente!', 'success');
        } else {
          setIsDisabledPermiso(false);
          mesajeResultado('Error al anular el permiso', 'warning');
        }
      }
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
          <h2 className="text-center m-4">Editar usuario...</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre(*)</label>
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
              <label htmlFor="Usuario" className="form-label">Usuario</label>
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
                  <label htmlFor="no_documento">Password(*):</label>
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
              <select 
                value={form.estado}
                id="estado" 
                name="estado" 
                className="form-select appSelect" 
                onChange={handleChange}>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.id} >{option.estado}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="sucursal">Sucursal(*):</label>
              <select 
              value={form.sucursal.id}
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

          <hr />
          <div className="mb-3">
            <label htmlFor="id_permiso">Permisos:</label>
            <select 
              id="id_permiso" 
              name="id_permiso" 
              className="form-select appSelect" 
              onChange={handleChangePermiso}>
              {permisos.map((option) => (
                <option key={option.id} value={option.id} >{option.nombre}</option>
              ))}
            </select>
          </div>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleAddPermiso}>Agregar permiso</button>
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Permiso</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                usuariopermiso.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={isDisabledPermiso}
                        onClick={(e) => handleDelUsuarioPermiso(e, item)}
                      >
                        <i className='fa fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditUsuario