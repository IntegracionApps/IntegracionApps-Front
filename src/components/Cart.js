import React from "react"
import { useParams } from "react-router-dom";
import { useCart } from "react-use-cart"


function Cart() {
    
    let {addedProdId} = useParams();
    
    const { isEmpty,
            totalUniqueItems,
            items,
            totalItems,
            cartTotal,
            setItems,
            updateItemQuantity,
            removeItem,
            emptyCart 
        } = useCart();
    // if (isEmpty) return <h1>Carrito Vacío</h1>
    return(
        <div>
            {console.log(addedProdId)}
            <h1>Id elegido: {addedProdId}</h1>
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
        //                                 <td>{item.product_name}</td>
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

export default Cart;