import React from 'react'
import "../styles/ProductCard.css"
import product_data from "../data/product_data"

const ProductCard = () => {
    console.log(product_data);
    const listItems = product_data.map((item) =>
        <div className="card" key={item.id}>
            <div className="">
                <img src=""></img>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price">{item.price}</p>
                <button className="btn">Agregar a carrito</button>
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