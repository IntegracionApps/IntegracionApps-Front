import React from "react"
import { useCart } from "react-use-cart"


const Cart = () => {
    const { isEmpty,
            totalUniqueItems,
            items,
            totalItems,
            cartTotal,
            updateItemQuantity,
            removeItem,
            emptyCart 
        } = useCart();
    if (isEmpty) return <h1>Your Cart is Empty</h1>
    return(
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {items.map((item, index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.product_name}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Cart;