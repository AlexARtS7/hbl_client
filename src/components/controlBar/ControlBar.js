import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Container, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap"
import './controlBar.scss'

const ControlBar = observer(() => {
    const {products} = useContext(Context)
    
    return (
        <Container className="p-2 mt-2 mb-2">
            <InputGroup size="sm">
                <DropdownButton
                    variant="outline-secondary"
                    title="Категории"
                    id="input-group-dropdown-1"
                    // onChange={(e) => 
                    //     products.setSelectedType(products._types.filter(type => type.id === +e.target.value)[0] || {})}
                >
                    <Dropdown.Item value={0}>Весь список</Dropdown.Item>  
                    <Dropdown.Divider />
                    {products._types.map(type => 
                        <Dropdown.Item value={type.id} key={type.id}>{type.name}</Dropdown.Item>
                    )}
                </DropdownButton>
                <InputGroup.Text className="search"></InputGroup.Text>
                <Form.Control className="shadow-none"/>
            </InputGroup>  
        </Container>              
    )
})

export default ControlBar