import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"

const ShopPage = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchProducts()
        .then(data => {
            products.setProducts(data.rows)
        })
    },[])

    return (
        <ShopList/>
    )
})

export default ShopPage

