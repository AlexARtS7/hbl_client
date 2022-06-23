
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import LoginModal from "../auth/AuthModal"
import './navBar.scss'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [loginModalActive, setLoginModalActive] = useState(false)
    
    return (
        <div className="navbar_container flex_between">
           <h1 className="navbar_title">HobbyLaser</h1>
           <div>
                {user._isAuth ? 
                    <div className='flex_between'>
                        <div className='navbar_login'>{user._user.login}</div>
                        <div className=
                            {user._user.role === 'USER'? 
                            'navbar_image_box navbar_logo_user' :
                            'navbar_image_box navbar_logo_admin'}>
                        </div>
                    </div> : 
                    <button className='navbar_button' onClick={() => setLoginModalActive(true)}>Войти</button>
                }
            
           </div>
           {loginModalActive && 
            <LoginModal setActive={setLoginModalActive}/>}
        </div>
    )
})

export default NavBar