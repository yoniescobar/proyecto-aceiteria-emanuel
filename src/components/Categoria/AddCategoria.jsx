import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
const baseUrl = process.env.REACT_APP_BASE_URL

const dataEstado = [
  { id: 1, estado: "Activo" },
  { id: 2, estado: "No Activo" },
]

const AddCategoria = () => {

  let navigate = useNavigate();

  const [categoria, setcategoria] = useState({
    nombre: "",
    descripcion: "",
    condicion:""
  })

  const { nombre, descripcion, condicion } = categoria;

  const onInputChange = (e) => {
    setcategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleChange = event => {
    setcategoria({ ...categoria, ["condicion"]: event.target.value  });
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultado = await axios.post(`${baseUrl}/categoria`, categoria);
      if(resultado){
        mesajeResultado('Categoria creado con exito!', 'success');
        navigate("/categoria");
      }else{
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
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre</label>
              <input type={"text"} className="form-control" placeholder="Nombre categoria"
                name="nombre" value={nombre} onChange={(e) => onInputChange(e)} required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Descripcion" className="form-label">Descripcion</label>
              <input type={"text"} className="form-control" placeholder="Descripcion producto"
                name="descripcion" value={descripcion} onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria">Estado(*):</label>
              <select id="categoria" nombre="categoria" className="form-select appSelect" onChange={handleChange}>
                <option value="-1">Seleccione una opcion</option>
                {dataEstado.map((option) => (
                  <option key={option.id} value={option.estado} >{option.estado}</option>
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

export default AddCategoria