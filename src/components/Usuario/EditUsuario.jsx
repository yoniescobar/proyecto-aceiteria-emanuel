
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditUsuario = () => {

  let navigate = useNavigate();

  const { id } = useParams()

  const [Usuario, setUsuario] = useState({
    tipo_persona: "",
    tipo_documento: "",
    nombre: "",
    no_documento: "",
    direccion: "",
    telefono: "",
    correo: "",
  })

   // Initialize a boolean state
   const [passwordShow, setPasswordShow] = useState(false);


   const togglePassword=()=>{
     setPasswordShow(!passwordShow);
   }

  const { nombre, usuario, password, id_estado } = Usuario;

  const onInputChange = (e) => {
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarUsuario()
  }, []);



  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${baseUrl}/Usuario`, Usuario);
    navigate("/tblUsuario");
  };

  const cargarUsuario = async () => {
    const response = await axios.get(`${baseUrl}/usuario/${id}`)
    console.log(response.data.data[0])
    setUsuario(response.data.data[0])
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar usuario</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre</label>
              <input type={"text"}  className="form-control"
                name="nombre" value={nombre} onChange={(e) => onInputChange(e)} 
                />
            </div>
            <div className="mb-3">
              <label htmlFor="Usuario" className="form-label">Usuario</label>
              <input type={"text"} className="form-control"
                name="usuario" value={usuario} onChange={(e) => onInputChange(e)} />
            </div>
            <div className="mb-3">
              <label htmlFor="no_documento">Password(*):</label>
              <input type={passwordShow? "text":"password"}  className="form-control"
                name="password" value={password} onChange={(e) => onInputChange(e)}
                />
                <i className="fa fa-eye" aria-hidden="true" onClick={togglePassword}>ver</i>
            </div>
            <div className="mb-3">
              <label htmlFor="id_estado">Id_estado:</label>
              <input type={"text"} className="form-control"
                name="id_estado" value={id_estado} onChange={(e) => onInputChange(e)} />
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