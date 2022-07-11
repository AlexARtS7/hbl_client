import React from "react"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import './shopListItem.scss'

const ShopListItem = ({product, role, setProduct}) => {
    const navigate = useNavigate()
  
    const deleteProduct = (e) => {
        e.stopPropagation()
        setProduct(product)
    }
    

    function imageExists(image_url){

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    
    }
    console.log(imageExists(process.env.REACT_APP_API_URL + `${product.id}/` + product.img[0]))
    return (
        <div className='shoplistitem' onClick={() => navigate(PRODUCTS_ROUTE + '/' +  product.id)}>
            <img className='shoplistitem_img' src={process.env.REACT_APP_API_URL + `${product.id}/` + product.img[0]}/>
            <p className='shoplistitem_name'>{product.name}</p>
            <p className='shoplistitem_price'>{product.price} <span className='shoplistitem_price_rub'>Р</span></p>
            {role === 'ADMIN' && 
                <div className='shoplistitem_admin_buttonblock'>
                    <div className='shoplistitem_admin_button' onClick={(e) => deleteProduct(e)}>del</div>
                </div>}
        </div>
    )
}

export default ShopListItem