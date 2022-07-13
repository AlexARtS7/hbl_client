import { Context } from "index"
import React, { useContext } from "react"
import './userMenu.scss'

const UserMenu = (props) => {
    const {user} = useContext(Context)
    const {
        role,      
        setUserMenuActive, 
        setEditProductModalActive,
        setTypeHandleModalActive} = props
    

    const editProductModalHandler = () => {
        setEditProductModalActive(true)
        setUserMenuActive(false)
    }

    const typeModalHandler = () => {
        setTypeHandleModalActive(true)
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
                {role === 'ADMIN' && 
                    <>
                        <li onClick={() => editProductModalHandler()} >Добавить продукт</li>
                        <li onClick={() => typeModalHandler()} >Добавить/Удалить тип</li>
                        <hr/>
                    </>}
                <li>мой профиль</li>
                <li>разнок</li>
                <hr/>
                <li onClick={() => removeUserAcount()}>Выйти из акаунта</li>
            </ul>
        </div>        
    )
}

export default UserMenu