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
    });


    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        // Create a deep copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors));

        // Force validate all the fields
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { nombre, descripcion, condicion } = form;

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
