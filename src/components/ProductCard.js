import { useHistory } from 'react-router'
import {React, useState} from 'react'
import product_data from "../data/product_data"
import "../styles/ProductCard.css"

const ProductCard = () => {
    
    const history = useHistory();

    const [cartProducts] = useState([]);

    function handleAddItem(item) {
        alert(item);
        if (cartProducts !== null) {
            if (cartProducts.some(product => product._id === item._id)) {
                cartProducts.map((product) => {
                    if (product._id === item._id) {
                        history.push({ pathname: `/Shopping_Cart/:${product._id}`, state: product })
                    }
                })
            }
            else {
                history.push({ pathname: `/Shopping_Cart/:${item.id}`, state: item })
            }
        }
        else {
            history.push({ pathname: `/Shopping_Cart/:${item.id}`, state: item })
        }
    }    
    
    const listItems = product_data.map((item) =>
        <div className="card" key={item.id}>
            <div className="">
                <img src=""></img>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price">{item.price}</p>
                <button className="btn" onClick={() => {handleAddItem(item)}}>Agregar a carrito</button>
            </div>

        </div>
        
    );
    return(
        <div className="main_content">
            {listItems}
        </div>
    )

}

export default ProductCard