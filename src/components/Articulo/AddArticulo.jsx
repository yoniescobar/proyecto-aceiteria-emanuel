import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { PeticionGet, PeticionPost } from '../../Servicios/PeticionServicio'

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
    estado:1,
    precio_compra: 0,
    precio_venta: 0
  })

  const { nombre, categoria: { id }, existencia, descripcion, imagen, codigo, stockMinimo, marca, modelo, presentacion, precio_venta, precio_compra } = Articulo;
  const inputReference = useRef(null);

  useEffect(() => {
    cargarCatalogos();
    inputReference.current.focus();
  }, []);

  const cargarCatalogos = async () => {
    const responseCategoria = await PeticionGet('all');
    const responsePresentacion = await PeticionGet('Presentacion/all');
      
    if(responseCategoria) {
      setCategoria(responseCategoria.data.data);
    }

    if(responsePresentacion) {
      setPresentacion(responsePresentacion.data.data)
    }
  }

  const onInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
  };

  const cargarImagen = (e) => {
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
    setImg(e.target.files[0]);
  }

  const handleChange = event => {
    setArticulo({ ...Articulo, [event.target.name]: { id: parseInt(event.target.value) } });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const resultado = await PeticionPost('Articulo', Articulo);

    if (resultado) {
      navigate("/tblArticulo");
    }
  };

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
                <label htmlFor="codigo">Código de Barra(*):</label>
                <input ref={inputReference} type="text" name="codigo" id="codigo" className="form-control" onChange={(e) => onInputChange(e)} />
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
                <label htmlFor="precio_venta">Precio de Venta(*):</label>
                <input type="number" name="precio_venta" id="precio_venta" className="form-control"
                  value={precio_venta} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="precio_compra">Precio de Compra(*):</label>
                <input type="number" name="precio_compra" id="precio_compra" className="form-control"
                  value={precio_compra} onChange={(e) => onInputChange(e)} />
              </div>
              
              {/* <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type="number" name="existencia" id="existencia" className="form-control"
                  value={existencia} onChange={(e) => onInputChange(e)} />
              </div> */}

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

            <button type="button" onClick={handleClick} className="btn btn-outline-primary">Guardar Articulo</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblArticulo">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticulo