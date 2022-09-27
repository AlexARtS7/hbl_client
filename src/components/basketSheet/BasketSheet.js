import InfoTable from 'components/formsComponents/InfoTable'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import noImage from '../../assets/images/no-image.svg'
import { Accordion, Button, Card, Container } from 'react-bootstrap'

const BasketSheet = observer(() => {
    const {basket, user, toasts} = useContext(Context)
    const [imageLoaded, setImageLoaded] = useState(false)  

    const removeFromBasket = (id) => {
        basket.deleteProduct(id, user.data.id).
        then(_ => {
            basket.fetchBasketProducts(user.data.id)
            toasts.addToast({text:'Продукт удален из корзины.'})
        })        
    }

    return (
        <Container className='mt-3'>
            {basket.products.map(item => 
                <Card 
                    key={item.id}
                    className="mt-3 p-2"
                    >
                    {item.product === null ?
                    <>
                        <div className='d-flex justify-content-center mb-3'>
                            К сожалению продукт {item.name} более не доступен :( приносим свои извинения...</div>
                            <Button size="sm" variant="outline-success" onClick={e => removeFromBasket(item.id)}>Удалить из корзины</Button>
                    </>
                    :
                    <>
                        <div className='d-flex justify-content-between'>
                            <img 
                            src={ item.product.imgs && item.product.imgs.find(e => e.preview)? 
                                process.env.REACT_APP_API_URL + `${item.product.id}/` + item.product.imgs.find(e => e.preview).img
                                :
                                noImage
                            }                            
                            style=
                                {imageLoaded ? {display:'block', height:180, width:250} 
                                    : 
                                { display: 'none' }} onLoad={() => setImageLoaded(true)}
                            />
                            <div className='w-75 ms-2'>
                                {item.product.name}
                                <hr/>
                                <Button size="sm" variant="success" onClick={e => removeFromBasket(item.id)}>Удалить из корзины</Button>
                            </div>
                        </div>
                        <Accordion className="mt-3">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Информация</Accordion.Header>
                                <Accordion.Body>
                                    {item.product.description && <div>{item.product.description}</div>}
                                    <hr/>
                                    <InfoTable info={item.product.product_infos}></InfoTable>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </>
                    }  
                </Card>
            )}   
        </Container>
    )
})

export default BasketSheet