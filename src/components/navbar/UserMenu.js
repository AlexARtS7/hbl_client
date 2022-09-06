import { Context } from "index"
import React, { useContext } from "react"
import { Dropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BASKET_ROUTE } from "utils/const"

const UserMenu = () => {
    const {user, modals} = useContext(Context)
    const navigate = useNavigate()

    const removeUserAcount = () => {
        localStorage.removeItem('token')
        user.setData({})
        user.setIsAuth(false)
    }
    
    return (
        <div className='d-flex align-items-center'>
            <div style={{marginRight: 10}} className='text-white'>{user.data.login}</div>
            <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light"  className=
                    {user.data.role === 'ADMIN'? 
                        'navbar_logo_admin'
                        :
                        'navbar_logo_user' 
                        }
                    >                        
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {user.data.role === 'ADMIN' && 
                        <>
                            <Dropdown.Item onClick={() => modals.setEditProduct({show:true})}>Добавить продукт</Dropdown.Item>
                            <Dropdown.Item onClick={() => modals.setEditType({show:true})}>Добавить/Удалить тип</Dropdown.Item>
                            <Dropdown.Divider />
                        </>
                    }
                    <Dropdown.Item onClick={() => removeUserAcount()}>Выйти из акаунта</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className='navbar_box_contur navbar_logo_basket' onClick={() => navigate(BASKET_ROUTE)}></div>
        </div>       
    )
}

export default UserMenu