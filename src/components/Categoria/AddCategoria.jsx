
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const AddCategoria = () => {

  let navigate = useNavigate();

  const [categoria, setcategoria] = useState({
    nombre: "",
    descripcion: "",
    condicion: "",
  })

  const { nombre, descripcion, condicion } = categoria;

  const onInputChange = (e) => {
    setcategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/categoria`, categoria);
    navigate("/tblCategoria");
  };


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
              <label for="exampleFormControlSelect1" htmlFor="Condicion" className="form-label">condicion</label>
              <input type={"text"} className="form-control" placeholder="condicion"
                name="condicion" value={condicion} onChange={(e) => onInputChange(e)}
              />

              {/* <select className="form-select appSelect" id="exampleFormControlSelect1"  
                  name="condicion" value={condicion} onChange={(e) => onInputChange(e)}  >
                <option selected>Activo</option>
                <option>Desactivado</option>
              </select> */}
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