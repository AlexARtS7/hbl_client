import { fetchOneProduct } from "http/productApi"
import React, { useEffect, useState } from "react"
import { Carousel, Col, Container, Row, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"
import './productSheet.scss'

const ProductSheet = () => {
    const [product, setProduct] = useState({})
    const [slide, setSlide] = useState(0)
    const {id} = useParams()
    
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])
    
    return (
        <Container fluid className="mt-3">
            <Row>
                <Col>
                    <Carousel fade>
                        {product.id &&
                            product.img.map((element,i) => 
                                <Carousel.Item key={i}>
                                    <img
                                    className="d-block w-100"
                                    src={process.env.REACT_APP_API_URL + `${product.id}/` + product.img[i]}
                                    />
                                </Carousel.Item>
                            )                           
                        }
                    </Carousel>
                </Col>
                <Col>gfhfhhf</Col>
            </Row>
            {/* { product.id && <div className='productsheet'>
                <div className='productsheet_container'>
                    <div className='productsheet_carousel'>
                        <div className='productsheet_carousel_imgblock'>
                            <img className='productsheet_carousel_img' 
                                src={process.env.REACT_APP_API_URL + `${product.id}/` + product.img[slide]}/>
                        </div>                        
                        <div className='productsheet_carousel_controlblock'>
                            {product.img.map((element,i) => 
                            <img 
                                key={i}  
                                className={i === slide ? 'productsheet_carousel_thumbnail_active':
                                'productsheet_carousel_thumbnail'} 
                                onClick={() => setSlide(i)}
                                src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
                            )}
                        </div>                        
                    </div>
                    <div className='productsheet_description'>
                        <div>
                            <p className='productsheet_description_name'>{product.name}</p>
                            <br/><hr/><br/>
                            {product.specifications && 
                                <div>
                                    <p className='productsheet_description_label'>Характеристики:</p>
                                    <div className='productsheet_description_block'>{product.specifications} </div>                               
                                </div>
                            }
                            <br/>
                            {product.description && 
                            <div>
                                <p className='productsheet_description_label'>Описание:</p>
                                <div className='productsheet_description_block'>{product.description} </div>                               
                            </div>
                        }
                        </div>
                        <br/>
                        
                        <p className='productsheet_description_price'>{product.price} <span className='shoplistitem_price_rub'>Р</span></p>
                    </div>
                </div>
            </div>} */}
        </Container>       
    )
}

export default ProductSheet
