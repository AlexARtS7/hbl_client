import React from "react"
import { FloatingLabel, Form } from "react-bootstrap"

export const SelectInput = (props) => {
    const {label, value, defaultValue, setValue, categories, isInvalid} = props
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={label}
            className="mb-3"
        >
            <Form.Select 
            isInvalid={isInvalid}
            className='mb-3'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            <option value={0}>{defaultValue}</option>
            {categories.map(e => 
                <option 
                    key={e.id} 
                    value={e.name}  
                >{e.name}</option>
            )} 
            </Form.Select>
            <Form.Control.Feedback type="invalid">{isInvalid !== 'ERROR' && isInvalid}</Form.Control.Feedback>
        </FloatingLabel>
    )
}