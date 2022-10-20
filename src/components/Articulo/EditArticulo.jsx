
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditArticulo = () => {
  let navigate = useNavigate();

  const { id } = useParams()

  const [categoria, setcategoria] = useState({
    nombre: "",
    descripcion: "",
    condicion: "",
  })

  const { nombre, descripcion, condicion } = categoria;

  const onInputChange = (e) => {
    setcategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarcategoria()
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${baseUrl}/categoria`, categoria);
    navigate("/tblCategoria");
  };


  const cargarcategoria = async () => {
    const response = await axios.get(`${baseUrl}/categoria/${id}`)
    console.log(response.data.data[0])
    setcategoria(response.data.data[0])
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar categoria</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre</label>
              <input type={"text"} className="form-control" 
                name="nombre" value={nombre} onChange={(e) => onInputChange(e)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Descripcion" className="form-label">Descripcion</label>
              <input type={"text"} className="form-control" 
              name="descripcion" value={descripcion} onChange={(e) => onInputChange(e)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="condicion" className="form-label">condicion</label>
              <input type={"text"} className="form-control" 
              name="condicion" value={condicion} onChange={(e) => onInputChange(e)}/>
            </div>
            <button type="submit" className="btn btn-outline-primary">Guardar</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblCategoria">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditArticulo