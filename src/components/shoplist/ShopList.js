import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import './shopList.scss'
import ShopListItem from "./ShopListItem"

const ShopList = observer(() => {
    const {user} = useContext(Context)
    return (
        <div className='shoplist'>
            <ShopListItem/>
            <ShopListItem/>
            <ShopListItem/>
            <ShopListItem/>
            <ShopListItem/>
        </div>
    )
})

export default ShopList