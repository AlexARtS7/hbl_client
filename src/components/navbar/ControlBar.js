import useInput from "components/hooks/useInput"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Container, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap"
import './controlBar.scss'

const ControlBar = observer(() => {
    const {products} = useContext(Context)
    const {value:findText, setValue:setFindText} = useInput('')
    
    const setType = (e) => {
        products.setSelectedType(products._types.find(type => type.name.includes(e.target.textContent)))
        setFindText('')
    }

    const selectAllTypes = () => {
        products.setSelectedType({})
        setFindText('')
    }

    const findType = (value) => {
        setFindText(value)
        const findResult = products._types.find(type => type.name.toLowerCase().includes(value.toLowerCase())) || {}
        value && findResult.name && products.setSelectedType(findResult) 
        !value && products.setSelectedType({}) 
    }
         
    return (
        <Container className="p-1 my-2">
            <InputGroup size="sm">
                <DropdownButton 
                    variant="outline-secondary"
                    title={products._selectedType.name ? products._selectedType.name : "Все категории"}
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item onClick={selectAllTypes}>Все категории</Dropdown.Item>  
                    <Dropdown.Divider />
                    {products._types.map(type => 
                        <Dropdown.Item onClick={e => setType(e)} key={type.id}>{type.name}</Dropdown.Item>
                    )}
                </DropdownButton>
                <InputGroup.Text className="search"></InputGroup.Text>
                <Form.Control 
                    value={findText} 
                    className="shadow-none" 
                    onChange={(e) => findType(e.target.value)}/>
            </InputGroup>  
        </Container>              
    )
})

export default ControlBar