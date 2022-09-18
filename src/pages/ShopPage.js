import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import PagesPagination from "components/pagination/PagesPagination"
import { Col, Container, Row } from "react-bootstrap"
import Loading from "components/loading/Loading"

const ShopPage = observer(() => {
    const {products} = useContext(Context)
 
    useEffect(() => {
        products.setItem()
        products.fetchTypes()
    },[])
   
    useEffect(() => {
        products.fetchProducts()
    }, [products.selectedType, products.page])
    
    return (
        <Container fluid style={{overflowY:'auto'}}>
            <Row>
                <Col>  
                    {products.loading && <Loading/>}
                    {!products.loading && products.list.length === 0 &&
                        <div className="d-flex justify-content-center fs-5">К сожалению в этом разделе ничего нет :(</div>}  
                    {!products.loading && 
                        <>
                            <ShopList products={products}/>
                            <PagesPagination/>
                        </>
                    }             
                </Col>
            </Row>        
        </Container>
    )
})

export default ShopPage

