import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PeticionGet, PeticionPut } from '../../Servicios/PeticionServicio'
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";
import { ListaEstado } from '../../Constantes/ListasSelect';

const EditArticulo = () => {
  let navigate = useNavigate();

  const { idArticulo } = useParams()
  const [Categoria, setCategoria] = useState([])
  const [Presentacion, setPresentacion] = useState([])
  const [imgArticulo, setImg] = useState();

  const [form, setForm] = useState({
    id: "",
    codigo: "",
    nombre: "",
    categoria: {id: 0},
    existencia: "",
    descripcion: "",
    imagen: "",
    codigo: "",
    stokminimo: "",
    marca:"",
    modelo:"",
    estado: 1,
    precio_compra: 0,
    precio_venta: 0,
    presentacion: {id: 0}
  })

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { id, codigo, nombre, categoria: { id: int }, existencia, descripcion, imagen, stokminimo, marca, modelo, precio_venta, precio_compra } = form;

  const onInputChange = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    cargarArticulo();
    cargarCatalogos();
  }, []);

  const validarInputForm = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    
    setForm(nextFormState);
    
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    setForm({ ...form, ["id"]: idArticulo });

    const resultado = await PeticionPut('Articulo/', form)
    
    if (resultado) {
      navigate("/tblArticulo");
    }
  };

  const cargarArticulo = async () => {
      const response = await PeticionGet(`Articulo/id/${idArticulo}`);
      
      if (response) {
        setForm(response.data.data[0]);
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
    validarInputForm(event);
    setForm({ ...form, [event.target.name]: { id: parseInt(event.target.value) } });
    // setForm({ ...form, ["categoria"]: { id: parseInt(event.target.value) } });
  };

  const cargarImagen = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });
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
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.codigo.dirty && errors.codigo.error && 'formFieldError'
                  )}
                  type="text"
                  name="codigo" 
                  id="codigo"
                  value={codigo} 
                  onChange={(e) => onInputChange(e)}
                  onBlur={onBlurField}
                  required
                  />
                  {errors.codigo.dirty && errors.codigo.error ? (
                    <p className="formFieldErrorMessage">{errors.codigo.message}</p>
                  ) : null}
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.nombre.dirty && errors.nombre.error && 'formFieldError'
                  )}
                  type={"text"} 
                  name="nombre" 
                  value={nombre} 
                  onChange={(e) => onInputChange(e)} 
                  onBlur={onBlurField}
                  required
                />
                {errors.nombre.dirty && errors.nombre.error ? (
                  <p className="formFieldErrorMessage">{errors.nombre.message}</p>
                ) : null}
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="categoria">Categoria(*):</label>
                <select 
                value={form.categoria.id}
                  className={clsx(
                    'form-select',
                    'appSelect',
                    errors.categoria.dirty && errors.categoria.error && 'formFieldError'
                  )}
                  id="categoria"
                  name="categoria" 
                  onChange={handleChange}
                  required
                  >
                  <option value="">Seleccione una opcion</option>
                  {Categoria.map((option) => (
                    <option key={option.id} value={option.id} >{option.nombre}</option>
                  ))}
                </select>
                {errors.categoria.dirty && errors.categoria.error ? (
                  <p className="formFieldErrorMessage">{errors.categoria.message}</p>
                ) : null}
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="precio_venta">Precio de Venta(*):</label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.precio_venta.dirty && errors.precio_venta.error && 'formFieldError'
                  )}
                  type="number" 
                  name="precio_venta" 
                  id="precio_venta"
                  value={precio_venta} 
                  onChange={(e) => onInputChange(e)}
                  onBlur={onBlurField}
                  required
                />
                {errors.precio_venta.dirty && errors.precio_venta.error ? (
                  <p className="formFieldErrorMessage">{errors.precio_venta.message}</p>
                ) : null}
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="precio_compra">Precio de Compra(*):</label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.precio_compra.dirty && errors.precio_compra.error && 'formFieldError'
                  )}
                  type="number" 
                  name="precio_compra" 
                  id="precio_compra"
                  value={precio_compra} 
                  onChange={(e) => onInputChange(e)}
                  onBlur={onBlurField}
                  required
                />
                {errors.precio_compra.dirty && errors.precio_compra.error ? (
                  <p className="formFieldErrorMessage">{errors.precio_compra.message}</p>
                ) : null}
              </div>

              {/* <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type={"text"} className="form-control" name="existencia" value={existencia} onChange={(e) => onInputChange(e)} />
              </div> */}
              
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripción(*):</label>
                <input
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.descripcion.dirty && errors.descripcion.error && 'formFieldError'
                  )}
                  type="text" 
                  name="descripcion" 
                  id="descripcion"
                  value={descripcion} 
                  onChange={(e) => onInputChange(e)}
                  onBlur={onBlurField}
                  required
                />
                {errors.descripcion.dirty && errors.descripcion.error ? (
                  <p className="formFieldErrorMessage">{errors.descripcion.message}</p>
                ) : null}
              </div>
              
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="stokminimo">Stock minimo(*):</label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.stokminimo.dirty && errors.stokminimo.error && 'formFieldError'
                  )}
                  type="number"
                  name="stokminimo"
                  id="stokminimo"
                  value={stokminimo}
                  onChange={(e) => onInputChange(e)}
                  onBlur={onBlurField}
                  required
                />
                {errors.stokminimo.dirty && errors.stokminimo.error ? (
                  <p className="formFieldErrorMessage">{errors.stokminimo.message}</p>
                ) : null}
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="marca">Marca(*):</label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.marca.dirty && errors.marca.error && 'formFieldError'
                  )}
                  type="text" 
                  name="marca" 
                  id="marca" 
                  value={marca} 
                  onChange={(e) => onInputChange(e)} 
                  onBlur={onBlurField}
                  required
                />
                {errors.marca.dirty && errors.marca.error ? (
                  <p className="formFieldErrorMessage">{errors.marca.message}</p>
                ) : null}
              </div>
              
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="modelo">Modelo(*):</label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.modelo.dirty && errors.modelo.error && 'formFieldError'
                  )}
                  type="text" 
                  name="modelo" 
                  id="modelo"
                  value={modelo} 
                  onChange={(e) => onInputChange(e)}
                  onBlur={onBlurField}
                  required
                />
                {errors.modelo.dirty && errors.modelo.error ? (
                  <p className="formFieldErrorMessage">{errors.modelo.message}</p>
                ) : null}
              </div>
              
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="presentacion">Presentacion(*):</label>
                <select 
                  value={form.presentacion.id}
                  className={clsx(
                    'form-select',
                    'appSelect',
                    errors.presentacion.dirty && errors.presentacion.error && 'formFieldError'
                  )}
                  id="presentacion" 
                  name="presentacion" 
                  onChange={handleChange}
                  required
                  >
                  <option value="">Seleccione una opcion</option>
                  {Presentacion.map((option) => (
                    <option key={option.id} value={option.id} >{option.presentacion}</option>
                  ))}
                </select>
                {errors.presentacion.dirty && errors.presentacion.error ? (
                  <p className="formFieldErrorMessage">{errors.presentacion.message}</p>
                ) : null}
              </div>

              <div className="form-group col-12 col-sm-6">
                  <label htmlFor="estado">Estado(*):</label>
                  <select 
                    value={form.estado}
                    id="estado" 
                    name="estado" 
                    className="form-select appSelect" 
                    onChange={handleChange}>
                      {ListaEstado.map((option) => (
                          <option key={option.id} value={option.id} >{option.nombre}</option>
                      ))}
                  </select>
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="imagen">Imagen:</label>
                <label class="form-label" for="customFile"></label>
                <input 
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.imagen.dirty && errors.imagen.error && 'formFieldError'
                  )}
                  type="file" 
                  name="imagen" 
                  id="imagen" 
                  onChange={(e) => cargarImagen(e)} 
                  />
                  {errors.imagen.dirty && errors.imagen.error ? (
                    <p className="formFieldErrorMessage">{errors.imagen.message}</p>
                  ) : null}
                <br></br>
                {imgArticulo && (
                  <img class="img-preview" width={200} height={120} src={URL.createObjectURL(imgArticulo)} />
                )}
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