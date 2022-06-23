import { Context } from "index"
import React, { useContext } from "react"
import './userMenu.scss'

const UserMenu = ({role, setUserMenuActive, setAdminModalActive}) => {
    const {user} = useContext(Context)

    const adminModalHandler = () => {
        setAdminModalActive(true)
        setUserMenuActive(false)
    }

    const removeUserAcount = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        setUserMenuActive(false)
    }

    return (
        <div className='usermenu_back' onClick={() => setUserMenuActive(false)}>
            <ul className='usermenu' onClick={(e) => e.stopPropagation()}>
                {role && <><li onClick={() => adminModalHandler()} >Администрирование</li><hr/></>}
                <li>мой профиль</li>
                <li>разнок</li>
                <hr/>
                <li onClick={() => removeUserAcount()}>Выйти из акаунта</li>
            </ul>
        </div>        
    )
}

export default UserMenu