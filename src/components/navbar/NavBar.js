import ControlBar from "components/controlBar/ControlBar"
import EditProductModal from "components/modals/adminModals/EditProductModal"
import TypeHandlerModal from "components/modals/adminModals/TypeHandlerModal"
import UserMenu from "components/navbar/UserMenu"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { Button, Container, Navbar, Row } from "react-bootstrap"
import AuthModal from "../modals/authModal/AuthModal"
import './navBar.scss'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [authModalActive, setAuthModalActive] = useState(false)
    const [editProductModalActive, setEditProductModalActive] = useState(false)
    const [typeHandleModalActive, setTypeHandleModalActive] = useState(false)

    return (
        <div>
            <Navbar bg='secondary' expand="lg">
                <Container fluid className='d-flex justify-content-between'>
                    <Navbar.Brand className='text-white' href="/">HobbyLaser</Navbar.Brand>
                    {user._isAuth ? 
                    <UserMenu
                        role={user._user.role} 
                        setEditProductModalActive={setEditProductModalActive}
                        setTypeHandleModalActive={setTypeHandleModalActive}
                    />
                    :
                    <Button size='sm' variant='outline-light' onClick={() => setAuthModalActive(true)}>Авторизация</Button>
                    }   
                </Container>                
            </Navbar>
           {authModalActive && <AuthModal show={authModalActive} onHide={setAuthModalActive}/>}
           {editProductModalActive && <EditProductModal show={editProductModalActive} onHide={setEditProductModalActive}/>}
           {typeHandleModalActive && <TypeHandlerModal show={typeHandleModalActive} onHide={setTypeHandleModalActive}/>}
        </div>
    )
})

export default NavBar