import { Button, Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu, SystemUpdate } from "@material-ui/icons";
import { React, useState } from "react";
import { useHistory } from 'react-router';
import "../styles/SideMenu.css";

export default function SideMenu() {

    const history= useHistory();

    const [drawerToggle, setDrawerToggle] = useState(false);

    const side_menu_buttons = [
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
            name: 'Cerrar Sesión',
            path: "/LogOut"
        },
    ];

    const Redirect = (text) =>{
        console.log("te vas a la página: "+ text)
        if(text==="/"){
          setDrawerToggle(false);
          history.push({
              pathname: '/Home',
          })
        }else if(text==="/RegistroVentas"){
          setDrawerToggle(false);
          history.push({
              pathname: '/RegistroVentas',
          })
        }else if(text==="/Stock"){
          setDrawerToggle(false);
          history.push({
              pathname: '/Stock', 
          })
        }
        else if(text==="/LogOut"){
            setDrawerToggle(false);
            // history.push({
            //     pathname: '/LogOut', 
            // })
            alert("Se ha cerrado sesión")
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
                        <ListItem button key={index} onClick= {() => {Redirect(item.path)}}>
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

