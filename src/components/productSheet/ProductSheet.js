import Loading from "components/loading/Loading"
import { fetchOneProduct } from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Carousel, Col, Container, Row, Image, Card, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import './productSheet.scss'

const ProductSheet = observer(() => {
    const {products, modals, user} = useContext(Context)
    const [product, setProduct] = useState({})
    const [slide, setSlide] = useState(0)
    const {id} = useParams()
    
    const handleSelect = (selectedIndex, e) => {
        setSlide(selectedIndex);
    }

    const editProduct = (e) => {
        e.stopPropagation()
        modals.setEditProduct({show:true,product})
    }

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [products._reload])
    
    return (
        <Container >
            {product.id ?
                <>  
                    {user._user.role === 'ADMIN' && 
                        <Button variant="outline-success" size="sm" className='w-100 mt-4' onClick={(e) => editProduct(e)}>edit</Button>}
                    <Row className="mt-5">
                        <Col>
                            <Carousel activeIndex={slide} onSelect={handleSelect} indicators={false}>
                                {product.img.map((_,i) => 
                                        <Carousel.Item key={i}>
                                            <img className="d-block w-100"
                                            src={process.env.REACT_APP_API_URL + `${product.id}/` + product.img[i]}/>
                                        </Carousel.Item>
                                    )
                                }
                            </Carousel>     
                            <div className="d-flex mt-1">
                                {product.img.map((element,i) => 
                                    <div key={i}>
                                        <img                                         
                                            className={i===slide ? 'opacity-100':'opacity-50 border'}
                                            style={{height:50, cursor:'pointer'}} 
                                            onClick={() => setSlide(i)}
                                            src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
                                        {i===slide && <div className="bg-secondary opacity-50 rounded mt-1" style={{height:5}}></div>}
                                    </div>                                
                                )}
                            </div>               
                        </Col>
                        <Col className="d-flex flex-column justify-content-between">
                                <div className="d-flex justify-content-end fs-4">{product.name}</div>
                                <div className="d-flex justify-content-end fs-5">{product.price} ₽</div>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <hr/>
                    </Row>
                </>
                : <Loading/>
            }
        </Container>       
    )
})

export default ProductSheet
