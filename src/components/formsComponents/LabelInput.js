import React from "react"
import { FloatingLabel, Form } from "react-bootstrap"

export const LabelInput = React.memo(function LabelInput(props) {
    const {label, type, value, setValue, className, textarea, isInvalid} = props
    
    return (
        <FloatingLabel 
            controlId="floatingInput"
            label={label}
            className={className}
        >
            <Form.Control   
                isInvalid={isInvalid}
                style={textarea? {minHeight:55}:null}
                as={textarea}
                type={type} 
                name={type}
                placeholder={type} 
                value={value} 
                onChange={e => setValue(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">{isInvalid !== 'ERROR' && isInvalid}</Form.Control.Feedback>
        </FloatingLabel>
    )
})