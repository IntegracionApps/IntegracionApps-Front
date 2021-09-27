import { Button, Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu, SystemUpdate } from "@material-ui/icons";
import axios from 'axios';
import { React, useEffect, useState } from "react";
import { useHistory } from 'react-router';
import "../styles/SideMenu.css";

export default function SideMenu(props) {

    // const { roleValue } = props;
    let side_menu_buttons = []

    const [drawerToggle, setDrawerToggle] = useState(false);

    const history = useHistory();
    // console.log(roleValue + " "+ typeof(roleValue));
    switch (parseInt(window.localStorage.getItem("rol"))) {
        case 0:
            side_menu_buttons = [
                {
                    name: 'Principal',
                    path: "/",
                },

                {
                    name: 'Registro de Ventas',
                    path: "/RegistroVentas",
                },

                {
                    name: 'Control de Stock',
                    path: "/Stock",
                },

                {
                    name: 'Lista de Empleados',
                    path: "/Empleados"
                },

                {
                    name: 'Cerrar Sesión',
                    path: "/LogOut"
                },
            ];
            break;
        case 1:
            side_menu_buttons = [
                {
                    name: 'Principal',
                    path: "/",
                },

                {
                    name: 'Registro de Ventas',
                    path: "/RegistroVentas",
                },

                {
                    name: 'Cerrar Sesión',
                    path: "/LogOut"
                },
            ];
            break;
        case 2:
            side_menu_buttons = [
                {
                    name: 'Principal',
                    path: "/",
                },

                {
                    name: 'Historial de Ventas',
                    path: "/RegistroVentas",
                },

                {
                    name: 'Cerrar Sesión',
                    path: "/LogOut"
                },
            ];
            break;

    }

    const Redirect = (text) => {
        // console.log("te vas a la página: " + text)
        if (text === "/") {
            setDrawerToggle(false);
            switch (parseInt(window.localStorage.getItem("rol"))) {
                case 0:
                    history.push({
                        pathname: '/HomeAdmin',
                    });
                    break;
                case 1:
                    history.push({
                        pathname: '/HomeAdmin',
                    });
                    break;
                case 2:
                    history.push({
                        pathname: '/Home',
                    });
                    break;


            }
        } else if (text === "/RegistroVentas") {
            setDrawerToggle(false);
            history.push({
                pathname: '/RegistroVentas',
            })
        } else if (text === "/Stock") {
            setDrawerToggle(false);
            history.push({
                pathname: '/Stock',
            })
        }
        else if (text === "/LogOut") {
            setDrawerToggle(false);
            // history.push({
            //     pathname: '/LogOut', 
            // })
            if (window.confirm("¿Está seguro que quiere cerrar sesión?")) {
                window.localStorage.setItem("loggedOut", true);
                history.push("/");
            }
        }
        else if (text === "/Empleados") {
            setDrawerToggle(false);
            history.push({
                pathname: '/Empleados',
            })
        }
    }


    const list = () => (
        <div className={"container"}>
            <div className={"header"}>
                <h1 style={{ color: "white" }}>Menú</h1>
            </div>
            <Divider />
            <List>
                {side_menu_buttons.map((item, index) => (
                    <div>
                        <ListItem button key={index} onClick={() => { Redirect(item.path) }}>
                            {/* <Link to={item.path}>{item.name}</Link> */}
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    );

    return (
        <div className="button">
            <Button style={{ color: "white", fontSize: "medium", fontWeight: "1000" }} startIcon={<Menu />} onClick={() => setDrawerToggle(true)}>Open Menu</Button>
            <Drawer anchor={"right"} open={drawerToggle} onClose={() => setDrawerToggle(!drawerToggle)}>
                {list()}
            </Drawer>
        </div>
    )
}

