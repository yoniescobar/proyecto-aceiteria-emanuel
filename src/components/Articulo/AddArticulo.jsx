import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { PeticionGet, PeticionPost } from '../../Servicios/PeticionServicio'
import { getItemByCode } from './ArticuloService';
import Swal from 'sweetalert2';
import { useValidatorForm } from "../../utils/hooks/useValidatorForm";
import { storage } from '../../Servicios/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { subirImagen } from '../../utils/uploadImg';
import styles from "../../utils/hooks/validatorForm.css"
import clsx from "clsx";
import { ListaEstado } from '../../Constantes/ListasSelect';

const AddArticulo = () => {
  const mesajeResultado = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
  };

  const [isDisabled, setIsDisabled] = useState(false);
  let navigate = useNavigate();
  const [Categoria, setCategoria] = useState([])
  const [Presentacion, setPresentacion] = useState([])
  const [imgArticulo, setImg] = useState();
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    categoria: {
      id: 0
    },
    precio_venta: 0,
    precio_compra: 0,
    descripcion: "",
    stokminimo: "",
    marca: "",
    presentacion: {
      id: 0
    },
    existencia: "",
    imagen: "",
    modelo: "",
    estado: 1,
    montoDescuento:0,
    porcentajeDescuento:0
  })

  const { errors, validateForm, onBlurField } = useValidatorForm(form);
  const { nombre, categoria: { id }, existencia, descripcion, imagen, codigo, stokminimo, marca, modelo, presentacion, precio_venta, precio_compra, montoDescuento, porcentajeDescuento } = form;
  const inputReference = useRef(null);

  useEffect(() => {
    cargarCatalogos();
    inputReference.current.focus();
  }, []);

  const cargarCatalogos = async () => {
    const responseCategoria = await PeticionGet('all');
    const responsePresentacion = await PeticionGet('Presentacion/all');

    if (responseCategoria) {
      setCategoria(responseCategoria.data.data);
    }

    if (responsePresentacion) {
      setPresentacion(responsePresentacion.data.data)
    }
  }

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

  const onInputChange = (e) => {
    validarInputForm(e);
    //CALCULA DESCUENTO
    // if(e.target.name=='montoDescuento')
    //   console.log("Calcula porcentaje a partir del monto");
    // if(e.target.name=='porcentajeDescuento')
    //   console.log("Calcula monto a partir del porcentaje");
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onInputChangeTwo = (e) => {
    //validarInputForm(e);

    let newForm = form;

    //CALCULA DESCUENTO
    if(e.target.name=='montoDescuento'){
      newForm.montoDescuento = e.target.value;
      //setForm({ ...form, [e.target.name]: e.target.value });
    }
      
    
      console.log("Porcentaje de descuento: "+(e.target.value/form.precio_venta)*100);
         
    if(e.target.name=='porcentajeDescuento'){
      newForm.porcentajeDescuento = e.target.value;
      //setForm({ ...form, [e.target.name]: e.target.value });
    }
      
    
      console.log("monto de descuento: "+(e.target.value/100)*form.precio_venta);      
    
    setForm(...newForm);
  };
  const onLostFocus = (e) => {
    validarInputForm(e);
    if (e.target.name === 'codigo') {
      getItemByCode(e.target.value).then(
        data => {
          if (data.id > 0) {
            mesajeResultado('Código ya registrado!', 'warning');
          } else {
          }
        }
      )
    }
  }

  const cargarImagen = (e) => {
    validarInputForm(e);
    setForm({ ...form, [e.target.name]: e.target.value });
    setImg(e.target.files[0]);
  }

  const handleChange = event => {
    validarInputForm(event);
    setForm({ ...form, [event.target.name]: { id: parseInt(event.target.value) } });
  };

  const handleClick = async (event) => {
    event.preventDefault();

    getItemByCode(form.codigo).then(
      data => {
        if (data.id > 0) {
          mesajeResultado('Código ya registrado!', 'warning');
        } else {
          setIsDisabled(true);

          if (imgArticulo) {
            guardarImagen();
          } else{
            guardarArticulo();
          }
        }
      }
    )
  };

  const guardarArticulo = async () => {
    const resultado = await PeticionPost('Articulo', form);

    if (resultado) {
      navigate("/tblArticulo");
    }
  }

  const guardarImagen = async () => {
    const storageRef = ref(storage, 'files/' + imgArticulo.name);
    const uploadTask = uploadBytesResumable(storageRef, imgArticulo);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          form.imagen = downloadURL;
          guardarArticulo();
        });
      }
    );
  }

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
                <input
                  className={clsx(
                    'form-control',
                    'formField',
                    errors.codigo.dirty && errors.codigo.error && 'formFieldError'
                  )}
                  ref={inputReference}
                  type="text"
                  name="codigo"
                  id="codigo"
                  onChange={(e) => onInputChange(e)}
                  onBlur={(e) => onLostFocus(e)}
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
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre de Producto"
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
                <input type="number" name="existencia" id="existencia" className="form-control"
                  value={existencia} onChange={(e) => onInputChange(e)} />
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
                <select id="estado" name="estado" className="form-select appSelect" onChange={handleChange}>
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
                  )}
                  type="file"
                  name="imagen"
                  id="imagen"
                  value={imagen}
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

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="montoDescuento">Monto de descuento:</label>
                <input
                  type="text"
                  name="montoDescuento"
                  id="montoDescuento"
                  value={montoDescuento}
                  onChange={(e) => onInputChangeTwo(e)}
                  required
                />
                
              </div>

              <div className="form-group col-12 col-sm-6">
                <label htmlFor="porcentajeDescuento">Porcentaje de descuento:</label>
                <input
                  type="text"
                  name="porcentajeDescuento"
                  id="porcentajeDescuento"
                  value={porcentajeDescuento}
                  onChange={(e) => onInputChangeTwo(e)}
                  required
                />
              </div>
            </div>

            <button type="button" onClick={handleClick} disabled={isDisabled} className="btn btn-outline-primary">Guardar Articulo</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblArticulo">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticulo