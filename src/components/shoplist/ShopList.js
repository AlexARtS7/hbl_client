import EditProductModal from "components/modals/adminModals/EditProductModal"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import ShopListItem from "./ShopListItem"

const ShopList = observer(() => {
    const {products} = useContext(Context)
    const [product, setProduct] = useState({})
    const {user} = useContext(Context)
    const [editProductModalActive, setEditProductModalActive] = useState(false)   
    const role = user._user.role  
    
    useEffect(() => {
        if(product.id) setEditProductModalActive(true)
    }, [product])

    useEffect(() => {
        if(product.id && !editProductModalActive) setProduct({})
    }, [editProductModalActive])
    
    return (
        <>  
            <Row className="d-flex justify-content-center">
                {products._products.map(product => 
                <ShopListItem 
                    product={product} 
                    key={product.id} 
                    role={role} 
                    setProduct={setProduct}/>
                )}  
            </Row>
            
            {editProductModalActive && 
                <EditProductModal show={editProductModalActive} onHide={setEditProductModalActive} product={product}/>
            }   
        </>             
    )
})

export default ShopList