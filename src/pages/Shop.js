import React, { useContext, useEffect } from "react"
import ShopList from "components/shoplist/ShopList"
import { fetchProducts, fetchTypes } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import PagesPagination from "components/pagination/PagesPagination"
import { Col, Container, Row } from "react-bootstrap"
import Loading from "components/loading/Loading"

const ShopPage = observer(() => {
    const {products, loading} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => products.setTypes(data)) 
    },[])
    
    // TODO не вызывать каждый раз тут запрос при изменении данных

    useEffect(() => {
        loading.setStatus(true)
        fetchProducts(products.selectedType.id, products.page, products.limit).then(data => {
            products.setProducts(data.rows.map(e => ({ ...e, img: JSON.parse(e.img) })))
            products.setTotalCount(data.count)
            loading.setStatus(false)
        })
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

