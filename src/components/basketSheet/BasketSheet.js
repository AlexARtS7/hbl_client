import { fetchBasketProducts } from 'http/basketApi'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'

const BasketSheet = observer(() => {
    const {basket, user} = useContext(Context)

    useEffect(() => {
        fetchBasketProducts()
    },[])

    return (
        <Container className='mt-3'>
        <Card 
            style={{minHeight:250, cursor: 'pointer'}}>
            dsfds
        </Card>
            
        </Container>
    )
})

export default BasketSheet