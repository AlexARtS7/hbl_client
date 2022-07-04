import React, { useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts } from "http/productApi"

const ShopPage = () => {

    // useEffect(() => {
    //     fetchProducts().then(data =>{
    //         console.log(data)
    //     })
    // },[])
    
    return (
        <ShopList/>
    )
}

export default ShopPage

