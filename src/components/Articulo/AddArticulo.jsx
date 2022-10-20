
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const AddArticulo = () => {

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
    await axios.post("http://blooming-inlet-46702.herokuapp.com/api/categoria", categoria);
    navigate("/tblCategoria");
  };


  const options = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Mango",
      value: "mango",
    },
    {
      label: "Banana",
      value: "banana",
    },
    {
      label: "Pineapple",
      value: "pineapple",
    },
  ];

  return (
    <div className="container">
      <div className="row justify-content-center">
      <h2 className="text-center m-4">Registro de Artículo</h2>
        <div className="col-12 col-lg-9">
          <section className />
          <div className="clas " />
          <form action className="bg-light my-3 p-3 border rounded">
        
            <div className="form-row mb-4">
             
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Nombre de Producto" />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="apellidos">Categoria(*):</label>
                <select className="form-select appSelect" id="exampleFormControlSelect1">
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Existencia(*):</label>
                <input type="text" name="nombre" id="nombre" className="form-control" />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="apellidos">Descripción(*):</label>
                <input type="text" name="apellidos" id="apellidos" className="form-control"  />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Imagen:</label>
                <label class="form-label" for="customFile"></label>
                  <input type="file" className="form-control" id="customFile" />



                {/* <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Ejem: Juan Manuel..." /> */}
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="apellidos">Código:</label>
                <input type="text" name="apellidos" id="apellidos" className="form-control"  />
              </div>
            

            </div>
        
            <button type="submit" className="btn btn-outline-primary">Guardar</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblArticulo">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>

  );
}

export default AddArticulo