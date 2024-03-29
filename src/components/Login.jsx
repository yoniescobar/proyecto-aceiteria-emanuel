import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { setUserSession } from "../utils/token";
import { PeticionGet } from '../Servicios/PeticionServicio'
import { alertMensaje } from '../utils/alert';

const baseUrl = process.env.REACT_APP_BASE_URL

const Login = () => {
  const [error, setError] = useState(null);
  const [form, SetForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;

    SetForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await PeticionGet(`Usuario/usuario/${form.username}/password/${form.password}`);
    validarUsuario(response);
  }

  const validarUsuario = (response) => {
    if (response && response.data.data.length == 1) {
      const usuario = response.data.data[0];
      console.log(usuario);
      setUserSession(usuario.usuario, usuario.usuario, usuario.nombre, usuario.id);
      window.location.href = "/";
    } else {
      alertMensaje('Datos no encontrados, verifique sus credenciales.', 'warning')
    }
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={5} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-12" style={{ textAlign: "center" }}>
                    {/* <img src={require("../img/logo-1.png")} /> */}
                  </div>
                  <p className=" mb-5"></p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Usuario:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su usuario"
                          name="username"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Ingrese su Contraseña"
                          name="password"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      {error && (
                        <div
                          className="alert alert-danger alert-dismissible fade show"
                          role="alert"
                        >
                          <strong>Alerta! &nbsp;</strong>
                          {error}
                        </div>
                      )}
                      <div className="d-grid">
                        <Button
                          onClick={onSubmit}
                          style={{
                            backgroundColor: "#213158",
                          }}
                        >
                          Iniciar Sesión
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="footer-copyright text-center py-3">
              {" "}
              <Form.Label style={{ textDecoration: "white" }}>
              </Form.Label>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login