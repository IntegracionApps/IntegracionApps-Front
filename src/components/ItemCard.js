import React from "react"
import { useCart } from "react-use-cart";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"


function ItemCard(props) {
    const { addItem } = useCart();
    return(
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div class="card p-0 overflow-hidden h-100 shadow">
                <img src="" class="card-img-top img-fluid"></img>
                <div class="card-body text-center">
                    <h5 class="card-title">{props.product_name}</h5>
                    <p class="card-text">{props.description}</p>
                    <button class="btn btn-primary" onClick={() => addItem(props.item)}>Add to cart</button>
                </div>
            </div>
        </div>

    );
};

export default ItemCard;