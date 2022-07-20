
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import './controlBar.scss'

const ControlBar = observer(() => {
    const {products} = useContext(Context)
    
    return (
        <div className='controlbar'>
           <select 
                className='controlbar_select' 
                onChange={(e) => 
                    products.setSelectedType(products._types.filter(type => type.id === +e.target.value)[0] || {})}
                >             
                    <option value={0}>Весь список</option>     
                    {products._types.map(type => 
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