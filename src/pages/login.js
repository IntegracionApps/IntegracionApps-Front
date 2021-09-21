import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../styles/Login.css";


const Login = () => {
    const [values, setValues] = useState({
        mail: "",
        pass: "",
    });

    const history = useHistory();

    localStorage.setItem("finished", false);

    const handleMail = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            mail: event.target.value,
        }));

    }

    const handlePass = (event) => {
        event.preventDefault();
        setValues((values) => ({
            ...values,
            pass: event.target.value,
        }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/Users/get/' + values.mail, {
            password: values.pass,
        })
            .then((res) => {
                console.log(res.status);
                switch (res.status) {
                    case 200:
                        if (res.data !== {}) {
                            if (res.data.rol === "Administrador" || res.data.rol === "Cajero") history.push("/Home");
                            if (res.data.rol === "Cliente") history.push("/HomeCliente");
                        }
                        if (res.data === false) alert("Datos ingresados incorrectos");
                        break;

                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 404: alert(err.response.data);
                        break;
                    case 500: console.log(err);
                        break;
                }
            });
        // console.log(res.data);
        // history.push("/Home");

    }
    return (
        <body>
            <div className="container_login">
                <div className="forms-container">
                    <form action="" className="sign-in-form" onSubmit={handleSubmit}>
                        <h2 className="title">Iniciar Sesión</h2>

                        <div className="input-field">
                            <div className="loginIcons">
                                <Mail />
                            </div>
                            <input required type="text" placeholder="E-Mail" value={values.mail} onChange={handleMail}></input>
                        </div>

                        <div className="input-field">
                            <div className="loginIcons">
                                <Lock />
                            </div>
                            <input required type="password" placeholder="DNI (sin puntuaciones)" value={values.pass} onChange={handlePass}></input>
                        </div>

                        <input type="submit" value="Login" class="btnLogin solid"></input>

                    </form>
                </div>
            </div>
        </body>
    )
}

export default Login