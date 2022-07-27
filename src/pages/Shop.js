import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts, fetchTypes } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import ControlBar from "components/controlBar/ControlBar"
import PagesPagination from "components/pagination/PagesPagination"
import { Col, Container, Row } from "react-bootstrap"
import Loading from "components/loading/Loading"

const ShopPage = observer(() => {
    const {products} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data)) 
    },[])

    useEffect(() => {
        products.setLoading(true)
        fetchProducts(products._selectedType.id, products._page, products._limit).then(data => {
            products.setProducts(data.rows.map(e => ({ ...e, img: JSON.parse(e.img) })))
            products.setTotalCount(data.count)
            products.setLoading(false)
        })
    }, [products._selectedType, products._page, products._reload])
    
    return (
        <Container fluid>
            <ControlBar/> 
            <Row>
                <Col>  
                    {products._loading && <Loading/>}
                    {!products._loading && products._products.length === 0 &&
                        <div className="d-flex justify-content-center fs-5">К сожалению в этом разделе ничего нет :(</div>}  
                    {!products._loading && 
                        <>
                            <ShopList/>
                            <PagesPagination/>
                        </>
                    }             
                </Col>
            </Row>        
        </Container>
        
    )
})

export default ShopPage

