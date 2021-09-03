import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom";
import { useCart } from "react-use-cart"

// import product_data from "../data/product_data";

export default function Cart({ cart, product_data }) {
    // const {history} =useHistory();
    useEffect(()=>{
        setItems(cart);
    },[]);
    
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
    if (isEmpty) return <h1>Carrito Vacío</h1>
    return (
        <div>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {/* <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5> */}
                        <table className="table table-light table-hover m-0">
                            <tbody>
                                {items.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

