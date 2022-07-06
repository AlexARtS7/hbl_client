
import React from "react"
import './shopListItem.scss'

const ShopListItem = ({product}) => {
    const img = product.img
    
    return (
        <div className='shoplistitem'>
            <img className='shoplistitem_img' src={process.env.REACT_APP_API_URL + `${product.id}/` + JSON.parse(img)[0]}/>
           <p>{product.name}</p>
        </div>
    )
}

export default ShopListItem