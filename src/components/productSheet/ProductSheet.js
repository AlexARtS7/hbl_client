import Loading from "components/loading/Loading"
import { addProduct } from "http/basketApi"
import productApi from "http/productApi"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Carousel, Col, Container, Row, Button, Table } from "react-bootstrap"
import { useParams } from "react-router-dom"
import './productSheet.scss'

const ProductSheet = observer(() => {
    const {products, modals, user} = useContext(Context)
    const {fetchTypes, fetchOneProduct, fetchProductInfo, fetchProductDescription} = productApi()
    const [slide, setSlide] = useState(0)
    const {id} = useParams()

    const handleSelect = (selectedIndex, e) => {
        setSlide(selectedIndex);
    }
    
    const editProduct = (e) => {
        modals.setEditProduct({show:true,product:products.item})
    }

    const addToBasket = () => {
        addProduct(user.data.id, Number(id))
    }

    useEffect(() => {
        fetchTypes()
        fetchOneProduct(id)
        fetchProductInfo(id)
        fetchProductDescription(id)
    }, [id, user.data.id])

    return (
        <Container fluid style={{overflowY:'auto'}}>
            <Container className="mt-5">
                {products.item.id ?
                    <>  
                        {user.data.role === 'ADMIN' && 
                            <Button 
                                variant="outline-success" 
                                size="sm" className='w-100 mb-4' 
                                onClick={(e) => editProduct(e)}>edit</Button>}
                        <Row >
                            <Col>
                                <Carousel 
                                    activeIndex={slide} 
                                    onSelect={handleSelect} 
                                    indicators={false} 
                                    controls={products.item.img.length > 1}>
                                    {products.item.img.map((_,i) => 
                                            <Carousel.Item key={i}>
                                                <img className="d-block w-100"
                                                src={process.env.REACT_APP_API_URL + `${products.item.id}/` + products.item.img[i]}/>
                                            </Carousel.Item>
                                        )
                                    }
                                </Carousel>     
                                <div className="d-flex mt-1">
                                    {products.item.img.map((element,i) => 
                                        <div key={i}>
                                            <img                                         
                                                className={i===slide ? 'opacity-100':'opacity-50 border'}
                                                style={{height:50, cursor:'pointer'}} 
                                                onClick={() => setSlide(i)}
                                                src={process.env.REACT_APP_API_URL + `${products.item.id}/` + element}/>
                                            {i===slide && 
                                                <div className="bg-secondary opacity-50 rounded mt-1" style={{height:5}}></div>}
                                        </div>                                
                                    )}
                                </div>               
                            </Col>
                            <Col className="d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex justify-content-end fs-4">{products.item.name}</div>
                                        <hr/>
                                        {products.itemDescription && <div className="fs-6 text-end">{products.itemDescription}</div>}
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-end fs-5">{products.item.price} ₽</div>
                                        <div className="d-flex justify-content-end mt-4">
                                            <Button size="sm" variant="success" className="me-4">Купить в один Клик</Button>
                                            {user.isAuth && 
                                                <Button title='dfd' size="sm" variant="success" onClick={addToBasket}>В корзину</Button>}
                                        </div>                                        
                                        
                                    </div>                                    
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <hr/>
                            {products.itemInfo.length > 0 &&
                                <Table striped>
                                    <thead>
                                        <tr><th>Информация</th></tr>
                                    </thead>
                                    <tbody>
                                        {products.itemInfo.map((info,i) => 
                                            <tr key={i}>
                                                <td>{info.title}</td>
                                                <td className="text-end">{info.info}</td>
                                            </tr>
                                        )}                                        
                                    </tbody>
                                </Table>   
                            }
                        </Row>
                    </>
                    : <Loading/>
                }
            </Container>  
        </Container>       
    )
})

export default ProductSheet