import React from "react";
import { BrowserRouter as Router, Route, useHistory, Switch } from "react-router-dom";

import product_data from "./data/product_data.js";

//import cada pantalla acá
import Home from "./pages/home.js";
import Shopping_Cart from "./pages/shopping_cart.js";
//

export default function Routes() {
    return (
        <Router history={useHistory}>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/">
                    <Home product_data={product_data}/>        
                </Route>
                <Route exact path="/Home" >
                    <Home product_data={product_data}/>        
                </Route>
                <Route strict path="/Shopping_cart/:addedProdId">
                    <Shopping_Cart product_data={product_data}/>        
                </Route>
                {/* <Route strict path="/Shopping_cart/Add"/> */}
            </Switch>
        </Router>
    )
}
