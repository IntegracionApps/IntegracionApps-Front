import React from "react"
import { useParams } from "react-router-dom";
import { useCart } from "react-use-cart"

// import product_data from "../data/product_data";

export default function Cart({product_data}) {

    let { addedProdId } = useParams();
    addedProdId = Number.parseInt(addedProdId);
    const { isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        setItems,
        updateItemQuantity,
        addItem,
        removeItem,
        emptyCart
    } = useCart();
    // if (isEmpty) return <h1>Carrito Vacío</h1>
    return (
        <div>
            <h1>Producto elegido: {product_data[addedProdId].name}</h1>
            {/* <h1>Hola</h1> */}
        </div>
        // <section className="py-4 container">
        //     <div className="row justify-content-center">
        //         <div className="col-12">
        //             <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
        //             <table className="table table-light table-hover m-0">
        //                 <tbody>
        //                     {items.map((item, index)=>{
        //                         return(
        //                             <tr key={index}>
        //                                 <td>{item.name}</td>
        //                             </tr>
        //                         )
        //                     })}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </section>
    );
};

