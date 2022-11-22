import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Venta = () => (
  <div className="container">
    <div>
      <h1>Listado de ventas</h1>
    </div>
    <div>
      <Link to="/venta/agregar">
        <button type="button" class="btn btn-large btn-block btn-primary">Agregar venta</button>
      </Link>
    </div> 
  </div>
);

Venta.propTypes = {};

Venta.defaultProps = {};

export default Venta;
