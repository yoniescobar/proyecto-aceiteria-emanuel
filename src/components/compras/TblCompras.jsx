import { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { getItemByCode, getProductosVenta, getProveedorByCode, setIngreso } from '../Articulo/ArticuloService';
const initialState = {
  tipo_comprobante: 1,
  serie_doc: null,
  numero_doc: null,
  fecha_doc: "2022-12-01",
  impuesto: 0,
  total_ingreso: "0",
  estado: 1,
  persona: {
      id: 0,
      nombre: "",
      codigo: ""
  },
  usuario: {
      id: 1
  },
  items: [
  ]
}
const TblCompras = () => {

  const [code, setCode] = useState('');
  const [ops, setOptions] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(initialState);
  const [nit, setNit] = useState('');
  let navigate = useNavigate();
  
  useEffect(() => {
    getProductosVenta().then(
        data => {
            const newData = data.data.map(obj => ({ ...obj, label: obj.existencia + ' existencias de  ' + obj.nombre + ' - Q.' + obj.precio_venta, value: obj.id }));
            setOptions(newData);
            getProveedorByCode(0).then(
              data => {
                  const newItem = { ...item };
                  newItem.persona.id = data.data[0].id;
                  newItem.persona.codigo = data.data[0].nodocumento;
                  newItem.persona.nombre = data.data[0].nombre;
                  setItem(newItem);
              }
            )
        }
    );        
  }, []);

  useEffect(() => {
    totalCompra();
  }, [articulos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(code.replace(/\s/g,"") !== ""){
      const exist = articulos.find(item => item.codigo === code);
      if(exist === undefined){
              getItemByCode(code).then(
                  data => {
                      if (data.id > 0) {
                          let item = data.data[0];
                          prepareAdd(item);
                      } else {
                          mesajeResultado('Producto no encontrado!', 'warning');
                      }
                  }
              )
      }else{
          mesajeResultado('Elemento ya agregado a la venta', 'warning');
      }
    }else{
        mesajeResultado('Código no ingresado', 'warning');
    };
  }

  const logChange = (logChange) => {
    const exist = articulos.find(item => item.codigo === logChange.codigo);
    if (exist === undefined) {
      prepareAdd(logChange);
    } else {
      mesajeResultado('Elemento ya agregado a la venta', 'warning');
    }
  }

  const prepareAdd = (item) => {
    item.cantidad = 1;
    item.descuento = 0;
    item.articulo = {
      id: item.id
    }
    handleAdd(item);
  }

  const handleAdd = (item) => {
    const editData = articulos;
    editData.unshift(item);
    setArticulos([...editData]);
  }

  const mesajeResultado = (mensaje, clase) => {
    Swal.fire(
      mensaje,
      '',
      clase
    )
  };
  const onChangeInput = (e, prodId) => {
    const { value } = e.target
    const editData = articulos.map((item) =>
        item.id === prodId
            ? { ...item, cantidad: value }
            : item
    )
    setArticulos([...editData]);
  };

  const onclickDelItem = (e, itemId) => {
    e.preventDefault();
    const index = articulos.findIndex(item => {
        return item.id === itemId;
    });
    const editData = articulos;
    editData.splice(index, 1);
    setArticulos([...editData]);
  }

  const totalCompra = () => {
    let total = 0;
    for (var i in articulos) {
        total += +articulos[i].precio_venta * +articulos[i].cantidad;
    }
    setTotal(total);
  }
  const setSerieDoc = (event) => {
    const tempItem = item;
    tempItem.serie_doc = event.target.value;
    setItem(tempItem);
  }

  const setNoDoc = (event) => {
    const tempItem = item;
    tempItem.numero_doc = event.target.value;
    setItem(tempItem);
  }
  
  const handleSearchCliente = () => {
    getProveedorByCode(nit).then(
        data => {
            if (data.id > 0) {
                const tempItem = { ...item };
                tempItem.persona.id = data.data[0].id;
                tempItem.persona.nombre = data.data[0].nombre;
                setItem(item => ({
                    ...tempItem
                }))
            } else {
                mesajeResultado('Proveedor no encontrado!', 'warning');
            }
        }
    );
  }
  const restart = () => {
    const editData = [];
    setArticulos([...editData]);
    const init = { ...item };
    init.persona.id = 0;
    init.persona.nombre = "";
    init.serie_doc = "";
    init.numero_doc = "";
    setItem(item => ({
        ...init
    }));
  }
  const handleMakeSale = () => {
    const tempItem = { ...item };
    tempItem.items = articulos;
    tempItem.total_ingreso = total;
    if (tempItem.items.length > 0) {
      if (tempItem.persona.id > 0 && (tempItem.serie_doc !== '' && tempItem.serie_doc !== null) && (tempItem.numero_doc !== '' && tempItem.numero_doc !== null)) {
        setIngreso(tempItem).then(
            data => {
                if (data.id > 0) {
                    mesajeResultado('Compra realizada con exito!', 'success');
                    restart();
                    navigate("/compras");
                };
            }
        )
      } else {
          mesajeResultado('Datos de facturación incorrectos', 'warning');
      }
    } else {
        mesajeResultado('No hay articulos para vender', 'warning');
    }
  }

  return (
    <>
              <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <p className="lead"> <b>Buscar por código</b></p>
                <div className="form-inline">
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    id="codigo"
                    name="codigo"
                    placeholder="Código"
                    onChange={(e) => setCode(e.target.value)}

                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >
                    <i className='fa fa-search'></i>
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <p className="lead"> <b>Buscar por descripción</b></p>
                <div >
                  <Select
                    name="form-field-name"
                    value="one"
                    options={ops}
                    onChange={logChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Existencia</th>
                                <th>Cantidad</th>
                                <th>Producto</th>
                                <th>C/U</th>
                                <th>Subtotal</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articulos.length ? (
                                    articulos.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.existencia}</td>
                                            <td>
                                                <input
                                                    onChange={(e) => onChangeInput(e, item.id)}
                                                    type="number"
                                                    name="cantidad"
                                                    defaultValue={1}
                                                    min="1"
                                                />
                                            </td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.precio_venta}</td>
                                            <td>{item.cantidad * item.precio_venta}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => onclickDelItem(e, item.id)}
                                                >
                                                    <i className='fa fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <p className="lead">Ningun producto agregado...</p>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h1>Total compra:</h1>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <h1>Q. {total}</h1>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <label for="cliente" className="col-sm-2 col-form-label">NIT</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" onChange={(e) => setNit(e.target.value)} name="nit" id="nit" placeholder={item.persona.codigo} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button"
                                    onClick={handleSearchCliente}>
                                    <i className='fa fa-trash'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label for="cliente" className="col-sm-2 col-form-label">CLIENTE </label>
                        <input type="text" className="form-control" placeholder={item.persona.nombre} readOnly />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label for="nit" className="col-sm-2 col-form-label">SERIE</label>
                        <input type="text" className="form-control" placeholder="" onChange={setSerieDoc} />
                    </div>
                    <div className="col">
                        <label for="cliente" className="col-sm-2 col-form-label">DOCUMENTO</label>
                        <input type="text" className="form-control" placeholder="" onChange={setNoDoc} />
                    </div>
                </div>
                <br /> <br /> 
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <button type="button" className="btn btn-Success btn-lg btn-block" onClick={handleMakeSale}>Realizar compra</button>
                    </div>
                    <div className="col-md-4"></div>
                </div>
          </form>
    </>
  )
}

export default TblCompras