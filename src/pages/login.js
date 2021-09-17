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
        axios.get('http://localhost:5000/Users/get/' + values.mail)
            .then((res) => {
                console.log(res.status + " " + res.statusText)
                if(res.status >= 200) history.push("/Home");
            })
            .then((err) => { console.error(err); });
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
                            <input type="text" placeholder="Mail" value={values.mail} onChange={handleMail}></input>
                        </div>

                        <div className="input-field">
                            <div className="loginIcons">
                                <Lock />
                            </div>
                            <input type="password" placeholder="Contraseña" value={values.pass} onChange={handlePass}></input>
                        </div>

                        <input type="submit" value="Login" class="btnLogin solid"></input>

                    </form>
                </div>
            </div>
        </body>
    )
}

export default Login