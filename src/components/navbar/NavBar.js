
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
                    <div>{user._user.login}</div> : 
                    <button onClick={() => setLoginModalActive(true)}>Войти</button>
                }
            
           </div>
           {loginModalActive && 
            <LoginModal setActive={setLoginModalActive}/>}
        </div>
    )
})

export default NavBar