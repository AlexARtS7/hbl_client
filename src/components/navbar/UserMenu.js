import { Context } from "index"
import React, { useContext } from "react"
import { Dropdown, Nav } from "react-bootstrap"

const UserMenu = (props) => {
    const {user} = useContext(Context)
    const {
        role,      
        setEditProductModalActive,
        setTypeHandleModalActive} = props
    

    const editProductModalHandler = () => {
        setEditProductModalActive(true)
    }

    const typeModalHandler = () => {
        setTypeHandleModalActive(true)
    }

    const removeUserAcount = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
    }
    
    return (
        <div className='d-flex align-items-center'>
            <div style={{marginRight: 10}} className='text-white'>{user._user.login}</div>
            <Dropdown align="end">
                <Dropdown.Toggle id="dropdown-basic" variant="outline-light"  className=
                {user._user.role === 'USER'? 
                    'navbar_logo_user' :
                    'navbar_logo_admin'}
                    >                        
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {role === 'ADMIN' && 
                        <>
                            <Dropdown.Item onClick={() => editProductModalHandler()}>Добавить продукт</Dropdown.Item>
                            <Dropdown.Item onClick={() => typeModalHandler()}>Добавить/Удалить тип</Dropdown.Item>
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