import React from "react"

export const Input = (props) => {
    const {value, setValue, name, label, type} = props
    return (
        <>
            <p className='modal_label_min'>{label}</p>
            <input 
                className="modal_input"
                value={value}
                type={type}
                name={name}
                onChange={e => setValue(e.target.value)}
            />
        </>
    )
}

export const Select = (props) => {
    const {value, array, setValue, label} = props
    return (
        <>
            <p className='modal_label_min'>{label}</p>
            <select 
                className='modal_select'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value={0}>Выберите категорию</option> 
                {array.map(e => 
                    <option 
                        key={e.id} 
                        value={e.name}  
                    >{e.name}</option>
                )} 
            </select>
        </>
        
    )
}

export const Textarea = (props) => {
    const {value, setValue, label} = props
    return (
        <>
            <p className='modal_label_min'>{label}</p>
            <textarea
                style={{resize: 'vertical', minHeight:'100px', maxHeight:'400px'}}
                className='modal_input'
                value={value}
                onChange={e => setValue(e.target.value)}
            >
            </textarea>
        </>
    )
}