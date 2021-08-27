import React from "react";
import { BrowserRouter as Router, Route, useHistory, Switch } from "react-router-dom";

//import cada pantalla acá
import Home from "./pages/home.js";
import Shopping_Cart from "./pages/shopping_cart.js";
//

export default function Routes() {
    console.log("Hello")
    return (
        <Router history={useHistory}>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Shopping_cart" component={Shopping_Cart} />
            </Switch>
        </Router>
    )
}
