import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import './shopListItem.scss'
import noImage from '../../assets/images/no-image.svg'
import { Card, Col, Image, Spinner } from "react-bootstrap"
import { Context } from "index"

const ShopListItem = ({product}) => {
    const {user, modals} = useContext(Context)
    const role = user._user.role  
    const navigate = useNavigate()
    const [imageLoaded, setImageLoaded] = useState(false)    
    const [noImageLoaded, setNoImageLoaded] = useState(false)
    const src = process.env.REACT_APP_API_URL + `${product.id}/` + product.img[0]
  
    const editProduct = (e) => {
        e.stopPropagation()
        modals.setEditProduct({show:true,product})
    }
    
    return (
        <Col className="d-flex justify-content-center m-2">
            <Card 
                style={{width: 250, minHeight:250, cursor: 'pointer'}} 
                className="overflow-hidden d-flex flex-column justify-content-between" 
                onClick={() => navigate(PRODUCTS_ROUTE + '/' +  product.id)}>
                <img src={src} style={imageLoaded ? {display:'block', height:180} : { display: 'none' }} onLoad={() => setImageLoaded(true)}/>
                {!imageLoaded && <Image src={noImage} onLoad={() => setNoImageLoaded(true)}/>}
                {!imageLoaded && !noImageLoaded &&
                    <div className="d-flex justify-content-center align-items-center" style={{height:180}}><Spinner animation="border"/></div>}
                <div>
                    <p className="m-1">{product.name}</p>
                    <p className="m-1">{product.price} ₽</p>
                </div>                
                {role === 'ADMIN' && 
                <div className='shoplistitem_admin_buttonblock'>
                    <div className='shoplistitem_admin_button' onClick={(e) => editProduct(e)}>edit</div>
                </div>}
            </Card>
        </Col>
    )
}

export default ShopListItem