import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
//import cada pantalla acá
import Home from "./pages/home.js";
import NuevaVenta from "./pages/formulario_venta.js";

//

export default function Routes() {
    // console.log("Hello")
    return (
        <Router history={useHistory}>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/NuevaVenta" component={NuevaVenta}/>
                <Route exact path="/Home" component={Home} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    )
}
