
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  { id: -1, estado: 'Seleccione una opcion' },
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const EditUsuario = () => {
  let navigate = useNavigate();

  const { idUsuario } = useParams()

  const [Usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    password: "",
    usuario: "",
    id_estado: ""
  })

  const { id, nombre, usuario, password, id_estado } = Usuario;

  // Initialize a boolean state
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  const onInputChange = (e) => {
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarUsuario()
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setUsuario({ ...Usuario, ["id"]: idUsuario });
      const response = await axios.put(`${baseUrl}/Usuario/`, Usuario);

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
      setUsuario(response.data.data[0])

    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar los datos del usuario, intenta mas tarde.', 'warning')
    }
  }

  const handleChange = event => {
    setUsuario({ ...Usuario, ["id_estado"]: event.target.value });
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
          <h2 className="text-center m-4">Editar usuario...</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre(*)</label>
              <input type={"text"} className="form-control"
                name="nombre" value={nombre} onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Usuario" className="form-label">Usuario</label>
              <input type={"text"} className="form-control"
                name="usuario" value={usuario} onChange={(e) => onInputChange(e)} />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="no_documento">Password(*):</label>
                  <input type={passwordShow ? "text" : "password"} className="form-control"
                    name="password" value={password} onChange={(e) => onInputChange(e)}
                  />

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

export default EditUsuario