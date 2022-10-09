import React from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const InputCategoryGroup = (props) => {
  const {label, buttonText, value, setValue, onButtonClick, newCategoryVisible, setNewCategoryVisible} = props
  return (
    <InputGroup className="mb-3">
        <Form.Control
          placeholder={label}
          value={value} 
          onChange={e => setValue(e.target.value)}
        />        
        <DropdownButton
          disabled={!value}
          variant={newCategoryVisible? "outline-success":"outline-danger"}
          title={newCategoryVisible? "Видимая":"Скрытая"}
        >
          <Dropdown.Item onClick={() => setNewCategoryVisible(!newCategoryVisible)}>{!newCategoryVisible? "Видимая":"Скрытая"}</Dropdown.Item>
        </DropdownButton>
        <Button variant="outline-success" disabled={!value} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </InputGroup>
  )
}

export default InputCategoryGroup