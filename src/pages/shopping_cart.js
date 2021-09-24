import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { CartProvider } from "react-use-cart";
import Cart from "../components/Cart";
import Header from "../components/Header";


export default function Home(props) {
    const history= useHistory();
    return (
        <div>
            <Header />
            <div className="main_content">
                <CartProvider>
                    <Cart cart={props.location.state} where={props.location} />
                </CartProvider>
                <Button onClick={() => { history.goBack() }} style={{ backgroundColor: "lightsalmon", color: "black", width: "auto", marginTop: "7.5%" }}>Volver</Button>

            </div>
        </div>
    )
}