import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PeticionGet, PeticionPut } from '../../Servicios/PeticionServicio'

const EditArticulo = () => {
  let navigate = useNavigate();

  const { idArticulo } = useParams()
  const [Categoria, setCategoria] = useState([])
  const [Presentacion, setPresentacion] = useState([])
  const [imgArticulo, setImg] = useState();

  const [articulo, setArticulo] = useState({
    id: "",
    codigo: "",
    nombre: "",
    categoria: {},
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

  const { id, codigo, nombre, categoria: { id: int }, existencia, descripcion, imagen, stockMinimo, marca, modelo, precio_venta, precio_compra } = articulo;

  const onInputChange = (e) => {
    setArticulo({ ...articulo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarArticulo();
    cargarCatalogos();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setArticulo({ ...articulo, ["id"]: idArticulo });

    const resultado = await PeticionPut('Articulo/', articulo)
    
    if (resultado) {
      navigate("/tblArticulo");
    }
  };

  const cargarArticulo = async () => {
      const response = await PeticionGet(`Articulo/id/${idArticulo}`);
      
      if (response) {
        setArticulo(response.data.data[0]);
      }
  }

  const cargarCatalogos = async () => {
    const responseCategoria = await PeticionGet('all');
    const responsePresentacion = await PeticionGet('Presentacion/all');

    if (responseCategoria) {
      setCategoria(responseCategoria.data.data)
    }
    
    if (responsePresentacion) {
      setPresentacion(responsePresentacion.data.data)
    }
  }

  const handleChange = event => {
    setArticulo({ ...articulo, ["categoria"]: { id: parseInt(event.target.value) } });
  };

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
                <label htmlFor="codigo">Código de Barra:</label>
                <input type="text" name="codigo" id="codigo" className="form-control" value={codigo} onChange={(e) => onInputChange(e)} />
              </div>

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
                <label htmlFor="precio_venta">Precio de Venta(*):</label>
                <input type="number" name="precio_venta" id="precio_venta" className="form-control"
                  value={precio_venta} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="precio_compra">Precio de Compra(*):</label>
                <input type="number" name="precio_compra" id="precio_compra" className="form-control"
                  value={precio_compra} onChange={(e) => onInputChange(e)} />
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type={"text"} className="form-control" name="existencia" value={existencia} onChange={(e) => onInputChange(e)} />
              </div>
              
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripción(*):</label>
                <input type={"text"} className="form-control" name="descripcion" value={descripcion} onChange={(e) => onInputChange(e)} />
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
                <input type="file" className="form-control" name="imagen" id="imagen" onChange={(e) => cargarImagen(e)} />
                <br></br>
                {imgArticulo && (
                  <img class="img-preview" width={200} height={120} src={URL.createObjectURL(imgArticulo)} />
                )}
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="presentacion">Presentacion(*):</label>
                <select id="presentacion" nombre="presentacion" className="form-select appSelect" onChange={handleChange}>
                  <option value="-1">Seleccione una opcion</option>
                  {Presentacion.map((option) => (
                    <option key={option.id} value={option.id} >{option.presentacion}</option>
                  ))}
                </select>
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