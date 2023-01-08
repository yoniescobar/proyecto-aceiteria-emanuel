import { useState } from "react";

import {
    inputValidator,
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
        // 
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
        codigo, categoria, precio_venta, precio_compra, stockMinimo, marca, modelo, imagen, presentacion } = form;

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
