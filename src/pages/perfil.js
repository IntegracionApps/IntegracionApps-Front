import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as yup from 'yup';
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
        .matches(/^[A-Za-z]+ /, 'Ingrese únicamente letras')
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
});


export default function MiPerfil(props) {
    const history = useHistory();

    const user = JSON.parse(window.localStorage.getItem("user"));
    // console.log(receive);
    console.log(user);
    const [successOpen, setSuccessOpen] = useState(false);
    const [willEdit, setWillEdit] = useState(false);

    if (user.ubicacion.piso.length === 0) {
        user.ubicacion.piso = '-';
    }

    const formik = useFormik({
        initialValues: {
            nombre: user.nombre,
            apellido: user.apellido,
            direccion: user.ubicacion.direccion,
            altura: user.ubicacion.altura,
            piso: user.ubicacion.piso,
            dni: user.dni,
            email: user.email,
            telefono: user.telefono,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post("http://localhost:5000/Users/edit/client", {
                cliente: values,
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
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {

        setRefresh(false);
        // console.log(formik.values);
    }, [refresh])


    function handleGoTo() {
        setSuccessOpen(false);
        setRefresh(true);
        setWillEdit(false);
    }

    return (
        <div>
            <Header />
            <h1>Perfil usuario</h1>
            <div className="content">
                <div>
                    <form onSubmit={formik.handleSubmit} className="form">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                            <TextField
                                name="nombre"
                                label="Nombre *"
                                disabled={true}
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre && formik.errors.nombre}
                            />
                            <TextField
                                name="apellido"
                                label="Apellido *"
                                disabled={true}
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
                            disabled={!willEdit}
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
                                disabled={!willEdit}
                                value={formik.values.altura}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.altura && Boolean(formik.errors.altura)}
                                helperText={formik.touched.altura && formik.errors.altura}
                            />

                            <TextField
                                name="piso"
                                label="Piso"
                                disabled={!willEdit}
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
                            disabled={!willEdit}
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
                                disabled={true}
                                value={formik.values.dni}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.dni && Boolean(formik.errors.dni)}
                                helperText={formik.touched.dni && formik.errors.dni}
                            />


                            <TextField
                                name="telefono"
                                label="Teléfono *"
                                disabled={!willEdit}
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                className={"root"}
                                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                helperText={formik.touched.telefono && formik.errors.telefono}
                            />
                        </div>

                        {/* <TextField
                            name="telefono"
                            label="Teléfono *"
                            disabled={!willEdit}
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                            className={"root"}
                            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                            helperText={formik.touched.telefono && formik.errors.telefono}
                        />
 */}

                        {willEdit ?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <Button type="submit" style={{ backgroundColor: "lightgreen", color: "black", width: "auto", marginTop: "7.5%" }}>Confirmar cambios</Button>
                                <Button onClick={() => { setWillEdit(false); }} style={{ backgroundColor: "lightgreen", color: "black", width: "auto", marginTop: "7.5%" }}>Cancelar edición</Button>
                            </div>
                            :
                            <>
                                <Button onClick={() => { setWillEdit(true); }} style={{ backgroundColor: "lightgreen", color: "black", width: "auto", marginTop: "7.5%" }}>Editar mis Datos</Button>
                            </>
                        }
                        <Button onClick={() => { history.goBack() }} style={{ backgroundColor: "lightsalmon", color: "black", width: "auto", marginTop: "7.5%" }}>Al Catálogo de Productos</Button>

                    </form>
                </div>
            </div>
            <Dialog open={successOpen} onClose={() => { setSuccessOpen(false) }}>
                <DialogTitle>¡Éxito!</DialogTitle>
                <DialogContent>
                    <Typography>La operación se realizó con éxito</Typography>
                    {/* <Typography>¡Gracias por elegirnos!</Typography> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleGoTo() }}>Cerrar diálogo</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}