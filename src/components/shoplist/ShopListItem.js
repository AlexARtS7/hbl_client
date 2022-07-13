import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import './shopListItem.scss'
import noImage from '../../assets/images/no-image.svg'

const ShopListItem = ({product, role, setProduct}) => {
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const src = process.env.REACT_APP_API_URL + `${product.id}/` + product.img[0]
  
    const editProduct = (e) => {
        e.stopPropagation()
        setProduct(product)
    }
    
    return (
        <div className='shoplistitem' onClick={() => navigate(PRODUCTS_ROUTE + '/' +  product.id)}>
            <div className='shoplistitem_img_block'>
                <img 
                    className='shoplistitem_img' 
                    style={loaded ? null : { display: 'none' }}
                    src={src} 
                    alt='image'
                    onLoad={() => setLoaded(true)}/>  
                {!loaded && <img className='shoplistitem_img' src={noImage} alt='noImage'/>}
            </div>
            
            <p className='shoplistitem_name'>{product.name}</p>
            <p className='shoplistitem_price'>{product.price} <span className='shoplistitem_price_rub'>Р</span></p>
            {role === 'ADMIN' && 
                <div className='shoplistitem_admin_buttonblock'>
                    <div className='shoplistitem_admin_button' onClick={(e) => editProduct(e)}>edit</div>
                </div>}
        </div>
    )
}

export default ShopListItem