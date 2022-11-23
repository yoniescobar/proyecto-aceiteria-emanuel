import { Form } from "react-router-dom";

export default function AddVenta() {
  return (
    <>
    <div className="container">
      <Form method="post" className="form-inline">
        <label for="codigo">Código:   </label>
        <input 
          type="text" 
          className="form-control mb-2 mr-sm-2" 
          id="codigo" 
          name="codigo"
          placeholder="Código" />
        <button type="button" className="btn btn-primary mb-2">Buscar</button>
      </Form>
    </div>
    </>
  )
}
