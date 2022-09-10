import { fetchBasketProducts } from 'http/basketApi'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Container } from 'react-bootstrap'

const BasketSheet = observer(() => {
    const {basket, user, products} = useContext(Context)
    const [imageLoaded, setImageLoaded] = useState(false)  
    
    return (
        <Container className='mt-3'>
            {basket.products.map(product => 
                <Card 
                    key={product.id}
                    className="mt-3 p-2"
                    // style={{minHeight:200, cursor: 'pointer'}}
                    >
                    {product.product === null ?
                    <div className='d-flex justify-content-center'>К сожалению данный продукт более не доступен :( приносим свои извинения...</div>
                    :
                    <>
                        <img 
                        src={process.env.REACT_APP_API_URL + `${product.product.id}/` + JSON.parse(product.product.img)[0]} 
                        style={imageLoaded ? {display:'block', height:180, width:250} : { display: 'none' }} onLoad={() => setImageLoaded(true)}/>
                    </>
                    }
                    
                </Card>
            )}
            
        </Container>
    )
})

export default BasketSheet