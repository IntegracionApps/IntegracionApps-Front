import React from "react"
import "../styles/Header.css"
import SearchBar from "../components/SearchBar"
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import SideMenu from "./SideMenu";


export default function Header() {
    return (
        <div className="navbar">

            <div className="HeaderLogo">
                <ShoppingCart style={{ fontSize: 64 }} />
                <h1>El Changuito</h1>
            </div>
            <SearchBar></SearchBar>
            <SideMenu></SideMenu>

        </div>
    )
}