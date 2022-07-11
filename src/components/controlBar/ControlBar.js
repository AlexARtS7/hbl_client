
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import './controlBar.scss'

const ControlBar = observer(() => {
    const {user} = useContext(Context)

    return (
        <div className='controlbar'>
           <select 
                className='channel_select' 
                >
                <option>шкатулки</option>
            </select>
        </div>
    )
})

export default ControlBar