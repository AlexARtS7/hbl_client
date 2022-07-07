import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect } from "react"
import './shopList.scss'
import ShopListItem from "./ShopListItem"

const ShopList = observer(() => {
    const {products} = useContext(Context)
    const {user} = useContext(Context)
    
    return (
        <div className='shoplist'>
            {products._products.map(product => 
                <ShopListItem product={product} key={product.id}/>
            )}
        </div>
    )
})

export default ShopList