import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, Input, MenuItem, Select, InputLabel, FormControl, makeStyles } from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useReducer, useRef } from "react";
import * as yup from 'yup';

const useStyles = makeStyles({
    input: {
        margin: "0 5% 5% 0",
        // minWidth: '50%',
    },
});

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

export default function DialogAdd(props) {
    const { open, onClose } = props;

    const formRef= useRef();

    const handleSubmit = () => {
        if (formRef.current) {
          formRef.current.handleSubmit()
        }
      }
      

    const classes = useStyles();

    return (
        <React.Fragment>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>Nuevo Empleado</DialogTitle>
                <DialogContent dividers>
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
                            rol: '',
                            salario: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log("IN");
                            axios.post('http://localhost:5000/Users/add/employee', {
                                cliente: values,
                            })
                                .then((res) => {
                                    alert(res.data + " " + res.status + ": " + res.statusText);
                                })
                                .catch((err) => {
                                    alert(JSON.stringify(err));
                                })
                        }}

                        innerRef={formRef}
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
                               
                                <Field placeholder="Rol" id="rol" name="rol" className='input-field' />
                                {errors.rol && touched.rol ? (
                                    <div>{errors.rol}</div>
                                ) : null}
                               
                                <Field placeholder="Salario" id="salario" name="salario" className='input-field' />
                                {errors.salario && touched.salario ? (
                                    <div>{errors.salario}</div>
                                ) : null}


                                {/* <button type="submit">Submit</button> */}
                            </Form>
                        )}

                    </Formik>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="secondary">Crear</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}