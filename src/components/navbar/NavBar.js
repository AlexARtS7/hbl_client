import UserMenu from "components/navbar/UserMenu"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Button, Container, Navbar } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { SHOP_ROUTE } from "utils/const"
import SearchBar from "./SearchBar"
import './navBar.scss'

const NavBar = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const isShop = location.pathname === SHOP_ROUTE
    const {user, modals} = useContext(Context)

    return (
        <div>
            <Navbar bg='secondary' expand="lg">
                <Container  fluid className='d-flex justify-content-between'>
                    <Navbar.Brand className='text-white fs-3 btn' onClick={() => navigate(SHOP_ROUTE)}>HobbyLaser</Navbar.Brand>
                    {user.isAuth ? 
                    <UserMenu/>
                    :
                    <Button size='sm' variant='outline-light' onClick={() => modals.setAuth({show:true})}>Авторизация</Button>
                    }   
                </Container>  
                                             
            </Navbar>
            {isShop &&
                <Container  fluid className='d-flex justify-content-between bg-light border-bottom'>
                    <SearchBar/>
                </Container> 
            } 
        </div>
    )
})

export default NavBar