import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

//import cada pantalla acá
import Home from "./pages/home.js";
import Shopping_Cart from "./pages/shopping_cart.js";
import NuevaVenta from "./pages/formulario_venta.js";
import RegistroVentas from "./pages/registro_ventas.js";
import ControlStock from "./pages/control_stock.js";
import Empleados from "./pages/empleados.js";
import SideMenu from "./components/SideMenu.js";

//

export default function Routes() {

    return (
        <Router history={useHistory}>
            {/* <SideMenu /> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route strict path="/Shopping_cart" component={Shopping_Cart}/>
                <Route path="/Empleados" component={Empleados}/>
                <Route path="/Stock" component={ControlStock} />
                <Route path="/RegistroVentas" component={RegistroVentas} />
                <Route path="/NuevaVenta" component={NuevaVenta} />

            </Switch>
        </Router>
    )
}
