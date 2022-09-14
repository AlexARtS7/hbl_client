import React from "react"
import { Row } from "react-bootstrap"
import ShopListItem from "./ShopListItem"

const ShopList = ({products}) => {
    
    return (
        <Row className="d-flex justify-content-center">
            {products.list && products.list.map(product => 
            <ShopListItem 
                product={product} 
                key={product.id}/>
            )}  
        </Row>             
    )
}

export default ShopList