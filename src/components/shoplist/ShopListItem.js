import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import './shopListItem.scss'
import noImage from '../../assets/images/no-image.svg'
import { Card, Col, Image } from "react-bootstrap"

const ShopListItem = ({product, role, setProduct}) => {
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const src = process.env.REACT_APP_API_URL + `${product.id}/` + product.img[0]
  
    const editProduct = (e) => {
        e.stopPropagation()
        setProduct(product)
    }
    
    return (
        <Col className="d-flex justify-content-center m-2">
            <Card 
                style={{width: 250, cursor: 'pointer'}} 
                className="overflow-hidden" 
                onClick={() => navigate(PRODUCTS_ROUTE + '/' +  product.id)}>
                <Image 
                    src={src} 
                    style={loaded ? null : { display: 'none' }}
                    onLoad={() => setLoaded(true)}
                    />
                {!loaded && <Image src={noImage} alt='noImage'/>}
                <p className="m-1">{product.name}</p>
                <p className="m-1">{product.price} ₽</p>
                {role === 'ADMIN' && 
                <div className='shoplistitem_admin_buttonblock'>
                    <div className='shoplistitem_admin_button' onClick={(e) => editProduct(e)}>edit</div>
                </div>}
            </Card>
        </Col>
    )
}

export default ShopListItem