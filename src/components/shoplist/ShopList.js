import DelProductModal from "components/modals/adminModals/DelProductModal"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import './shopList.scss'
import ShopListItem from "./ShopListItem"

const ShopList = observer(() => {
    const {products} = useContext(Context)
    const [product, setProduct] = useState({})
    const {user} = useContext(Context)
    const [delModalActive, setDelModalActive] = useState(false)   
    const role = user._user.role  

    useEffect(() => {
        if(product.id) setDelModalActive(true)
    }, [product])

    useEffect(() => {
        if(product.id && !delModalActive) setProduct({})
    }, [delModalActive])
    
    return (
        <div className='shoplist'>
            {products._products.map(product => 
                <ShopListItem 
                    product={product} 
                    key={product.id} 
                    role={role} 
                    setProduct={setProduct}/>
            )}     
            {delModalActive && <DelProductModal setActive={setDelModalActive} product={product}/>}  
        </div>
    )
})

export default ShopList