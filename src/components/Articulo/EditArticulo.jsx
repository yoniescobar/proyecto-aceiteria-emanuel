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
    id: "",
    codigo: "",
    nombre: "",
    categoria: {},
    existencia: "",
    descripcion: "",
    imagen: ""
  })

  const { id, codigo, nombre, categoria: { id: int }, existencia, descripcion, imagen } = articulo;

  const onInputChange = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarArticulo()
    consultarCategorias()
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setArticulo({ ...articulo, ["id"]: idArticulo });
      const resultado = await axios.put(`${baseUrl}/Articulo/`, articulo);
  
      if (resultado) {
        mesajeResultado('Se actualizo existosamente el articulo!', 'success');
      } else {
        mesajeResultado('Ocurrio un error al intentar actualizar el articulo!', 'warning');
      }
  
      navigate("/tblArticulo");
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
    }
  };

  const cargarArticulo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Articulo/id/${idArticulo}`)
      setArticulo(response.data.data[0])
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar los articulos, intenta mas tarde.', 'warning')
    }
  }

  const consultarCategorias = async () => {
    try {
      const response = await axios.get(`${baseUrl}/all`)
      setCategoria(response.data.data)
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar las categorias, intenta mas tarde.', 'warning')
    }
  }

  const handleChange = event => {
    setArticulo({ ...articulo, ["categoria"]: { id: parseInt(event.target.value) } });
  };

  const cargarImagen = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
    setImg(e.target.files[0]);
  }

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
          <h2 className="text-center m-4">Editar articulo</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-row mb-4">
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type={"text"} className="form-control" name="nombre" value={nombre} onChange={(e) => onInputChange(e)} />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="categoria">Categoria(*):</label>
                <select id="categoria" nombre="categoria" className="form-select appSelect" onChange={handleChange}>
                  <option value="-1">Seleccione una opcion</option>
                  {Categoria.map((option) => (
                    <option key={option.id} value={option.id} >{option.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type={"text"} className="form-control" name="existencia" value={existencia} onChange={(e) => onInputChange(e)} />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripci??n(*):</label>
                <input type={"text"} className="form-control" name="descripcion" value={descripcion} onChange={(e) => onInputChange(e)} />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="imagen">Imagen:</label>
                <label class="form-label" for="customFile"></label>
                <input type="file" className="form-control" name="imagen" id="imagen" onChange={(e) => cargarImagen(e)} />
                <br></br>
                {imgArticulo && (
                  <img class="img-preview" width={200} height={120} src={URL.createObjectURL(imgArticulo)} />
                )}
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="codigo">C??digo de Barra:</label>
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