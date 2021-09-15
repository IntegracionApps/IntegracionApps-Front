import { FormControl, FormHelperText, Input, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import '../styles/Formulario.css';

const useStyles = makeStyles({
    input: {
        margin: "0 5% 5% 0",
        // minWidth: '50%',
    },
});



export default function NuevaVenta(props) {
    const history = useHistory();
    const [receive, setReceive] = useState(props.location.state.toSend);

    //REVISAR
    const [values, setValues] = useState({
        cliente: {
            name: '',
            lastName: '',
            address: '',
            floor: '',
            dni: null,
            mail: '',
            phone: null,
            disponible: '',
        },
        fechaEmision: new Date(),
        items: receive.items,
        subTotal: receive.subtotal,
        total: receive.total,
        descuentoTotal: receive.subtotal - receive.total,
        medioPago: '',
        pagoRealizado: null,
        vuelto: null,
        estado: 'Emitido',
    })

    const classes = useStyles();
    var refresh = false;

    useEffect(() => {
        setValues({
            cliente: {
                name: '',
                lastName: '',
                address: '',
                floor: '',
                dni: null,
                mail: '',
                phone: null,
                disponible: '',
            },
            fechaEmision: new Date(),
            items: receive.items,
            subTotal: receive.subtotal,
            total: receive.total,
            descuentoTotal: receive.subtotal - receive.total,
            medioPago: '',
            pagoRealizado: null,
            vuelto: null,
            estado: 'Emitido',
        });


        refresh = true;
        console.log(values);
    }, [refresh])

    const handleName = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            cliente: {
                ...values.cliente,
                name: event.target.value,
            },
        }));
    };

    const handleLastName = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            cliente: {
                ...values.cliente,
                lastName: event.target.value,
            }
        }));
    };

    const handleAddress = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            cliente: {
                ...values.cliente,
                address: event.target.value,
            }
        }));
    };

    const handleFloor = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            cliente: {
                ...values.cliente,
                floor: event.target.value,
            }
        }));
    };

    const handleDni = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            cliente: {
                ...values.cliente,
                dni: event.target.value,
            }
        }));
    };

    const handleMail = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            cliente: {
                ...values.cliente,
                mail: event.target.value,
            }
        }));
    };

    const handlePhone = (event) => {
        event.preventDefault();
        values.cliente.phone = event.target.value;
        // setValues((values) => ({
        //     ...values,
        //     cliente: {
        //         ...values.cliente,
        //         phone: event.target.value,
        //     }
        // }));
    };

    const handlePayment = (event) => {
        event.preventDefault();
        // values.medioPago = event.target.value;
        setValues((values) => ({
            ...values,
            medioPago: event.target.value,
        }));
    };

    const handleMoney = (event) => {
        event.preventDefault();
        values.pagoRealizado = event.target.value;
        // setValues((values) => ({
        //     ...values,
        //     pagoRealizado: (event.target.value),
        // }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(values.medioPago);
        if (values.medioPago == 'Crédito' || values.medioPago == 'Débito') {
            console.log("IN");
            values.pagoRealizado = values.total;
            values.vuelto = 0;
            // setValues((values) => ({
            //     ...values,
            //     pagoRealizado: values.total,
            //     vuelto: 0,
            // }));
        }
        if (values.medioPago == 'Efectivo') {
            // console.log("Pago: " + typeof (values.pagoRealizado));
            values.vuelto = values.pagoRealizado - receive.total;
            // setValues((values) => ({
            //     ...values,
            //     vuelto: values.pagoRealizado - receive.total,
            // }));
        }
        // console.log("Total: "+values.total);
        // console.log("SubTotal: "+values.subTotal);
        // console.log("Descuento: "+values.descuentoTotal);
        // console.log("Vuelto: "+typeof(values.vuelto));

        axios.post("http://localhost:5000/add", {
            values: values,
        })
            .then(function (response) {
                console.log(response.status + " " + response.statusText);
                if (response.status >= 200) {
                    alert(response.status + " " + response.statusText);
                    history.push('/Home');
                }
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    return (
        <div>
            <Header />
            <h1>Nueva Venta</h1>
            <div className="content">

                <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                    {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}> */}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <FormControl className={classes.input} autoComplete="off" required="true">
                            <InputLabel htmlFor="name">Nombre(s)</InputLabel>
                            <Input id="name" value={values.cliente.name} onChange={handleName} />
                            {/* <TextField required onChange={} id="names" label="Nombre(s)" value="" placeholder="p.ej. Juan Andrés" /> */}
                        </FormControl>

                        <FormControl className={classes.input} autoComplete="off" required="true">
                            <InputLabel htmlFor="lastName">Apellido(s)</InputLabel>
                            <Input id="lastName" value={values.cliente.lastName} onChange={handleLastName} />
                            {/* <TextField required onChange={handleLastName(event)} id="last-name" label="Apellido" placeholder="p.ej. Pérez de Villar" /> */}
                        </FormControl>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <FormControl className={classes.input} autoComplete="off" required="true">
                            <InputLabel htmlFor="address">Dirección</InputLabel>
                            <Input id="address" value={values.cliente.address} onChange={handleAddress} />
                            {/* <TextField required onChange={handleAddress(event)} id="address" label="Dirección" placeholder="p.ej Pueyrredón 2048" /> */}
                        </FormControl>
                        <FormControl className={classes.input} autoComplete="off" >
                            <InputLabel htmlFor="floor">Piso</InputLabel>
                            <Input id="floor" value={values.cliente.floor} onChange={handleFloor} />
                            {/* <TextField onChange={handleFloor(event)} id="floor" label="Piso" placeholder="14A" /> */}
                        </FormControl>
                    </div>
                    <FormControl className={classes.input} style={{ maxWidth: "45%" }} autoComplete="off" required="true">
                        <InputLabel htmlFor="dni">DNI</InputLabel>
                        <Input id="dni" value={values.cliente.dni} onChange={handleDni} type="number" />
                        {/* <TextField required onChange={handleDni(event)} id="dni" label="DNI" /> */}
                    </FormControl>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <FormControl className={classes.input} style={{ width: "100%" }} autoComplete="off" required="true">
                            <InputLabel htmlFor="mail">E-Mail</InputLabel>
                            <Input id="mail" value={values.cliente.mail} onChange={handleMail} type="email" />
                            {/* <TextField required onChange={handleMail(event)} id="mail" label="E-Mail" placeholder="ejemplo.example@email.com" /> */}
                        </FormControl>
                        <FormControl className={classes.input} autoComplete="off" >
                            <InputLabel htmlFor="phone">Teléfono</InputLabel>
                            <Input id="phone" value={values.cliente.phone} onChange={handlePhone} type="phone" />
                            <FormHelperText>¡Incluir código de área, sin símbolos!</FormHelperText>
                            {/* <TextField onChange={handlePhone(event)} id="phone" label="Teléfono" helperText="¡Incluir código de área!" /> */}
                        </FormControl>
                    </div>
                    <FormControl className={classes.input} autoComplete="off">
                        <InputLabel id="payment-dropdown-label">Elija un medio de pago</InputLabel>
                        <Select labelId="payment-dropdown-label" value={values.medioPago} onChange={handlePayment}>
                            <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                            <MenuItem value={"Crédito"}>Crédito</MenuItem>
                            <MenuItem value={"Débito"}>Débito</MenuItem>
                        </Select>
                    </FormControl>
                    {values.medioPago != "Efectivo" ? null :
                        <FormControl className={classes.input} autoComplete="off">
                            <InputLabel htmlFor="cash">¿Cuánto dinero se entregó?</InputLabel>
                            <Input id="cash" value={values.pagoRealizado} onChange={handleMoney} type="number" />
                        </FormControl>
                    }
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