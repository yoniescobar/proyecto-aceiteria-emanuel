import axios from "axios"
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom"
import { PeticionGet, PeticionDelete } from '../../Servicios/PeticionServicio'

const baseUrl = process.env.REACT_APP_BASE_URL

const AddArticulo = () => {
  let navigate = useNavigate();
  const [Categoria, setCategoria] = useState([])
  const [Presentacion, setPresentacion] = useState([])
  const [imgArticulo, setImg] = useState();
  const [Articulo, setArticulo] = useState({
    nombre: "",
    categoria: {
      id: 0
    },
    presentacion: {
      id: 0
    },
    existencia: "",
    descripcion: "",
    imagen: "",
    codigo: "",
    stockMinimo: "",
    marca:"",
    modelo:"",
  })

  const { nombre, categoria: { id }, existencia, descripcion, imagen, codigo, stockMinimo, marca, modelo, presentacion } = Articulo;

  useEffect(() => {
    consultarCategorias();
    consultarPresentacion();
  }, []);

  const consultarCategorias = async () => {
    try {
      const response = await axios.get(`${baseUrl}/all`)
      setCategoria(response.data.data)
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar las categorias, intenta mas tarde.', 'warning')
    }
  }

  const consultarPresentacion = async () => {
    try {
      const response = await PeticionGet('Presentacion/all');
      setPresentacion(response.data.data)
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar consultar las categorias, intenta mas tarde.', 'warning')
    }
  }

  const onInputChange = (e) => {
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
  };

  const cargarImagen = (e) => {
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
    setImg(e.target.files[0]);
  }

  const handleChange = event => {
    setArticulo({ ...Articulo, [event.target.name]: { id: parseInt(event.target.value) } });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(Articulo);
      const resultado = await axios.post(`${baseUrl}/Articulo`, Articulo);

      if (resultado) {
        mesajeResultado('Articulo creado con exito!', 'success');
      } else {
        mesajeResultado('Ocurrio un error al intentar crear el articulo!', 'warning');
      }

      navigate("/tblArticulo");
    } catch (error) {
      mesajeResultado('Ocurrio un error al intentar guardar los datos, intenta mas tarde.', 'warning')
    }
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
      <div className="row justify-content-center">
        <h2 className="text-center m-4">Registro de Artículo</h2>
        <div className="col-12 col-lg-9">
          <section className />
          <div className="clas " />
          <form action className="bg-light my-3 p-3 border rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="form-row mb-4">
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="codigo">Código de Barra(*):</label>
                <input type="text" name="codigo" id="codigo" className="form-control"
                  value={codigo} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Nombre de Producto"
                  value={nombre} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="categoria">Categoria(*):</label>
                <select id="categoria" name="categoria" className="form-select appSelect" onChange={handleChange}>
                  <option value="-1">Seleccione una opcion</option>
                  {Categoria.map((option) => (
                    <option key={option.id} value={option.id} >{option.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type="number" name="existencia" id="existencia" className="form-control"
                  value={existencia} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripción(*):</label>
                <input type="text" name="descripcion" id="descripcion" className="form-control"
                  value={descripcion} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="stockMinimo">Stock minimo(*):</label>
                <input type="number" name="stockMinimo" id="stockMinimo" className="form-control"
                  value={stockMinimo} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="marca">Marca(*):</label>
                <input type="text" name="marca" id="marca" className="form-control"
                  value={marca} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="modelo">Modelo(*):</label>
                <input type="text" name="modelo" id="modelo" className="form-control"
                  value={modelo} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="imagen">Imagen:</label>
                <label class="form-label" for="customFile"></label>
                <input type="file" className="form-control" name="imagen" id="imagen" value={imagen} onChange={(e) => cargarImagen(e)} />
                <br></br>
                {imgArticulo && (
                  <img class="img-preview" width={200} height={120} src={URL.createObjectURL(imgArticulo)} />
                )}
              </div>
              
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="presentacion">Presentacion(*):</label>
                <select id="presentacion" name="presentacion" className="form-select appSelect" onChange={handleChange}>
                  <option value="-1">Seleccione una opcion</option>
                  {Presentacion.map((option) => (
                    <option key={option.id} value={option.id} >{option.presentacion}</option>
                  ))}
                </select>
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