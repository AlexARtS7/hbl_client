import BasketSheet from 'components/basketSheet/BasketSheet'
import PagesPagination from 'components/pagination/PagesPagination'
import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const BasketPage = observer(() => {
  const {basket, user} = useContext(Context)
  
  useEffect(() => {
    basket.fetchBasketProducts(user.data.id)
  }, [basket.page])

  return (
    <Container fluid style={{overflowY:'auto'}}>
      <Row>
        <Col>  
          <BasketSheet/>
          <PagesPagination store={basket}/>      
        </Col>
      </Row> 
    </Container>       
  )
})

export default BasketPage