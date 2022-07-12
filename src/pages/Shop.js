import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts, fetchTypes } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import ControlBar from "components/controlBar/ControlBar"

const ShopPage = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data))        
    },[])

    useEffect(() => {
        fetchProducts(products._selectedType.id).then(data => {
            products.setProducts(data)
        })
    }, [products._selectedType])
   
    return (
        <>
            <ControlBar/>
            <ShopList/>
        </>
        
    )
})

export default ShopPage

