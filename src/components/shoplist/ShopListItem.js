import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import './shopListItem.scss'

const ShopListItem = observer(() => {
    const {user} = useContext(Context)
    return (
        <div className='shoplistitem'>
           
        </div>
    )
})

export default ShopListItem