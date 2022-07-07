import { fetchOneProduct } from "http/productApi"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ProductPage = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams()
    
    useEffect(() => {
        fetchOneProduct(id).then(data => 
            {
                console.log(data)
                // setProduct(data)
            })
    }, [])
    
    return (
        <>
        gfgf
        </>
    )
}

export default ProductPage