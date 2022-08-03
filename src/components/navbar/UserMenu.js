import { Context } from "index"
import React, { useContext } from "react"
import { Dropdown, Nav } from "react-bootstrap"
import { BASKET_ROUTE } from "utils/const"

const UserMenu = () => {
    const {user, modals} = useContext(Context)

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
                    {user.data.role === 'USER'? 
                        'navbar_logo_user' :
                        'navbar_logo_admin'}
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
            <Nav.Link className='navbar_box_contur navbar_logo_basket' href={BASKET_ROUTE}></Nav.Link>
        </div>       
    )
}

export default UserMenu