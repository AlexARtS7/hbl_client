import UserMenu from "components/navbar/UserMenu"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Button, Container, Navbar } from "react-bootstrap"
import './navBar.scss'

const NavBar = observer(() => {
    const {user, modals} = useContext(Context)

    return (
        <div>
            <Navbar bg='secondary' expand="lg">
                <Container fluid className='d-flex justify-content-between'>
                    <Navbar.Brand className='text-white fs-3' href="/">HobbyLaser</Navbar.Brand>
                    {user._isAuth ? 
                    <UserMenu/>
                    :
                    <Button size='sm' variant='outline-light' onClick={() => modals.setAuth({show:true})}>Авторизация</Button>
                    }   
                </Container>                
            </Navbar>
        </div>
    )
})

export default NavBar