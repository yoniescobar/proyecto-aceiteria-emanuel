
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const AddUsuario = () => {

  let navigate = useNavigate();

  const [Usuario, setUsuario] = useState({
    tipo_persona: "",
    tipo_documento: "",
    nombre: "",
    no_documento: "",
    direccion: "",
    telefono: "",
    correo: "",
  })

  const { tipo_persona, tipo_documento, nombre, no_documento, direccion, telefono, correo } = Usuario;

  const onInputChange = (e) => {
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/Persona`, Usuario);
    alert("Datos Guardados Exitosamente")
    navigate("/tblUsuario");
    
  };


  return (
    <div className="container">
    <div className="row justify-content-center">
    <h2 className="text-center m-4">Registro de Usuarios</h2>
      <div className="col-12 col-lg-9">
        <section className />
        <div className="clas " />
        <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
      
          <div className="form-row mb-4">
           
            <div className="form-group col-12 col-sm-12">
              <label htmlFor="nombre">Nombre(*):</label>
              <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Nombre de Usuario"
               value={nombre} onChange={(e)=>onInputChange(e)}/>
            </div>
           
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="tipo_documento">Tipo Documento(*):</label>
              <input type="text" name="tipo_documento" id="tipo_documento" className="form-control" 
               value={tipo_documento} onChange={(e)=>onInputChange(e)}/>
            
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="no_documento">No_Documento(*):</label>
              <input type="text" name="no_documento" id="no_documento" className="form-control" 
              value={no_documento} onChange={(e)=>onInputChange(e)}/>
            </div>

            <div className="form-group col-12 col-sm-6">
              <label htmlFor="direccion">Dirección:</label>
              <input type="text" name="direccion" id="direccion" className="form-control" 
              value={direccion} onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="telefono">Teléfono:</label>
              <input type="tel" name="telefono" id="telefono" className="form-control"
              value={telefono} onChange={(e)=>onInputChange(e)}/>
            </div>

            <div className="form-group col-12 col-sm-6">
              <label htmlFor="tipo_persona">Tipo Persona:</label>
              <input type="text" name="tipo_persona" id="tipo_persona" className="form-control"
              value={tipo_persona} onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="correo">Email:</label>
              <input type="email" name="correo" id="correo" className="form-control"
              value={correo} onChange={(e)=>onInputChange(e)}/>
            </div>
          </div>      
          <button type="submit" className="btn btn-outline-primary">Guardar Articulo</button>
          <Link className="btn btn-outline-danger mx-2" to="/tblUsuario">Cancelar</Link>
        </form>
      </div>
    </div>
  </div>


    
  );
}

export default AddUsuario