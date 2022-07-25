import useInput from "components/hooks/useInput"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef } from "react"
import { Container, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap"
import './controlBar.scss'

const ControlBar = observer(() => {
    const {products} = useContext(Context)
    let {value:findText, setValue:setFindText} = useInput('')
    
    useEffect(() => {
        const findResult = products._types.find(type => type.name.toLowerCase().includes(findText.toLowerCase())) || {}
        findText && findResult.name && products.setSelectedType(findResult)  
    }, [findText])        

    const setType = (e) => {
        products.setSelectedType(products._types.find(type => type.name.includes(e.target.textContent)))
    }
         
    return (
        <Container className="p-2 mt-2 mb-2">
            <InputGroup size="sm">
                <DropdownButton 
                    variant="outline-secondary"
                    title={products._selectedType.name ? products._selectedType.name : "Все категории"}
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item onClick={() => products.setSelectedType({})} value={0}>Все категории</Dropdown.Item>  
                    <Dropdown.Divider />
                    {products._types.map(type => 
                        <Dropdown.Item onClick={e => setType(e)} value={type.id} key={type.id}>{type.name}</Dropdown.Item>
                    )}
                </DropdownButton>
                <InputGroup.Text className="search"></InputGroup.Text>
                <Form.Control 
                    value={findText} 
                    className="shadow-none" 
                    onChange={(e) => setFindText(e.target.value)}/>
            </InputGroup>  
        </Container>              
    )
})

export default ControlBar