import { Button } from "@material-ui/core";
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import axios from "axios";
import * as yup from 'yup';
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Login.css";

const validationSchema = yup.object({

    email: yup
        .string()
        .email('Ingrese un e-mail válido')
        .required('El E-Mail es obligatorio!'),

    password: yup
        .string()
        .required('¡La contraseña es obligatoria!'),

});



const Login = () => {
    // const [values, setValues] = useState({
    //     mail: "",
    //     password: "",
    // });

    const history = useHistory();

    localStorage.setItem("finished", false);

    // const handleMail = (event) => {
    //     event.preventDefault();
    //     setValues((values) => ({
    //         ...values,
    //         mail: event.target.value,
    //     }));

    // }

    // const handlePass = (event) => {
    //     event.preventDefault();
    //     setValues((values) => ({
    //         ...values,
    //         pass: event.target.value,
    //     }));

    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('http://localhost:5000/Users/get/' + values.mail, {
    //         password: values.pass,
    //     })
    //         .then((res) => {
    //             switch (res.status) {
    //                 case 200:
    //                     console.log(res.data);
    //                     if (res.data !== false) {
    //                         if (res.data.rol === "Administrador") window.localStorage.setItem("rol", 0);
    //                         if (res.data.rol === "Cajero") window.localStorage.setItem("rol", 1);
    //                         if (res.data.rol === "Cliente") window.localStorage.setItem("rol", 2);
    //                         history.push("/Home");
    //                     }
    //                     else alert("Datos ingresados incorrectos");
    //                     break;

    //             }
    //         })
    //         .catch((err) => {
    //             switch (err.response.status) {
    //                 case 404: alert(err.response.data);
    //                     break;
    //                 case 500: console.log(err);
    //                     break;
    //             }
    //         });
    //     // console.log(res.data);
    //     // history.push("/Home");

    // }
    return (
        <body>
            <div className="container_login">
                <div className="forms-container">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values.password);
                            axios.post('http://localhost:5000/Users/get/', {
                                cliente: values,
                            })
                                .then((res) => {
                                    switch (res.status) {
                                        case 200:
                                            console.log(res.data);
                                            if (res.data !== false) {
                                                if (res.data.rol === "Administrador") {
                                                    window.localStorage.setItem("rol", 0);
                                                    history.push("/HomeAdmin");
                                                }
                                                if (res.data.rol === "Cajero") {
                                                    window.localStorage.setItem("rol", 1);
                                                    history.push("/Home");
                                                }
                                                if (res.data.rol === "Cliente") {
                                                    window.localStorage.setItem("dni", res.data.dni);
                                                    window.localStorage.setItem("rol", 2);
                                                    history.push("/Home");
                                                }
                                            }
                                            else alert("Datos ingresados incorrectos");
                                            break;

                                    }
                                })
                                .catch((err) => {
                                    alert(JSON.stringify(err));
                                })
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="inputContainer">
                                    <Field placeholder="E-Mail" id="email" name="email" className='input-field' />
                                    {errors.email && touched.email ? (
                                        <div className="erroresCampos">{errors.email}</div>
                                    ) : null}


                                    <Field placeholder="Contraseña" id="password" name="password">
                                        
                                        {({ field, form, meta }) => (
                                            <React.Fragment>
                                                <input type="password" {...field} placeholder="Contraseña" id="password" name="password" className='input-field' />
                                            </React.Fragment>
                                        )}

                                    </Field>
                                    {errors.password && touched.password ? (
                                        <div className="erroresCampos">{errors.password}</div>
                                    ) : null}
                                </div>


                                <button className="btnLogin solid" type="submit">Submit</button>
                                <Button class="btnLogin solid" onClick={() => { history.push('/Register') }}>Registrarse</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </body>
    )
}

export default Login