import useInput from "components/hooks/useInput"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Container, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap"
import './controlBar.scss'

const SearchBar = observer(() => {
    const {products} = useContext(Context)
    const {value:findText, setValue:setFindText} = useInput('')
    
    const setCategory = (e) => {
        products.setSelectedCategory(products.categories.find(category => category.name.includes(e.target.textContent)))
        setFindText('')
    }

    const selectAllCategories = () => {
        products.setSelectedCategory({})
        setFindText('')
    }

    const findCategory = (value) => {
        setFindText(value)
        const findResult = products.categories.find(category => category.name.toLowerCase().includes(value.toLowerCase())) || {}
        value && findResult.name && products.setSelectedCategory(findResult) 
        !value && products.setSelectedCategory({}) 
    }
         
    return (
        <Container className="p-1 my-2">
            <InputGroup size="sm">
                <DropdownButton 
                    variant="outline-secondary"
                    title={products.selectedCategory.name ? products.selectedCategory.name : "Все категории"}
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item onClick={selectAllCategories}>Все категории</Dropdown.Item>  
                    <Dropdown.Divider />
                    {products.categories.map(category => 
                        <Dropdown.Item onClick={e => setCategory(e)} key={category.id}>{category.name}</Dropdown.Item>
                    )}
                </DropdownButton>
                <InputGroup.Text className="search"></InputGroup.Text>
                <Form.Control 
                    value={findText} 
                    className="shadow-none" 
                    onChange={(e) => findCategory(e.target.value)}/>
            </InputGroup>  
        </Container>              
    )
})

export default SearchBar