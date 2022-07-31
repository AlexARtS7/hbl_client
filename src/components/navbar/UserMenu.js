import { Context } from "index"
import React, { useContext } from "react"
import { Dropdown, Nav } from "react-bootstrap"

const UserMenu = () => {
    const {products, user, modals} = useContext(Context)

    const removeUserAcount = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        products.initReload()
    }
    
    return (
        <div className='d-flex align-items-center'>
            <div style={{marginRight: 10}} className='text-white'>{user.user.login}</div>
            <Dropdown align="end">
                <Dropdown.Toggle id="dropdown-basic" variant="outline-light"  className=
                {user.user.role === 'USER'? 
                    'navbar_logo_user' :
                    'navbar_logo_admin'}
                    >                        
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {user.user.role === 'ADMIN' && 
                        <>
                            <Dropdown.Item onClick={() => modals.setEditProduct({show:true})}>Добавить продукт</Dropdown.Item>
                            <Dropdown.Item onClick={() => modals.setEditType({show:true})}>Добавить/Удалить тип</Dropdown.Item>
                            <Dropdown.Divider />
                        </>
                    }
                    <Dropdown.Item onClick={() => removeUserAcount()}>Выйти из акаунта</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Nav.Link className='navbar_box_contur navbar_logo_basket' href='/basket'></Nav.Link>
        </div>       
    )
}

export default UserMenu