import axios from "axios";
import Swal from 'sweetalert2'
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASE_URL

const EditArticulo = () => {
  let navigate = useNavigate();

  const { idArticulo } = useParams()
  const [Categoria, setCategoria] = useState([])
  const [imgArticulo, setImg] = useState();
  
  const [articulo, setArticulo] = useState({
    id:"",
    codigo: "",
    nombre: "",
    categoria:{},
    existencia: "",
    descripcion: "",
    imagen: ""
  })

  const { id, codigo, nombre, categoria:{id: int}, existencia, descripcion, imagen } = articulo;

  const onInputChange = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarArticulo()
    consultarCategorias()
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setArticulo({ ...articulo, ["id"]: idArticulo });
    const resultado = await axios.put(`${baseUrl}/articulo/`, articulo);

    if(resultado){
      Swal.fire(
        'Se actualizo existosamente el articulo!',
        '',
        'success'
      )
    } else{
      Swal.fire(
        'Ocurrio un error al intentar actualizar el articulo!',
        '',
        'warning'
      )
    }
    navigate("/tblArticulo");
  };
  const cargarArticulo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Articulo/id/${idArticulo}`)
      setArticulo(response.data.data[0])
    } catch (error) {
      console.log(error);
    }
  }

  const consultarCategorias = async () => {
    try {
      const response = await axios.get(`${baseUrl}/all`)
      setCategoria(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const cargarImagen = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
    setImg(e.target.files[0]);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar articulo</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-row mb-4">
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type={"text"} className="form-control" name="nombre" value={nombre} onChange={(e) => onInputChange(e)} />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="categoria">Categoria(*):</label>
                <select className="form-select appSelect" id="exampleFormControlSelect1">
                  <option value="-1" onChange={(e)=>onInputChange(e)}>Seleccione una opcion</option>
                  {Categoria.map((option) => (
                    <option value={option.id} onChange={(e)=>onInputChange(e)}>{option.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type={"text"} className="form-control" name="existencia" value={existencia} onChange={(e) => onInputChange(e)} />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripción(*):</label>
                <input type={"text"} className="form-control" name="descripcion" value={descripcion} onChange={(e) => onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="imagen">Imagen:</label>
                <label class="form-label" for="customFile"></label>
                {/* <input type="file" className="form-control" name="imagen" id="imagen" value={imagen} onChange={(e)=>cargarImagen(e)}/>
                <br></br>
                {imgArticulo && (
                  <img class="img-preview" width={200} height={120} src={URL.createObjectURL(imgArticulo)}/>
                )} */}
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="codigo">Código de Barra:</label>
                <input type="number" name="codigo" id="codigo" className="form-control" value={codigo} onChange={(e) => onInputChange(e)} />
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

export default EditArticulo