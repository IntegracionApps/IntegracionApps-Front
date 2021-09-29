import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import axios from "axios";
import * as yup from 'yup'
import { Field, Form, Formik } from "formik";
import React, { useRef } from "react";

const Number = /^[0-9]+$/;

const validationSchema = yup.object({

    nombre: yup
        .string()
        .required('¡Este campo es obligatorio!'),

    descripcion: yup
        .string()
        .required('¡Este campo es obligatorio!'),

    tipoUnidad: yup
        .string()
        .matches(/^[a-zA-Z_]+$/, 'Ingrese una sola palabra')
        .required('¡Este campo es obligatorio!'),

    price: yup
        .string()
        .matches(/[0-9.]/, "Ingrese un número decimal")
        .required('¡Este campo es obligatorio!'),

    stock: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!'),


    puntoRepo: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!')
});

export default function CreateItemDialog(props) {
    const { setRefresh, open, onClose } = props;

    const handleClose = () => {
        onClose();
    }

    const formRef = useRef();

    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    }

    return (
        <React.Fragment>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Nuevo Producto</DialogTitle>
                <DialogContent dividers>
                    <Formik
                        initialValues={{
                            nombre: '',
                            descripcion: '',
                            categoria: '',
                            tipoUnidad: '',
                            price: '',
                            stock: '',
                            puntoRepo: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log("IN");
                            axios.post('http://localhost:5000/Products/add/', {
                                producto: values,
                            })
                                .then((res) => {
                                    alert(res.data + " " + res.status + ": " + res.statusText);
                                    if (res.status === 200) {
                                        handleClose();
                                        setRefresh();
                                    }
                                })
                                .catch((err) => {
                                    alert(JSON.stringify(err));
                                })
                        }}

                        innerRef={formRef}
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <Field placeholder="Nombre" id="nombre" name="nombre" className='input-field' />
                                {errors.nombre && touched.nombre ? (
                                    <div>{errors.nombre}</div>
                                ) : null}

                                <Field placeholder="Descripción" id="descripcion" name="descripcion" className='input-field' />
                                {errors.descripcion && touched.descripcion ? (
                                    <div>{errors.descripcion}</div>
                                ) : null}

                                <Field placeholder="Categoría" id="categoria" name="categoria" className='input-field' />
                                {errors.categoria && touched.categoria ? (
                                    <div>{errors.categoria}</div>
                                ) : null}

                                <Field placeholder="Tipo de Unidad" id="tipoUnidad" name="tipoUnidad" className='input-field' />
                                {errors.tipoUnidad && touched.tipoUnidad ? (
                                    <div>{errors.tipoUnidad}</div>
                                ) : null}

                                <Field placeholder="Precio Unitario" id="price" name="price" className='input-field' />
                                {errors.price && touched.price ? (
                                    <div>{errors.price}</div>
                                ) : null}

                                <Field placeholder="Stock" id="stock" name="stock" className='input-field' />
                                {errors.stock && touched.stock ? (
                                    <div>{errors.stock}</div>
                                ) : null}

                                <Field placeholder="Punto de Reposición" id="puntoRepo" name="puntoRepo" className='input-field' />
                                {errors.puntoRepo && touched.puntoRepo ? (
                                    <div>{errors.puntoRepo}</div>
                                ) : null}

                                {/* <button type="submit">Submit</button> */}
                            </Form>
                        )}

                    </Formik>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="secondary">Confirmar Alta</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
