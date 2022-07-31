import React from "react"
import { FloatingLabel, Form } from "react-bootstrap"

export const LabelInput = (props) => {
    const {label, type, value, setValue, className} = props
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={label}
            className={className}
        >
            <Form.Control 
                type={type} 
                name={type}
                placeholder={type} 
                value={value} 
                onChange={e => setValue(e.target.value)}
            />
        </FloatingLabel>
    )
}