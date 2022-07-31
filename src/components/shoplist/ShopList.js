import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Row } from "react-bootstrap"
import ShopListItem from "./ShopListItem"

const ShopList = observer(() => {
    const {products} = useContext(Context)

    return (
        <Row className="d-flex justify-content-center">
            {products.list && products.list.map(product => 
            <ShopListItem 
                product={product} 
                key={product.id}/>
            )}  
        </Row>             
    )
})

export default ShopList