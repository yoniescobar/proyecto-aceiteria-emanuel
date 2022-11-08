import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditArticulo = () => {
  let navigate = useNavigate();

  const { id } = useParams()

  const [articulo, setArticulo] = useState({
    codigo: "",
    nombre: "",
    existencia: "",
    descripcion: "",
    imagen: "",
    estado: "",
    //categoria: "",
  })

  const { codigo, nombre, existencia, descripcion, imagen, estado } = articulo;

  const onInputChange = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarArticulo()
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${baseUrl}/articulo/id`, articulo);
    navigate("/tblArticulo");
  };

  const cargarArticulo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Articulo/id/${id}`)
      console.log(response.data.data[0])
      setArticulo(response.data.data[0])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar articulo</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Nombre" className="form-label">Nombre</label>
              <input type={"text"} className="form-control" 
                name="nombre" value={nombre} onChange={(e) => onInputChange(e)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="existencia" className="form-label">Existencia</label>
              <input type={"text"} className="form-control" 
              name="existencia" value={existencia} onChange={(e) => onInputChange(e)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripcion</label>
              <input type={"text"} className="form-control" 
              name="descripcion" value={descripcion} onChange={(e) => onInputChange(e)}/>
            </div>
            <button type="submit" className="btn btn-outline-primary">Guardar</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblArticulo">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditArticulo