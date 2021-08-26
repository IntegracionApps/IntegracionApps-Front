import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
//import cada pantalla acá
import Home from "./pages/home.js";
import NuevaVenta from "./pages/formulario_venta.js";
import RegistroVentas from "./pages/registro_ventas.js";
import ControlStock from "./pages/control_stock.js";
import SideMenu from "./components/SideMenu.js";

//

export default function Routes() {
    // console.log("Hello")
    return (
        <Router history={useHistory}>
            {/* <SideMenu /> */}
            <Switch>
                <Route path="/Stock" component={ControlStock} />
                <Route path="/RegistroVentas" component={RegistroVentas} />
                <Route path="/NuevaVenta" component={NuevaVenta} />
                <Route path="/Home" component={Home} />
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    )
}
