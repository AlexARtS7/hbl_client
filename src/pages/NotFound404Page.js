import React from 'react'
import { Button, Nav } from 'react-bootstrap'

const NotFound404Page = () => {
    const location = document.location.href

  return (
    <div className='d-flex justify-content-center align-items-center h-100 text-center'>
        <div>
            <p className='fs-1'>OOOPS!!! 404 Not Found!</p>
            <hr/>
            <br/>
            <p>Страницы по адресу: <span className='text-danger'> {location} </span> не существует.</p>
            <p>Возможно Вы ошиблись и ввели неправильный адрес нужной Вам страницы.</p>
            <br/>
            <p>Провертье авторизованы ли Вы в системе,</p>
            <p>на некоторые страницы могут попасть только авторизованные пользователи.</p>

            <Nav.Item>
                <Nav.Link className='text-primary' href="/">Перейти на главную страницу</Nav.Link>
            </Nav.Item>
            
        </div>        
    </div>
  )
}

export default NotFound404Page