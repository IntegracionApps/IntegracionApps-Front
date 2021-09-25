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

    name: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'Ingrese únicamente letras')
        .required('¡Este campo es obligatorio!'),

    lastName: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'Ingrese únicamente letras')
        .required('¡Este campo es obligatorio!'),

    address: yup
        .string()
        //.matches(/^[A-Za-z]$/,'Ingrese únicamente letras')
        .required('¡Este campo es obligatorio!'),

    height: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!'),

    floor: yup
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

    phone: yup
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
                            name: '',
                            lastName: '',
                            email: '',
                            address: '',
                            height: '',
                            floor: '',
                            phone: '',
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
                                ) : null}dni

                                <Field placeholder="CUIL" id="cuil" name="cuil" className='input-field' />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}

                                <Field placeholder="Nombre(s)" id="name" name="name" className='input-field' />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}

                                <Field placeholder="Apellido(s) " id="lastName" name="lastName" className='input-field' />
                                {errors.lastName && touched.lastName ? (
                                    <div>{errors.lastName}</div>
                                ) : null}

                                <Field placeholder="E-Mail" id="email" name="email" className='input-field' />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}

                                <Field placeholder="Dirección" id="address" name="address" className='input-field' />
                                {errors.address && touched.address ? (
                                    <div>{errors.address}</div>
                                ) : null}

                                <Field placeholder="Altura" id="height" name="height" className='input-field' />
                                {errors.height && touched.height ? (
                                    <div>{errors.height}</div>
                                ) : null}

                                <Field placeholder="Piso" id="floor" name="floor" className='input-field' />
                                {errors.floor && touched.floor ? (
                                    <div>{errors.floor}</div>
                                ) : null}

                                <Field placeholder="Teléfono" id="phone" name="phone" className='input-field' />
                                {errors.phone && touched.phone ? (
                                    <div>{errors.phone}</div>
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