import { useState } from "react";

import {
    inputValidator,
    inputValidatorNamesUsuario,
    inputValidatorPassword,
    emailValidator,
} from "../validator";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const useValidatorForm = form => {
    const [errors, setErrors] = useState({
        nombre: {
            dirty: false,
            error: false,
            message: "",
        },
        descripcion: {
            dirty: false,
            error: false,
            message: "",
        },
        condicion: {
            dirty: false,
            error: false,
            message: "",
        },

        // form articulo
        codigo: {
            dirty: false,
            error: false,
            message: "",
        },
        categoria: {
            dirty: false,
            error: false,
            message: "",
        },
        precio_venta: {
            dirty: false,
            error: false,
            message: "",
        },
        precio_compra: {
            dirty: false,
            error: false,
            message: "",
        },
        stockMinimo: {
            dirty: false,
            error: false,
            message: "",
        },
        marca: {
            dirty: false,
            error: false,
            message: "",
        },
        modelo: {
            dirty: false,
            error: false,
            message: "",
        },
        imagen: {
            dirty: false,
            error: false,
            message: "",
        },
        presentacion: {
            dirty: false,
            error: false,
            message: "",
        },
         // fin form articulo
        
        // Inicio form Usuario
        usuario: {
            dirty: false,
            error: false,
            message: "",
        },
        password: {
            dirty: false,
            error: false,
            message: "",
        },
        sucursal: {
            dirty: false,
            error: false,
            message: "",
        },
        // Fin form Usuario

        //Inicio form proveedor
        tipopersona: {
            dirty: false,
            error: false,
            message: "",
        },
        tipo_documento: {
            dirty: false,
            error: false,
            message: "",
        },
        nodocumento: {
            dirty: false,
            error: false,
            message: "",
        },
        direccion: {
            dirty: false,
            error: false,
            message: "",
        },
        telefono: {
            dirty: false,
            error: false,
            message: "",
        },
        correo: {
            dirty: false,
            error: false,
            message: "",
        },
        //Fin form proveedor
        
    });


    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        // Create a deep copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors));

        // Force validate all the fields
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { nombre, descripcion,
        codigo, categoria, precio_venta, precio_compra, stockMinimo, marca, modelo, imagen, presentacion
        ,usuario, password, sucursal,
         tipopersona,tipo_documento,nodocumento,direccion,telefono,correo } = form;

        // Validacion form categoria
        if (nextErrors.nombre.dirty && (field ? field === "nombre" : true)) {
            const nombreMsgError = inputValidator(nombre, form);
            nextErrors.nombre.error = !!nombreMsgError;
            nextErrors.nombre.message = nombreMsgError;
            if (!!nombreMsgError) isValid = false;
        }

        if (nextErrors.descripcion.dirty && (field ? field === "descripcion" : true)) {
            const mensajeError = inputValidator(descripcion, form);
            nextErrors.descripcion.error = !!mensajeError;
            nextErrors.descripcion.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }
        // fin validacion form categoria

        // Inicio validacion articulos
        if (nextErrors.codigo.dirty && (field ? field === "codigo" : true)) {
            const mensajeError = inputValidator(codigo, form);
            nextErrors.codigo.error = !!mensajeError;
            nextErrors.codigo.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.categoria.dirty && (field ? field === "categoria" : true)) {
            const mensajeError = inputValidator(categoria, form);
            nextErrors.categoria.error = !!mensajeError;
            nextErrors.categoria.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.precio_venta.dirty && (field ? field === "precio_venta" : true)) {
            const mensajeError = inputValidator(precio_venta, form);
            nextErrors.precio_venta.error = !!mensajeError;
            nextErrors.precio_venta.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.precio_compra.dirty && (field ? field === "precio_compra" : true)) {
            const mensajeError = inputValidator(precio_compra, form);
            nextErrors.precio_compra.error = !!mensajeError;
            nextErrors.precio_compra.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.stockMinimo.dirty && (field ? field === "stockMinimo" : true)) {
            const mensajeError = inputValidator(stockMinimo, form);
            nextErrors.stockMinimo.error = !!mensajeError;
            nextErrors.stockMinimo.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.marca.dirty && (field ? field === "marca" : true)) {
            const mensajeError = inputValidator(marca, form);
            nextErrors.marca.error = !!mensajeError;
            nextErrors.marca.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.modelo.dirty && (field ? field === "modelo" : true)) {
            const mensajeError = inputValidator(modelo, form);
            nextErrors.modelo.error = !!mensajeError;
            nextErrors.modelo.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.imagen.dirty && (field ? field === "imagen" : true)) {
            const mensajeError = inputValidator(imagen, form);
            nextErrors.imagen.error = !!mensajeError;
            nextErrors.imagen.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.presentacion.dirty && (field ? field === "presentacion" : true)) {
            const mensajeError = inputValidator(presentacion, form);
            nextErrors.presentacion.error = !!mensajeError;
            nextErrors.presentacion.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }
        // fin validacion articulos
        
        // inicio validcion usuario 
        if (nextErrors.usuario.dirty && (field ? field === "usuario" : true)) {
            const mensajeError = inputValidatorNamesUsuario(usuario, form);
            nextErrors.usuario.error = !!mensajeError;
            nextErrors.usuario.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.password.dirty && (field ? field === "password" : true)) {
            const mensajeError = inputValidatorPassword(password, form);
            nextErrors.password.error = !!mensajeError;
            nextErrors.password.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.sucursal.dirty && (field ? field === "sucursal" : true)) {
            const mensajeError = inputValidator(sucursal, form);
            nextErrors.sucursal.error = !!mensajeError;
            nextErrors.sucursal.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }
        // fin validacion usuario

        // inicio validacion proveedor
        if (nextErrors.tipopersona.dirty && (field ? field === "tipopersona" : true)) {
            const mensajeError = inputValidator(tipopersona, form);
            nextErrors.tipopersona.error = !!mensajeError;
            nextErrors.tipopersona.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.tipo_documento.dirty && (field ? field === "tipo_documento" : true)) {
            const mensajeError = inputValidator(tipo_documento, form);
            nextErrors.tipo_documento.error = !!mensajeError;
            nextErrors.tipo_documento.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.nodocumento.dirty && (field ? field === "nodocumento" : true)) {
            const mensajeError = inputValidator(nodocumento, form);
            nextErrors.nodocumento.error = !!mensajeError;
            nextErrors.nodocumento.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }
        if (nextErrors.direccion.dirty && (field ? field === "direccion" : true)) {
            const mensajeError = inputValidator(direccion, form);
            nextErrors.direccion.error = !!mensajeError;
            nextErrors.direccion.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }
        if (nextErrors.telefono.dirty && (field ? field === "telefono" : true)) {
            const mensajeError = inputValidator(telefono, form);
            nextErrors.telefono.error = !!mensajeError;
            nextErrors.telefono.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }

        if (nextErrors.correo.dirty && (field ? field === "correo" : true)) {
            const mensajeError = emailValidator(correo, form);
            nextErrors.correo.error = !!mensajeError;
            nextErrors.correo.message = mensajeError;
            if (!!mensajeError) isValid = false;
        }
    
    
    
    
        
        // fin validacion proveedor

    
        

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };

    const onBlurField = e => {
        const field = e.target.name;
        const fieldError = errors[field];
        if (fieldError.dirty) return;

        const updatedErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                dirty: true,
            },
        };

        validateForm({ form, field, errors: updatedErrors });
    };

    return {
        validateForm,
        onBlurField,
        errors,
    };
};
