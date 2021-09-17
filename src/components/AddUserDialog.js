import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@material-ui/core";
import React from "react";

export default function DialogAdd(props) {
    const { open, onClose } = props;

    return (
        <React.Fragment>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>Nuevo Empleado</DialogTitle>
                <DialogContent dividers>
                    <Typography>¿Qué datos quiere ingrgesar?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancelar</Button>
                    <Button color="secondary">Crear</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}