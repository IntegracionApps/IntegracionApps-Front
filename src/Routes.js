import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import SideMenu from "./components/SideMenu.js";

//import cada pantalla acá
import Home from "./pages/home.js";
import Shopping_Cart from "./pages/shopping_cart.js";
import NuevaVenta from "./pages/formulario_venta.js";
import RegistroVentas from "./pages/registro_ventas.js";
import ControlStock from "./pages/control_stock.js";
import Empleados from "./pages/empleados.js";
import Login from "./pages/login.js"

//

export default function Routes() {

    return (
        <Router history={useHistory}>
            {/* <SideMenu /> */}
            <Switch>
                <CartProvider>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/Shopping_cart" component={Shopping_Cart} />
                    <Route exact path="/Empleados" component={Empleados} />
                    <Route exact path="/Stock" component={ControlStock} />
                    <Route exact path="/RegistroVentas" component={RegistroVentas} />
                    <Route exact path="/NuevaVenta" component={NuevaVenta} />
                </CartProvider>
            </Switch>
        </Router>
    )
}
