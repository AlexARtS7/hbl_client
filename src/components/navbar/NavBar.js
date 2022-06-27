
import UserMenu from "components/userMenu/UserMenu"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import AuthModal from "../../components/auth/AuthModal"
import AdminPanel from "components/admin/AdminPanel"
import './navBar.scss'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [authModalActive, setAuthModalActive] = useState(false)
    const [adminPanelActive, setAdminPanelActive] = useState(false)
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
                                        setAdminModalActive={setAdminPanelActive}/>}
                    </div> : 
                    <button className='navbar_button' onClick={() => setAuthModalActive(true)}>Войти</button>
                }
            
           </div>
           {authModalActive && <AuthModal setActive={setAuthModalActive}/>}
           {adminPanelActive && <AdminPanel setActive={setAdminPanelActive}/>}
        </div>
    )
})

export default NavBar