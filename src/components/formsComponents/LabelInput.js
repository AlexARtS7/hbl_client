import React from "react"
import { FloatingLabel, Form } from "react-bootstrap"

export const LabelInput = (props) => {
    const {label, type, value, setValue, className, textarea} = props
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={label}
            className={className}
        >
            <Form.Control 
                style={textarea? {minHeight:55}:null}
                as={textarea}
                type={type} 
                name={type}
                placeholder={type} 
                value={value} 
                onChange={e => setValue(e.target.value)}
            />
        </FloatingLabel>
    )
}