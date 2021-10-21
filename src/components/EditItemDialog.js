import urlWebServices from "../webServices";
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

    descrip: yup
        .string()
        .required('¡Este campo es obligatorio!'),

    categoria: yup
        .string()
        .matches(/^[a-zA-Z_]+$/, 'Ingrese una sola palabra')
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

export default function EditItemDialog(props) {
    const { item, refresh, open, onClose } = props;
    const editRef = useRef();

    const handleClose = () => {
        onClose();
    }


    function handleSubmit() {
        console.log("IN");
        if (editRef.current) {
            editRef.current.handleSubmit();
        }
    }

    return (
        <React.Fragment>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogContent dividers>
                    <Formik
                        initialValues={{
                            nombre: item.nombre,
                            descrip: item.descrip,
                            categoria: item.categoria,
                            tipoUnidad: item.tipoUnidad,
                            price: item.price,
                            stock: item.stock,
                            puntoRepo: item.puntoRepo,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log("IN");
                            axios.post(urlWebServices.updateProduct, {
                                producto: values,
                            })
                                .then((res) => {
                                    alert(res.data + " " + res.status + ": " + res.statusText);
                                    if (res.status === 200) {
                                        handleClose();
                                        refresh();
                                    }
                                })
                                .catch((err) => {
                                    alert(JSON.stringify(err));
                                })
                        }}

                        innerRef={editRef}
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <label for="fname" >Nombre:</label>
                                <Field placeholder="Nombre" id="nombre" name="nombre" className='input-field' />
                                 {errors.nombre && touched.nombre ? (
                                    <div>{errors.nombre}</div>
                                ) : null}

                                <label for="fname">Descripción:</label>
                                <Field placeholder="Descripción" id="descrip" name="descrip" className='input-field' />
                                {errors.descrip && touched.descrip ? (
                                    <div>{errors.descrip}</div>
                                ) : null}

                                <label for="Categoría">Categoría:</label>
                                <Field placeholder="Categoría" id="categoria" name="categoria" className='input-field' />
                                {errors.categoria && touched.categoria ? (
                                    <div>{errors.categoria}</div>
                                ) : null}

                                <label for="Categoría">Tipo de Unidad:</label>
                                <Field placeholder="Tipo de Unidad" id="tipoUnidad" name="tipoUnidad" className='input-field' />
                                {errors.tipoUnidad && touched.tipoUnidad ? (
                                    <div>{errors.tipoUnidad}</div>
                                ) : null}

                                <label for="Categoría">Precio Unitario:</label>
                                <Field placeholder="Precio Unitario" id="price" name="price" className='input-field' />
                                {errors.price && touched.price ? (
                                    <div>{errors.price}</div>
                                ) : null}

                                <label for="Categoría">Stock:</label>
                                <Field placeholder="Stock" id="stock" name="stock" className='input-field' />
                                {errors.stock && touched.stock ? (
                                    <div>{errors.stock}</div>
                                ) : null}

                                <label for="Categoría">Punto de Reposición:</label>
                                <Field placeholder="Punto de Reposición" id="puntoRepo" name="puntoRepo" className='input-field' />
                                {errors.puntoRepo && touched.puntoRepo ? (
                                    <div>{errors.puntoRepo}</div>
                                ) : null}

                                {/*<button type="submit">Submit</button>*/}
                            </Form>
                        )}

                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={() => { handleSubmit(); }} color="secondary">Confirmar Modificación</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
