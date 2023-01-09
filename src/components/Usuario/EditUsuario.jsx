
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

const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  // { id: -1, estado: 'Seleccione una opcion' },
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const EditUsuario = () => {
  let navigate = useNavigate();

  const { idUsuario } = useParams()
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
    id_estado: ""
  })

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { id, nombre, usuario, password, id_estado } = form;

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

    getPermisos().then(
      data => {
        setPermisos(data.data);
      }
    )
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setForm({ ...form, ["id"]: idUsuario });
      const response = await axios.put(`${baseUrl}/Usuario/`, form);

      if (response) {
        mesajeResultado('Se actualizo existosamente la usuario!', 'success');
      } else {
        mesajeResultado('Ocurrio un error al intentar actualizar la usuario!', 'warning');
      }

      navigate("/tblUsuario");
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
    }

  };


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
    setForm({ ...form, ["id_estado"]: event.target.value });
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
    delUsuarioPermiso(item.idUsuarioPermiso).then(
      data => {
        if (data.id > 0) {
          mesajeResultado('Permiso anulado exitosamente!', 'success');
        } else {
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
          <hr />
          <div className="mb-3">
            <label htmlFor="id_permiso">Permisos:</label>
            <select id="id_permiso" name="id_permiso" className="form-select appSelect" onChange={handleChangePermiso}>
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