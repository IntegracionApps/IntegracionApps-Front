import { FormControl, FormHelperText, Input, InputLabel, makeStyles, MenuItem, Select, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import axios from "axios";
import { Field, Form, useFormik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import '../styles/Formulario.css';

// const useStyles = makeStyles({
//     input: {
//         margin: "5% 0 5% 0",
//         // minWidth: '50%',
//     },
// });

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

    email: yup
        .string()
        .email('Ingrese un e-mail válido')
        .required('¡Este campo es obligatorio!'),

    telefono: yup
        .string()
        .matches(Number, "Ingrese únicamente números")
        .required('¡Este campo es obligatorio!')
        .min(11, 'El número ingresado es muy corto'),

    medioPago: yup
        .string()
        .required('¡Este campo es obligatorio!'),

    pagoRealizado: yup
        .string()
        .matches(Number, "Ingrese únicamente números"),
});


export default function NuevaVenta(props) {
    const history = useHistory();
    const [receive, setReceive] = useState(props.location.state.toSend);

    const [successOpen, setSuccessOpen] = useState(false)

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            direccion: '',
            altura: '',
            piso: '',
            dni: '',
            email: '',
            telefono: '',
            fechaEmision: new Date(),
            items: receive.items,
            subTotal: receive.subtotal,
            total: receive.total,
            descuentoTotal: receive.subtotal - receive.total,
            medioPago: '',
            pagoRealizado: '',
            vuelto: null,
            estado: 'Emitido',
            otros1: 'IVA RESPONSABLE INSCRIPTO',
            otros2: 'A RESPONSABLE FINAL',
            sucursal: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.medioPago == 'Crédito' || values.medioPago == 'Débito') {
                console.log("IN");
                values.pagoRealizado = values.total;
                values.vuelto = 0;
            }
            if (values.medioPago == 'Efectivo') {
                values.vuelto = values.pagoRealizado - receive.total;
            }

            console.log(JSON.stringify(values, null, 2));
            axios.post("http://localhost:5000/add", {
                values: values,
            })
                .then(function (response) {
                    console.log(response.status + " " + response.statusText);
                    if (response.status >= 200) {
                        setSuccessOpen(true);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
    });

    // const classes = useStyles();
    // var refresh = false;

    useEffect(() => {

        axios.get("http://localhost:5000/Markets/get/all")
            .then((res) => {
                formik.values.sucursal = res.data;
            })
            .catch((err) => {
                console.log(err);
            })

        // refresh = true;
        // console.log(formik.values);
    }, [])


    function handleGoTo() {
        localStorage.setItem("finished", true);
        history.push('/Home');
}

    return (
        <div>
            <Header />
            <h1>Nueva Venta</h1>
            <div className="content">
                <div>
                    <form onSubmit={formik.handleSubmit} className="form">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                            <TextField
                                name="nombre"
                                label="Nombre *"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre && formik.errors.nombre}
                            />
                            <TextField
                                name="apellido"
                                label="Apellido *"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                                helperText={formik.touched.apellido && formik.errors.apellido}
                            />

                        </div>
                        <TextField
                            name="direccion"
                            label="Dirección *"
                            value={formik.values.direccion}
                            onChange={formik.handleChange}
                            className={"root"}
                            error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                            helperText={formik.touched.direccion && formik.errors.direccion}
                        />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                            <TextField
                                name="altura"
                                label="Altura *"
                                value={formik.values.altura}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.altura && Boolean(formik.errors.altura)}
                                helperText={formik.touched.altura && formik.errors.altura}
                            />

                            <TextField
                                name="piso"
                                label="Piso"
                                value={formik.values.piso}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.piso && Boolean(formik.errors.piso)}
                                helperText={formik.touched.piso && formik.errors.piso}
                            />
                        </div>

                        <TextField
                            className={"root"}
                            id="email"
                            name="email"
                            label="E-mail *"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={"root"}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                            <TextField
                                name="dni"
                                label="DNI *"
                                value={formik.values.dni}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.dni && Boolean(formik.errors.dni)}
                                helperText={formik.touched.dni && formik.errors.dni}
                            />


                            <TextField
                                name="telefono"
                                label="Teléfono *"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                helperText={formik.touched.telefono && formik.errors.telefono}
                            />
                        </div>

                        <select id="medioPago" value={formik.values.medioPago} label="Seleccione un medio de pago *" onChange={formik.handleChange} >
                            <option value=''>Seleccione un medio de pago</option>
                            <option value="Efectivo">Efectivo</option>
                            <option value="Crédito">Crédito</option>
                            <option value="Débito">Débito</option>
                        </select>
                        {formik.errors.medioPago && <div style={{ color: "#ff0000" }}>{formik.errors.medioPago}</div>}

                        {formik.values.medioPago != "Efectivo" ? null :
                            <div>
                                <TextField
                                    fullWidth
                                    name="pagoRealizado"
                                    label="¿Cuánto efectivo se entregó?"
                                    value={formik.values.pagoRealizado}
                                    onChange={formik.handleChange}
                                    error={formik.touched.pagoRealizado && Boolean(formik.errors.pagoRealizado)}
                                    helperText={formik.touched.pagoRealizado && formik.errors.pagoRealizado}
                                />
                                <Typography>Monto a pagar: {formik.values.total.toFixed(2)}</Typography>
                            </div>
                        }

                        <Button type="submit" style={{ backgroundColor: "lightgreen", color: "black", width: "auto", marginTop: "7.5%" }}>Confirmar Compra</Button>
                        <Button onClick={() => { history.goBack() }} style={{ backgroundColor: "lightsalmon", color: "black", width: "auto", marginTop: "7.5%" }}>Volver</Button>
                    </form>
                </div>
            </div>
            <Dialog open={successOpen} onClose={() => {setSuccessOpen(false)}}>
                    <DialogTitle>¡Éxito!</DialogTitle>
                    <DialogContent>
                        <Typography>La operación se realizó con éxito</Typography>
                        <Typography>¡Gracias por elegirnos!</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {handleGoTo()}}>Al Menú Principal</Button>
                    </DialogActions>
            </Dialog>
        </div >
    )
}