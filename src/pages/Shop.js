import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import ControlBar from "components/controlBar/ControlBar"

const ShopPage = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchProducts()
        .then(data => products.setProducts(data))
    },[])

    return (
        <>
            <ControlBar/>
            <ShopList/>
        </>
        
    )
})

export default ShopPage

