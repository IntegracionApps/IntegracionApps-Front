import { TextField, FormControl, Input, InputLabel, FormHelperText, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import '../styles/Formulario.css'

const useStyles = makeStyles({
    input: {
        margin: "0 5% 5% 0",
        // minWidth: '50%',
    },
});



export default function NuevaVenta() {
    const history = useHistory();
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        address: '',
        floor: '',
        dni: null,
        mail: '',
        phone: null,
    })

    const classes = useStyles();

    const handleName = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            name: event.target.value,
        }));
    };

    const handleLastName = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            lastName: event.target.value,
        }));
    };

    const handleAddress = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            address: event.target.value,
        }));
    };

    const handleFloor = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            floor: event.target.value,
        }));
    };

    const handleDni = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            dni: event.target.value,
        }));
    };

    const handleMail = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            mail: event.target.value,
        }));
    };

    const handlePhone = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            phone: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(values.name + " " + values.lastName + " " + values.address + " " + values.floor + " " + values.dni + " " + values.mail + " " + values.phone);
    }
    return (
        <div>
            <Header />
            <h1>Nueva Venta</h1>
            <div className="content">

                <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                    {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}> */}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between" }}>
                        <FormControl className={classes.input} autoComplete="off" required="true">
                            <InputLabel htmlFor="name">Nombre(s)</InputLabel>
                            <Input id="name" value={values.name} onChange={handleName} />
                            {/* <TextField required onChange={} id="names" label="Nombre(s)" value="" placeholder="p.ej. Juan Andrés" /> */}
                        </FormControl>
                        <FormControl className={classes.input} autoComplete="off" required="true">
                            <InputLabel htmlFor="lastName">Apellido(s)</InputLabel>
                            <Input id="lastName" value={values.lastName} onChange={handleLastName} />
                            {/* <TextField required onChange={handleLastName(event)} id="last-name" label="Apellido" placeholder="p.ej. Pérez de Villar" /> */}
                        </FormControl>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between" }}>
                        <FormControl className={classes.input} autoComplete="off" required="true">
                            <InputLabel htmlFor="address">Dirección</InputLabel>
                            <Input id="address" value={values.address} onChange={handleAddress} />
                            {/* <TextField required onChange={handleAddress(event)} id="address" label="Dirección" placeholder="p.ej Pueyrredón 2048" /> */}
                        </FormControl>
                        <FormControl className={classes.input} autoComplete="off" >
                            <InputLabel htmlFor="floor">Piso</InputLabel>
                            <Input id="floor" value={values.floor} onChange={handleFloor} />
                            {/* <TextField onChange={handleFloor(event)} id="floor" label="Piso" placeholder="14A" /> */}
                        </FormControl>
                    </div>
                    <FormControl className={classes.input} style={{maxWidth: "45%"}} autoComplete="off" required="true">
                        <InputLabel htmlFor="dni">DNI</InputLabel>
                        <Input id="dni" value={values.dni} onChange={handleDni} />
                        {/* <TextField required onChange={handleDni(event)} id="dni" label="DNI" /> */}
                    </FormControl>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent:"space-between" }}>
                        <FormControl className={classes.input} style={{width: "100%"}} autoComplete="off" required="true">
                            <InputLabel htmlFor="mail">E-Mail</InputLabel>
                            <Input id="mail" value={values.mail} onChange={handleMail} type="email" />
                            {/* <TextField required onChange={handleMail(event)} id="mail" label="E-Mail" placeholder="ejemplo.example@email.com" /> */}
                        </FormControl>
                        <FormControl className={classes.input} autoComplete="off" >
                            <InputLabel htmlFor="phone">Teléfono</InputLabel>
                            <Input id="phone" value={values.phone} onChange={handlePhone} type="phone" />
                            <FormHelperText>¡Incluir código de área, sin símbolos!</FormHelperText>
                            {/* <TextField onChange={handlePhone(event)} id="phone" label="Teléfono" helperText="¡Incluir código de área!" /> */}
                        </FormControl>
                        </div>
                        <FormControl className={classes.input} >
                            <Input type="submit" value="Confirmar Compra" />
                        </FormControl>
                    {/* </div>
                     */}
                </form>
                <a onClick={() => { history.goBack() }} style={{ color: "blue" }}>Volver</a>
            </div>
        </div>
    )
}