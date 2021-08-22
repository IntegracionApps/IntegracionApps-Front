import { React, useState } from "react"
import { Drawer, List, ListItem, Divider, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import "../styles/SideMenu.css"
import { ChevronLeft, Menu } from "@material-ui/icons";

export default function SideMenu() {
    
    const [drawerToggle, setDrawerToggle] = useState(false);
    
    const list = () => (
        <div>
            <List>
                {['Principal', 'Registro de Ventas', 'Stock', 'Cerrar sesión'].map((text, index) => (
                    <ListItem button key={text}>
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className="button">
            <Button className={"button-txt"} startIcon={<Menu/>} onClick={() => setDrawerToggle(true)}>Open Menu</Button>
            <Drawer anchor={"right"} open={drawerToggle} onClose={() => setDrawerToggle(!drawerToggle)}>
                {list()}
            </Drawer>
        </div>
    )
}

