
import EditProductModal from "components/modals/adminModals/EditProductModal"
import TypeHandlerModal from "components/modals/adminModals/TypeHandlerModal"
import UserMenu from "components/userMenu/UserMenu"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import AuthModal from "../modals/authModal/AuthModal"
import './navBar.scss'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [authModalActive, setAuthModalActive] = useState(false)
    const [editProductModalActive, setEditProductModalActive] = useState(false)
    const [typeHandleModalActive, setTypeHandleModalActive] = useState(false)
    const [userMenuActive, setUserMenuActive] = useState(false)

    return (
        <div className='navbar_container flex_between'>
           <h1 className='navbar_title'>HobbyLaser</h1>
           <div>
                {user._isAuth ? 
                    <div className='flex_between'>
                        <div className='navbar_login'>{user._user.login}</div>
                        <div className=
                            {user._user.role === 'USER'? 
                            'navbar_box_contur navbar_logo_user' :
                            'navbar_box_contur navbar_logo_admin'}
                            onClick={() => setUserMenuActive(true)}>
                        </div>
                        <div className='navbar_box_contur navbar_logo_basket'></div>
                        {userMenuActive && 
                            <UserMenu   role={user._user.role} 
                                        setUserMenuActive={setUserMenuActive}
                                        setEditProductModalActive={setEditProductModalActive}
                                        setTypeHandleModalActive={setTypeHandleModalActive}/>}
                    </div> : 
                    <button className='navbar_button' onClick={() => setAuthModalActive(true)}>Войти</button>
                }            
           </div>
           {authModalActive && <AuthModal show={authModalActive} onHide={setAuthModalActive}/>}
           {editProductModalActive && <EditProductModal show={editProductModalActive} onHide={setEditProductModalActive}/>}
           {typeHandleModalActive && <TypeHandlerModal show={typeHandleModalActive} onHide={setTypeHandleModalActive}/>}
        </div>
    )
})

export default NavBar