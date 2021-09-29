import React, { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditItemDialog from "../components/EditItemDialog";

export default function AdminProductCard(props) {
    const { item, handleRemoveItem, refresh, onClickEdit } = props;

    const [willDelete, setWillDelete] = useState(false);
    const [editOpen, setEditOpen] = useState(false);


    return (
        <div className="card_header">
            {willDelete ?
                <React.Fragment>
                    <h2>¿Estás seguro que quieres eliminar el siguiente producto?</h2>
                    <h3>{item.descrip}</h3>
                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <button className="btn" onClick={() => {
                            handleRemoveItem();
                            // setWillDelete(false);
                            refresh();
                        }}>Sí, ELIMINAR</button>
                        <button className="btn" onClick={() => { setWillDelete(false); }}>No, CANCELAR</button>
                    </div>

                </React.Fragment>

                :
                <React.Fragment>
                    <h2>{item.nombre}</h2>
                    <p>{item.descrip}</p>
                    <p className="price">$ {item.price} x [ {item.tipoUnidad} ]</p>
                    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                        <button className="btn" onClick={() => { setEditOpen(true); }}>Editar Producto</button>
                        <DeleteIcon fontSize="large" color="secondary" onClick={() => {
                            setWillDelete(true);
                        }} />
                    </div>
                </React.Fragment>
            }
            <EditItemDialog item={item} refresh={() => {refresh();}} open={editOpen} onClose={() => setEditOpen()} />
        </div >

    );
}