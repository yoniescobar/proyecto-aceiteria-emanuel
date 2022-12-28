import React, { useState } from 'react'
import { getEgresoByCodeCliente, updEgreso } from '../ventas/ventas'
import numeroAQuetzales from "../../utils/util"
import { dateToGTFormat } from '../../utils/util'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


function Creditos() {
    const mesajeConfirmar = (mensaje, clase) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    };
    const mesajeResultado = (mensaje, clase) => {
        Swal.fire(
            mensaje,
            '',
            clase
        )
    };
    const [pago, setPago] = useState({
        codigo: ''
    });
    const [creditos, setCreditos] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [credito, setCredito] = useState({
        id: 0,
        pagos: []
    });
    const [validated, setValidated] = useState(false);
    const [newpago, setNewpago] = useState({
        tipopago: 1,
        abono: 0,
        fechapago: dateToGTFormat(new Date()),
        saldo: 0,
        observaciones: ""
    });
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        getEgresoByCodeCliente(pago.codigo).then(
            data => {
                if (data.id > 0) {
                    setCreditos(data.data);
                } else {
                    mesajeResultado(data.msj, 'info');
                }
            }
        )
    }

    const handleFormChanges = (e) => {
        setPago({ ...pago, [e.target.name]: e.target.value });
    }

    const handleSumbitPago = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        e.preventDefault();
        setValidated(true);
        //const creditoCP = { ...credito };
        const deepClone = JSON.parse(JSON.stringify(credito));
        const newPagoCP = JSON.parse(JSON.stringify(newpago));
        //newpago.id=crypto.randomUUID();
        newPagoCP.saldo = deepClone.pagopendiente - newPagoCP.abono;
        deepClone.pagopendiente = deepClone.pagopendiente - newPagoCP.abono;
        deepClone.pagos.push(newPagoCP);

        //console.log(creditoCP.pagos);
        //console.log(crypto.randomUUID());
        //
        console.log(deepClone);

        updEgreso(deepClone).then(
            data => {
                if (data.id > 0) {
                    mesajeResultado('Pago registrado exitosamente!', 'success');
                    window.location.reload();
                    navigate("/creditos");
                } else {
                    mesajeResultado(data.msj, 'info');
                }
            }
        )
        //setCredito(creditoCP);
        //mesajeConfirmar('Datos de facturación incorrectos', 'warning');
    }

    const handleChangesFormNewPago = (e) => {
        setNewpago({ ...newpago, [e.target.name]: e.target.value });
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Pagos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const handleOptionsCredito = (item) => {
        setCredito(item);
        //setModalShow(true);
    }

//    const handleClose = (e) => {
//        console.log(e.target.value);
//        setModalShow(false);
//    }

    return (
        <>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <label for="codigo" className="col-sm-2 col-form-label">Número de NIT</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" onChange={handleFormChanges} name="codigo" id="codigo" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="submit">
                                        <i className='fa fa-search'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Serie</th>
                            <th>No. Documento</th>
                            <th>Total</th>
                            <th>Saldo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            creditos.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.fechaegreso}</td>
                                    <td>{item.serie_doc}</td>
                                    <td>{item.numero_doc}</td>
                                    <td>{numeroAQuetzales(item.total_egreso)}</td>
                                    <td>{numeroAQuetzales(item.pagopendiente)}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => handleOptionsCredito(item)}
                                        >
                                            <i className='fa fa-edit'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <hr />
            {
                credito.id > 0 ? (
                    <>
                        <Form noValidate validated={validated} onSubmit={handleSumbitPago}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tipo de pago</Form.Label>
                                <Form.Select required name="tipopago" onChange={handleChangesFormNewPago}>
                                    <option value="1" checked>Efectivo</option>
                                </Form.Select>
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Monto</Form.Label>
                                <Form.Control type="numer" placeholder="Q." name="abono" required onChange={handleChangesFormNewPago} />
                                <Form.Control.Feedback type="invalid">
                                    Porfavor, ingrese un monto.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Observaciones</Form.Label>
                                <Form.Control as="textarea" rows={3} name="observaciones" onChange={handleChangesFormNewPago} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Registrar pago
                            </Button>
                        </Form>
                        <br />
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Abono</th>
                                    <th>Saldo</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    credito.pagos.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.fechapago}</td>
                                            <td>{numeroAQuetzales(item.abono)}</td>
                                            <td>{numeroAQuetzales(item.saldo)}</td>
                                            <td>{item.observaciones}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div></div>
                )
            }
        </>
    )
}

export default Creditos
