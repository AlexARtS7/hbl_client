import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts, fetchTypes } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import ControlBar from "components/controlBar/ControlBar"
import Pagination from "components/pagination/Pagination"
import { Col, Container, Row } from "react-bootstrap"

const ShopPage = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data)) 
    },[])

    useEffect(() => {
        fetchProducts(products._selectedType.id, products._page, products._limit).then(data => {
            products.setProducts(data.rows.map(e => ({ ...e, img: JSON.parse(e.img) })))
            products.setTotalCount(data.count)
        })
    }, [products._selectedType, products._page, products._reload])
    
    return (
        <Container fluid>
            <ControlBar/> 
            <Row>
                <Col>  
                                     
                    <ShopList/>
                    <Pagination/> 
                </Col>
            </Row>        
        </Container>
        
    )
})

export default ShopPage

