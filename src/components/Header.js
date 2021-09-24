import React from "react";

import SideMenu from "./SideMenu";
// import SearchBar from "../components/SearchBar"

import Search from "@material-ui/icons/Search";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

import "../styles/Header.css";
import "../styles/SearchBar.css";


export default function Header(props) {
    const { onSearchBarChange, searchValue, onQuit } = props;


    return (
        <div className="navbar">

            <div className="HeaderLogo">
                <ShoppingCart style={{ fontSize: 64 }} />
                <h1>El Changuito</h1>
            </div>

            <div className="search-box">
                <input value={searchValue} onChange={onSearchBarChange} className="search-txt" type="text" placeholder="Buscar por marca o categoría..." />
                <btn className="search-btn" ><Search /></btn>
            </div>
            <SideMenu onQuit={onQuit}/>

        </div>
    )
}