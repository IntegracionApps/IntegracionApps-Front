import React from 'react'
import ItemCard from './ItemCard'
import product_data from '../data/product_data'
import { useCart } from "react-use-cart"

const productCardd = () => {

    return(
        <>
        <h1 className="text-center mt'3">All Items</h1>
        <section className="py-4 container">
            <div className="row justify-content-center">
                {product_data.map((item) =>{
                    return(
                        <ItemCard product_name={item.product_name} description={item.description} price={item.price} key={item.id}/>
                    )
                })}
            </div>
        </section>
        </>
    );

};

export default productCardd;