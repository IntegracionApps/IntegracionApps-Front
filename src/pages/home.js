import React from "react";
import Header from "../components/Header"
import ProductCard from "../components/ProductCard";
import ItemCard from "../components/ItemCard";
import product_data from "../data/product_data";




export default function Home() {

    return (
        <div>
            <Header/>
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
        </div>
    )
}
