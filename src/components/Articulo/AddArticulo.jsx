import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const baseUrl = process.env.REACT_APP_BASE_URL

const AddArticulo = () => {
  let navigate = useNavigate();
  const [Categoria, setCategoria] = useState([])
  const [imgArticulo, setImg] = useState();
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

  const { nombre, categoria:{id}, existencia, descripcion, imagen, codigo } = Articulo;
  
  useEffect(() => {
    consultarCategorias();
  }, []);

  const consultarCategorias = async () => {
    try {
      const response = await axios.get(`${baseUrl}/all`)
      setCategoria(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const onInputChange = (e) => {
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
    console.log(Articulo)
  };

  const cargarImagen = (e) => {
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
    console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/Articulo`, Articulo);
    alert("Datos Guardados Exitosamente")
    navigate("/tblArticulo");
  };

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
                <select className="form-select appSelect" id="exampleFormControlSelect1">
                  <option value="-1">Seleccione una opcion</option>
                  {Categoria.map((option) => (
                    <option value={option.id} onChange={(e)=>onInputChange(e)}>{option.nombre}</option>
                  ))}
                </select>
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
                <input type="file" className="form-control" name="imagen" id="imagen" value={imagen} onChange={(e)=>cargarImagen(e)}/>
                <br></br>
                {imgArticulo && (
                  <img class="img-preview" width={200} height={120} src={URL.createObjectURL(imgArticulo)}/>
                )}
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