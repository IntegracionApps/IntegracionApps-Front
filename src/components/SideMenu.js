import { Button, Divider, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Menu } from "@material-ui/icons";
import { React, useState } from "react";
import "../styles/SideMenu.css";

export default function SideMenu() {

    const [drawerToggle, setDrawerToggle] = useState(false);

    const list = () => (
        <div className={"container"}>
            <div className={"header"}>
                <h1 style={{color:"white"}}>Menú</h1>
            </div>
            <Divider />
            <List>
                {['Principal', 'Registro de Ventas', 'Stock', 'Cerrar sesión'].map((text, index) => (
                    <div>
                        <ListItem button key={text}>
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    );

    return (
        <div className="button">
            <Button style={{color: "white", fontSize: "medium", fontWeight: "1000"}} startIcon={<Menu />} onClick={() => setDrawerToggle(true)}>Open Menu</Button>
            <Drawer anchor={"right"} open={drawerToggle} onClose={() => setDrawerToggle(!drawerToggle)}>
                {list()}
            </Drawer>
        </div>
    )
}

