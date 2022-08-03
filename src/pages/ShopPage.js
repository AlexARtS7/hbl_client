import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import productApi from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import PagesPagination from "components/pagination/PagesPagination"
import { Col, Container, Row } from "react-bootstrap"
import Loading from "components/loading/Loading"

const ShopPage = observer(() => {
    const {products, loading} = useContext(Context)
    const {fetchProducts, fetchTypes} = productApi()

    useEffect(() => {
        products.setItem({})
        fetchTypes()
    },[])
    
    useEffect(() => {
        fetchProducts()
    }, [products.selectedType, products.page])
    
    return (
        <Container fluid style={{overflowY:'auto'}}>
            <Row>
                <Col>  
                    {loading.status && <Loading/>}
                    {!loading.status && products.list.length === 0 &&
                        <div className="d-flex justify-content-center fs-5">К сожалению в этом разделе ничего нет :(</div>}  
                    {!loading.status && 
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

