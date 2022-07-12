
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import './controlBar.scss'

const ControlBar = observer(() => {
    const {products} = useContext(Context)
    const types = products._types
    
    return (
        <div className='controlbar'>
           <select 
                className='controlbar_select' 
                onChange={(e) => products.setSelectedType(types.filter(type => type.id === +e.target.value)[0] || {})}
                >             
                    <option value={0}>Весь список</option>     
                    {types.map(type => 
                        <option 
                            value={type.id}
                            key={type.id}              
                        >{type.name}</option>
                    )}
            </select>
        </div>
    )
})

export default ControlBar