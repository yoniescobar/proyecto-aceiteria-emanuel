import axios from "axios";
import React, { useState } from "react";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const AddUsuario = () => {
  
  let navigate = useNavigate();

  const [Usuario, setUsuario] = useState({
    nombre: "",
    usuario: "",
    password: "",
    id_estado: ""
  })

  // Initialize a boolean state
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  const { nombre, usuario, password, id_estado } = Usuario;

  const onInputChange = (e) => {
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  const handleChange = event => {
    setUsuario({ ...Usuario, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultado = await axios.post(`${baseUrl}/Usuario/`, Usuario);
      if(resultado){
        mesajeResultado('Usuario creado con exito!', 'success');
        navigate("/tblUsuario");
      }else{
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


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Agregar usuario</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre</label>
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
                <option value="-1">Seleccione una opcion</option>
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