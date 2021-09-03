import React from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

//import cada pantalla acá
import Home from "./pages/home.js";
import Shopping_Cart from "./pages/shopping_cart.js";


//

export default function Routes() {
    return (
        <Router history={useHistory}>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route strict path="/Shopping_cart" component={Shopping_Cart}/>
                {/* <Route strict path="/Shopping_cart/Add"/> */}
            </Switch>
        </Router>
    )
}
