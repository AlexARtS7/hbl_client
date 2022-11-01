import React from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { PlusSquare } from 'react-bootstrap-icons'

const InputCategoryGroup = (props) => {
  const {label, buttonText, value, setValue, onButtonClick} = props
  return (
    <InputGroup className="mb-2">
        <Form.Control
          placeholder={label}
          value={value} 
          onChange={e => setValue(e.target.value)}
        />        
        <Button variant="outline-success" disabled={!value} onClick={onButtonClick}>
          {buttonText ? buttonText:<PlusSquare/>}
        </Button>
      </InputGroup>
  )
}

export default InputCategoryGroup