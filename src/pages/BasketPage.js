import BasketSheet from 'components/basketSheet/BasketSheet'
import Loading from 'components/loading/Loading'
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
          {basket.loading && <Loading/>} 
          {basket.products.length === 0 && <div className='d-flex justify-content-center fs-5 mt-5'>Вы пока ничего не добавили в корзину...</div>}
          {!basket.loading && 
            <>
              <BasketSheet />
              <PagesPagination store={basket}/>
            </>
          }  
        </Col>
      </Row> 
    </Container>       
  )
})

export default BasketPage