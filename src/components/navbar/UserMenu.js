import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect } from "react"
import { Dropdown } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BASKET_ROUTE } from "utils/const"

const UserMenu = observer(() => {
    const {user, modals, basket} = useContext(Context)
    const navigate = useNavigate()

    const removeUserAcount = () => {
        localStorage.removeItem('token')
        user.setData({})
        user.setIsAuth(false)
    }

    useEffect(() => {
        if(user.data.id) basket.fetchBasketProducts(user.data.id)
    },[user.data.id])
   
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
            <div className='navbar_box_contur navbar_logo_basket' onClick={() => navigate(BASKET_ROUTE)}>
                {basket.products.length > 0 && <div className="basket_badge">{basket.products.length}</div>}
            </div>
        </div>       
    )
})

export default UserMenu