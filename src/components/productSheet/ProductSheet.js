import { fetchOneProduct } from "http/productApi"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './productSheet.scss'

const ProductSheet = () => {
    const [product, setProduct] = useState({})
    const [images, setImages] = useState([])
    const {id} = useParams()
    
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    useEffect(() => {
        if(product.id) {
            setImages([...JSON.parse(product.img)])
        }
    }, [product])
    
    return (
        <>
            { product.id && <div className='productsheet'>
                <div className='productsheet_carousel'>
                    <img className='productsheet_carousel_img' src={process.env.REACT_APP_API_URL + `${product.id}/` + images[0]}/>
                </div>
                <div className='productsheet_description'>
                    <p className='productsheet_description_name'>{product.name}</p>
                    <br/>
                    <hr/>
                    <br/>
                    {product.specifications}
                    <br/>
                    <br/>
                    {product.description}
                    <p className='productsheet_description_price'>{product.price}</p>
                </div>
            </div>}
        </>       
    )
}

export default ProductSheet
