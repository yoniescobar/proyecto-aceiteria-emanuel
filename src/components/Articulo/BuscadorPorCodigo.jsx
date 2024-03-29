import { useState, useEffect, CSSProperties } from 'react';
import { getItemByCode, getProductosVenta, setEgreso } from './ArticuloService';
import { getClienteByCode } from './ArticuloService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { trackPromise } from 'react-promise-tracker';
import DatePicker from "react-datepicker";
import numeroAQuetzales from "../../utils/util"
import Select from 'react-select';
import MaskedInput from 'react-text-mask'
import { getPermisosUsuario } from "../../Servicios/oauth";
import { getIdusuario } from "./../../utils/token";

import ClipLoader from "react-spinners/ClipLoader";

const optionsTI = [
    { value: '1', label: 'Venta' },
    { value: '2', label: 'Traslado' }
]

const initialState = {
    tipoComprobante: 1,
    serie_doc: null,
    numero_doc: null,
    fecha_doc: "2022-12-01",
    impuesto: 0,
    total_egreso: "total",
    estado: 1,
    comentario:"",
    persona: {
        id: 0,
        nombre: "",
        codigo: ""
    },
    usuario: {
        id: 1
    },
    items: [
    ],
    fechaegreso: new Date(),
    tipopago: "1",
    pagos: [],
    sucursal: {
        id: 0
    }, 
    pago:0,
    cambio:0
}

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const BuscadorPorCodigo = () => {

    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const [code, setCode] = useState('');
    const [nit, setNit] = useState('');
    const [articulos, setArticulos] = useState([]);
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(initialState);
    const [ops, setOptions] = useState([]);
    const [cambio, setCambio] = useState(0);
    const [sucursal, setSucursal] = useState('');
    const [pago, setPago] = useState({
        abono: 0,
        tipopago: 1,
        fechapago: new Date(),
        saldo: 0,
        observaciones: ""
    });

    let navigate = useNavigate();

    useEffect(() => {
        totalCompra();
    }, [articulos]);

    useEffect(() => {
        getProductosVenta().then(
            data => {
                const newData = data.data.map(obj => ({ ...obj, label: obj.existencia + ' existencias de  ' + obj.nombre + ' - ' + numeroAQuetzales(obj.precio_venta), value: obj.id }));
                setOptions(newData);
                getClienteByCode(0).then(
                    data => {
                        const newItem = { ...item };
                        newItem.persona.id = data.data[0].id;
                        newItem.persona.codigo = data.data[0].nodocumento;
                        newItem.persona.nombre = data.data[0].nombre;

                        getPermisosUsuario(getIdusuario()).then(
                            data => {
                                if (data.id < 0)
                                    this.mesajeResultado('No tiene perfil asignado en el sistema.', 'warning');
                                if (data.id > 0) {
                                    setSucursal(data.data[0].usuario.sucursal.nombre);
                                    newItem.sucursal.id = data.data[0].usuario.sucursal.id;
                                    setItem(newItem);
                                }
                            }
                        );


                    }
                )
            }
        );
    }, []);

    const mesajeResultado = (mensaje, clase) => {
        Swal.fire(
            mensaje,
            '',
            clase
        )
    };




    const prepareAdd = (item) => {
        item.cantidad = 1;
        item.descuento = 0;
        item.articulo = {
            id: item.id
        }
        handleAdd(item);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.replace(/\s/g, "") !== "") {
            const exist = articulos.find(item => item.codigo === code);
            if (exist === undefined) {
                trackPromise(
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
                )
            } else {
                mesajeResultado('Elemento ya agregado a la venta', 'warning');
            }
        } else {
            mesajeResultado('Código no ingresado', 'warning');
        };
    };

    const onChangeInput = (e, prodId) => {
        let { value } = e.target;

        if (value < 0) {
            value = 0;
            mesajeResultado('No se permite cantida a vender negativa', 'warning');
        }

        const element = articulos.find(({ id }) => id == prodId);

        if (element.existencia < value) {
            value = element.existencia;
            mesajeResultado('Cantidad no disponible, se agregará la existencia máxima', 'warning');
        }

        const editData = articulos.map((item) =>
            item.id === prodId
                ? { ...item, cantidad: value }
                : item
        )
        setArticulos([...editData]);
    };
    const onChangeInputPV = (e, prodId) => {
        const { value } = e.target
        const editData = articulos.map((item) =>
            item.id === prodId
                ? { ...item, precio_venta: value }
                : item
        )
        setArticulos([...editData]);
    };
    const handleAdd = (item) => {
        const editData = articulos;
        editData.unshift(item);
        setArticulos([...editData]);
    }
    const totalCompra = () => {
        let total = 0;
        for (var i in articulos) {
            total += +articulos[i].precio_venta * +articulos[i].cantidad;
        }
        setTotal(total);
    }

    const handleSearchCliente = () => {
        getClienteByCode(nit).then(
            data => {
                if (data.id > 0) {
                    const tempItem = { ...item };
                    tempItem.persona.id = data.data[0].id;
                    tempItem.persona.nombre = data.data[0].nombre;
                    setItem(item => ({
                        ...tempItem
                    }))
                } else {
                    mesajeResultado('Cliente no encontrado!', 'warning');
                }
            }
        );
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
    /*useEffect(() =>{
        console.log(pago);
    },[pago]);*/

    const handleMakeSale = () => {
        const tempItem = { ...item };
        tempItem.items = articulos;
        tempItem.total_egreso = total;
        if (tempItem.items.length > 0) {
            if (tempItem.persona.id > 0 && (tempItem.serie_doc !== '' && tempItem.serie_doc !== null) && (tempItem.numero_doc !== '' && tempItem.numero_doc !== null)) {
                if (tempItem.tipopago === "0") {
                    const endPago = { ...pago };
                    let saldopago = tempItem.total_egreso - endPago.abono;
                    endPago.fechapago = tempItem.fechaegreso;
                    endPago.saldo = saldopago;
                    tempItem.pagos.push(endPago);
                    tempItem.pagopendiente = tempItem.total_egreso - endPago.abono;
                }
                tempItem.usuario.id = getIdusuario();

                if (tempItem.tipopago == 1)
                    if (cambio < 0)
                        return mesajeResultado('El pago al contado no puede ser menor al total', 'warning');
                //console.log(tempItem);
                tempItem.cambio = cambio;
                setLoading(true);
                setEgreso(tempItem).then(
                    data => {
                        if (data.id > 0) {
                            mesajeResultado('Venta realizada con exito!', 'success');
                            navigate("/Ticket/" + data.id);
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
    const restart = () => {
        const editData = [];
        setArticulos([...editData]);
        const init = { ...item };
        init.persona.id = 0;
        init.persona.nombre = "";
        init.serie_doc = "";
        init.numero_doc = "";
        setCambio(0);
        setItem(item => ({
            ...init
        }));
        window.location.reload();

    }

    const onclickDelItem = (e, itemId) => {
        e.preventDefault();
        const index = articulos.findIndex(item => {
            return item.id === itemId;
        });
        const editData = articulos;
        editData.splice(index, 1);
        setArticulos([...editData]);
    }
    const logChange = (logChange) => {
        const exist = articulos.find(item => item.codigo === logChange.codigo);
        if (exist === undefined) {
            prepareAdd(logChange);
        } else {
            mesajeResultado('Elemento ya agregado a la venta', 'warning');
        }
    }
    const handlePago = (e) => {
        e.preventDefault();
        const cambioTmp = e.target.value - total;
        setCambio(cambioTmp);

        const deepClone = JSON.parse(JSON.stringify(item))

        deepClone.pago = +e.target.value;
        deepClone.cambio = cambioTmp;
        console.log(deepClone.cambio);
        setItem(deepClone);
    }
    const logChangeTI = (e) => {
        const newItem = { ...item };
        newItem.tipoComprobante = +e.value;
        setItem(newItem);
    }

    const onChangeValue = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    }

    const handleDataPago = (e) => {
        setPago({ ...pago, [e.target.name]: e.target.value });
    }

    return (
        <>
            {
                loading ? (
                    <ClipLoader
                        size={75}
                        color='#8cc84b'
                        loading={loading}
                    />
                ) : (
                    <>
                        <div className="row bg-warning" style={{ lineHeight: 2.5, padding: 5 }}>
                            <div className="col-md-6 text-red">
                                <h4>Venta de productos</h4>
                            </div>
                            <div className="col-md-6 text-red">
                                <h4>Sucursal {sucursal}</h4>
                            </div>
                        </div>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="lead"> <b>Tipo de Egreso</b></p>
                                    <div>
                                        <Select
                                            defaultValue={optionsTI[0]}
                                            options={optionsTI}
                                            onChange={(e) => logChangeTI(e)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <p className="lead"><b>Fecha venta</b></p>
                                    <DatePicker
                                        selected={item.fechaegreso}
                                        onChange={(e) => setItem({ ...item, ['fechaegreso']: e })}
                                        className="form-control"
                                        customInput={
                                            <MaskedInput
                                                mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                            />
                                        }
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="lead"> <b>Buscar por código de producto</b></p>
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
                                <div className="col-md-12">
                                    <label for="comentario" className="col-sm-2 col-form-label">OBSERVACIONES</label>
                                    <input type="text" name="comentario" className="form-control" onChange={onChangeValue} />                                
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Existencia</th>
                                            <th>Cantidad</th>
                                            <th>Producto</th>
                                            <th>Precio venta</th>
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
                                                                max={item.existencia}
                                                            />
                                                        </td>
                                                        <td>{item.descripcion}</td>
                                                        <td>
                                                            <input
                                                                onChange={(e) => onChangeInputPV(e, item.id)}
                                                                type="number"
                                                                name="precio_venta"
                                                                defaultValue={item.precio_venta}
                                                                min="1"
                                                            />

                                                        </td>
                                                        <td>{numeroAQuetzales(item.cantidad * item.precio_venta)}</td>
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
                                    <h1>Total venta:</h1>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3">
                                    <h1>{numeroAQuetzales(total)}</h1>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label for="nit" className="col-sm-2 col-form-label">NIT</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" onChange={(e) => setNit(e.target.value)} name="nit" id="nit" placeholder={item.persona.codigo} />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button"
                                                onClick={handleSearchCliente}>
                                                <i className='fa fa-search'></i>
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
                            <br />

                            <div onChange={onChangeValue}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="1" name="tipopago" />
                                    <label className="form-check-label">Pago de contado</label>
                                    {
                                        item.tipopago === "1"
                                            ?
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <h1>Pago:</h1>
                                                </div>
                                                <div className="col-md-3">
                                                    <input
                                                        type="number"
                                                        className="form-control mb-2 mr-sm-2"
                                                        id="pago"
                                                        name="pago"
                                                        placeholder="Pago"
                                                        onChange={handlePago}
                                                        min="1"
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <h1>Cambio:</h1>
                                                </div>
                                                <div className="col-md-3">
                                                    <h1>{numeroAQuetzales(cambio)}</h1>
                                                </div>
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" value="0" name="tipopago" />
                                    <label className="form-check-label">Pago al crédito</label>
                                    {
                                        item.tipopago === "0"
                                            ?
                                            <div className='row'>
                                                <div className="col">
                                                    <label for="abono" className="col-sm-2 col-form-label">ABONO</label>
                                                    <input type="number" name="abono" className="form-control" placeholder="Q." onChange={handleDataPago} />
                                                </div>
                                                <div className="col">
                                                    <label for="observaciones" className="col-sm-2 col-form-label">COMENTARIO</label>
                                                    <input type="text" name="observaciones" className="form-control" onChange={handleDataPago} />
                                                </div>
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </div>
                            </div>
                            <br /> <br />
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleMakeSale}>Realizar Venta</button>
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                        </form>
                    </>
                )
            }
        </>
    )
}

export default BuscadorPorCodigo