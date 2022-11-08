
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const AddArticulo = () => {

  let navigate = useNavigate();

  const [Articulo, setArticulo] = useState({
    nombre: "",
    categoria:{
      id:0
    },
    existencia: "",
    descripcion: "",
    imagen: "",
    codigo: "",
  })

  const { nombre, categoria:{id},existencia,descripcion,imagen,codigo } = Articulo;

  const onInputChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/Articulo`, Articulo);
    alert("Datos Guardados Exitosamente")
    navigate("/tblArticulo");
  };

  const options = [
    {
      label: "Aceite Liquido",
      value: "aceite",
    },
    {
      label: "Freno de Motor",
      value: "freno",
    },
    {
      label: "Compresor Aire",
      value: "compresor",
    },
    {
      label: "Agua anticongelante",
      value: "agua",
    },
  ];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="text-center m-4">Registro de Artículo</h2>
        <div className="col-12 col-lg-9">
          <section className />
          <div className="clas " />
          <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="form-row mb-4">
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Nombre de Producto" 
                value={nombre} onChange={(e)=>onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="categoria">Categoria(*):</label>
                <input type="number" name="categoria" id="categoria" className="form-control" placeholder="Nombre de Producto" 
                value={id} onChange={(e)=>onInputChange(e)}/>
                {/* <select className="form-select appSelect" id="exampleFormControlSelect1">
                  {options.map((option) => (
                    <option value={option.value} onChange={(e)=>onInputChange(e)}>{option.label}</option>
                  ))}
                </select> */}
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type="number" name="existencia" id="existencia" className="form-control" 
                value={existencia} onChange={(e)=>onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripción(*):</label>
                <input type="text" name="descripcion" id="descripcion" className="form-control" 
                value={descripcion} onChange={(e)=>onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="imagen">Imagen:</label>
                <label class="form-label" for="customFile"></label>
                <input type="file" className="form-control" name="imagen" id="imagen" 
                value={imagen} onChange={(e)=>onInputChange(e)}/>
                {/* <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Ejem: Juan Manuel..." /> */}
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="codigo">Código de Barra:</label>
                <input type="number" name="codigo" id="codigo" className="form-control"
                value={codigo} onChange={(e)=>onInputChange(e)}/>
              </div>
            </div>

            <button type="submit" className="btn btn-outline-primary">Guardar Articulo</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblArticulo">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticulo