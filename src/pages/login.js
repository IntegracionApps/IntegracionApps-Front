import React from "react"
import { Grid,Paper, Avatar, TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core"
import Mail from "@material-ui/icons/Mail"
import Lock from "@material-ui/icons/Lock";
import "../styles/Login.css"

const Login=()=>{
    return(
        <body>
            <div className="container">
                <div className="forms-container">
                        <form action="" className="sign-in-form">
                            <h2 className="title">Iniciar Sesion</h2>

                            <div className="input-field">
                                <div className="loginIcons">
                                    <Mail/>
                                </div>
                                <input type="text" placeholder="Mail"></input>
                            </div>

                            <div className="input-field">
                                <div className="loginIcons">
                                    <Lock/>
                                </div>
                                <input type="password" placeholder="Contraseña"></input>
                            </div>

                            <input type="submit" value="Login" class="btnLogin solid"></input>

                        </form>
                </div>
            </div>
        </body>
    )
}

export default Login