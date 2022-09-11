import InfoTable from 'components/formsComponents/InfoTable'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Accordion, Button, Card, Container } from 'react-bootstrap'

const BasketSheet = observer(() => {
    const {basket} = useContext(Context)
    const [imageLoaded, setImageLoaded] = useState(false)  
    
    return (
        <Container className='mt-3'>
            {basket.products.map(item => 
                <Card 
                    key={item.id}
                    className="mt-3 p-2"
                    // style={{minHeight:200, cursor: 'pointer'}}
                    >
                    {item.product === null ?
                    <div className='d-flex justify-content-center'>
                        К сожалению продукт {item.name} более не доступен :( приносим свои извинения...</div>
                    :
                    <>
                        <div className='d-flex justify-content-between'>
                            <img 
                            src={process.env.REACT_APP_API_URL + `${item.product.id}/` + JSON.parse(item.product.img)[0]} 
                            style=
                                {imageLoaded ? {display:'block', height:180, width:250} 
                                    : 
                                { display: 'none' }} onLoad={() => setImageLoaded(true)}
                            />
                            <div className='w-75 ms-2'>
                                {item.product.name}
                                <hr/>
                                <Button size="sm" variant="success">sdfs</Button>
                            </div>
                        </div>
                        <Accordion className="mt-3">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Информация</Accordion.Header>
                                <Accordion.Body>
                                    {item.product.product_description.description}
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