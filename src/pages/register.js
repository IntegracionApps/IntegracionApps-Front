import { Button } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import axios from "axios";
import * as yup from 'yup';
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Login.css";

const Number = /^[0-9]+$/;

const validationSchema = yup.object({

    nombre: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'Ingrese únicamente letras')
        .required('¡Este campo es obligatorio!'),

    apellido: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'Ingrese únicamente letras')
        .required('¡Este campo es obligatorio!'),

    direccion: yup
        .string()
        //.matches(/^[A-Za-z]$/,'Ingrese únicamente letras')
        .required('¡Este campo es obligatorio!'),

    altura: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!'),

    piso: yup
        .string()
        .optional(),

    dni: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!')
        .min(7, 'El DNI ingresado no es correcto')
        .max(8, 'El DNI ingresado no es correcto'),

    cuil: yup
        .string()
        .matches('([0-9]+(-[0-9]+)+)', "El formato del CUIL es incorrecto")
        .required("¡Este campo es obligatorio!"),

    email: yup
        .string()
        .email('Ingrese un e-mail válido')
        .required('¡Este campo es obligatorio!'),

    telefono: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!')
        .min(11, 'El número ingresado es muy corto'),

    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, "La contraseña debe tener al menos 1 minúscula")
        .matches(/\w*[A-Z]\w*/, "La contraseña debe tener al menos 1 mayúscula")
        .matches(/\d/, "La contraseña debe tener al menos 1 número")
        .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
        .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
        .required('La contraseña es obligatoria'),

});

const Register = () => {
    const history = useHistory();

    return (
        <body>
            <div className="container_login">
                <div className="forms-container">
                    <Formik
                        initialValues={{
                            dni: '',
                            cuil: '',
                            nombre: '',
                            apellido: '',
                            email: '',
                            direccion: '',
                            altura: '',
                            piso: '',
                            telefono: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log("IN");
                            axios.post('http://localhost:5000/Users/add/client', {
                                cliente: values,
                            })
                                .then((res) => {
                                    alert(res.data + " " + res.status + ": " + res.statusText);
                                })
                                .catch((err) => {
                                    alert(JSON.stringify(err));
                                })
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field placeholder="DNI" id="dni" name="dni" className='input-field' />
                                {errors.dni && touched.dni ? (
                                    <div>{errors.dni}</div>
                                ) : null}

                                <Field placeholder="CUIL" id="cuil" name="cuil" className='input-field' />
                                {errors.cuil && touched.cuil ? (
                                    <div>{errors.cuil}</div>
                                ) : null}

                                <Field placeholder="Nombre(s)" id="nombre" name="nombre" className='input-field' />
                                {errors.nombre && touched.nombre ? (
                                    <div>{errors.nombre}</div>
                                ) : null}

                                <Field placeholder="Apellido(s) " id="apellido" name="apellido" className='input-field' />
                                {errors.apellido && touched.apellido ? (
                                    <div>{errors.apellido}</div>
                                ) : null}

                                <Field placeholder="E-Mail" id="email" name="email" className='input-field' />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}

                                <Field placeholder="Dirección" id="direccion" name="direccion" className='input-field' />
                                {errors.direccion && touched.direccion ? (
                                    <div>{errors.direccion}</div>
                                ) : null}

                                <Field placeholder="Altura" id="altura" name="altura" className='input-field' />
                                {errors.altura && touched.altura ? (
                                    <div>{errors.altura}</div>
                                ) : null}

                                <Field placeholder="Piso" id="piso" name="piso" className='input-field' />
                                {errors.piso && touched.piso ? (
                                    <div>{errors.piso}</div>
                                ) : null}

                                <Field placeholder="Teléfono" id="telefono" name="telefono" className='input-field' />
                                {errors.telefono && touched.telefono ? (
                                    <div>{errors.telefono}</div>
                                ) : null}

                                <Field placeholder="Contraseña" id="password" name="password" className='input-field' />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}


                                <button type="submit">Submit</button>
                            </Form>
                        )}

                    </Formik>

                    <Button className="btnLogin" onClick={() => { history.goBack() }}>Volver</Button>
                </div>
            </div>
        </body>
    )
}

export default Register