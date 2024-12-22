import { object, string, ref } from 'yup';

export const signUpSchema = object({
    repeatedPassword: string()
        .required('Debe repetir la contraseña')
        .oneOf([ref('password'), null], 'Las contraseñas no coinciden'),
    password: string()
        .required('Debe ingresar una contraseña')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .matches(/\d/, 'La contraseña debe contener al menos un número'),
    email: string()
        .required('Debe ingresar un correo electrónico')
        .email('Ingrese un correo electrónico válido'),
    birthDate: string()
        .required('Debe ingresar una fecha de nacimiento')
        .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'La fecha de nacimiento debe tener el formato dd/mm/aaaa'),
    dni: string()
        .required('Debe ingresar un DNI')
        .matches(/^\d{1,8}$/, 'El DNI debe contener solo números y un máximo de 8 caracteres'),
    lastName: string()
        .required('Debe ingresar su apellido')
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El apellido solo puede contener letras y espacios'),
    name: string()
        .required('Debe ingresar su nombre')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'El nombre solo puede contener letras y espacios'),
});