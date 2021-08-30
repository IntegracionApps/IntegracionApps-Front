import { useHistory } from 'react-router'
import { React, useEffect, useState } from 'react'
import { CartProvider, useCart } from 'react-use-cart'
// import product_data from "../data/product_data"
import "../styles/ProductCard.css"
import { Dialog, DialogTitle } from '@material-ui/core';


function AddedItemDialog(props) {
    const { added, open, onClose } = props;

    console.log(added);

    const handleClose = () => {
        onClose();
    }
    
    if (added === undefined) return null
    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Se ha agregado {added.name} al carrito.</DialogTitle>
            </Dialog>
        </div>
    );
}



export default function ProductCard({ product_data }) {


    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [added, setAdded] = useState();

    const {
        items,
        isEmpty,
        setItems,
        addItem,
        emptyCart,
        getItem,
    } = useCart();

    useEffect(() => {
        setItems([]);
    }, []);


    const handleClose = (value) => {
        setOpen(false);
    };


    function handleAddItem(item) {

        setAdded(item);
        if (!isEmpty) {
            if (items.some(product => product._id === item.id)) {
                items.map((product) => {
                    if (product._id === item.id) {
                        addItem(product, 1);
                    }
                })
            }
            else addItem(item, 1);
        }
        addItem(item)
        console.log(items);
        
        setOpen(true);
    }

    console.log(product_data);
    return (
        <div className="main_content">
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                {product_data.map((item) =>
                    <div className="card" key={item.id}>
                        <div className="">
                            <img src=""></img>
                        </div>
                        <div className="card_header">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.price}</p>
                            <button className="btn" onClick={() => handleAddItem(item)}>Agregar a carrito</button>
                        </div>

                    </div>
                )}
            </div>

            <AddedItemDialog added={added} open={open} onClose={() => handleClose()} />

            <button onClick={() => {
                emptyCart();
                setAdded();
            }}>Vaciar Carrito</button>
        </div>
    );
}

// function ListItems({ product_data }) {
//     const {
//         items,
//         isEmpty,
//         setItems,
//         addItem,
//         emptyCart,
//     } = useCart();


//     function handleAddItem(item) {

//         if (!isEmpty) {
//             if (items.some(product => product._id === item.id)) {
//                 items.map((product) => {
//                     if (product._id === item.id) {
//                         addItem(product, 1);
//                     }
//                 })
//             }
//             else addItem(item, 1);
//         }
//         else addItem(item)

//         alert("Se ha agregado: " + item.name + " al carrito.");
//         setOpen(true);
//         // history.push("/Shopping_Cart");
//         console.log(items);
//     }


//     return (
//         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
//             {product_data.map((item) =>
//                 <div className="card" key={item.id}>
//                     <div className="">
//                         <img src=""></img>
//                     </div>
//                     <div className="card_header">
//                         <h2>{item.name}</h2>
//                         <p>{item.description}</p>
//                         <p className="price">{item.price}</p>
//                         <button className="btn" onClick={() => handleAddItem(item)}>Agregar a carrito</button>
//                     </div>

//                 </div>
//             )}
//         </div>
//     );
// }
