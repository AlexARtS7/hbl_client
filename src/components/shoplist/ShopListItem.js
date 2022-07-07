
import React from "react"
import './shopListItem.scss'

const ShopListItem = ({product}) => {
    const img = product.img

    return (
        <div className='shoplistitem'>
            <img className='shoplistitem_img' src={process.env.REACT_APP_API_URL + `${product.id}/` + JSON.parse(img)[0]}/>
            <p className='shoplistitem_name'>{product.name}</p>
            <p className='shoplistitem_price'>{product.price} <span className='shoplistitem_price_rub'>Р</span></p>
        </div>
    )
}

export default ShopListItem