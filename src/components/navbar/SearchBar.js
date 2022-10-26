import useInput from "components/hooks/useInput"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState} from "react"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import OffCanvasModal from "components/modals/OffCanvasModal"
import './searchBar.scss'

const SearchBar = observer(() => {
    const {products} = useContext(Context)
    const {value:findText, setValue:setFindText} = useInput('')

    const [show, setShow] = useState(false);

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
    <>
        <OffCanvasModal show={show} setShow={setShow}/>
        <Container className="p-1 my-2">
            <InputGroup size="sm">
                <Button variant="outline-secondary" className="search" onClick={() => setShow(true)}></Button>
                
                {/* <DropdownButton 
                    variant="outline-secondary"
                    title={products.selectedCategory.name ? products.selectedCategory.name : "Все категории"}
                >
                    <Dropdown.Item onClick={selectAllCategories}>Все категории</Dropdown.Item>  
                    <Dropdown.Divider />
                    {products.categories.map(category => category.categoryId ? null: chapters(category))}
                </DropdownButton> */}
                {/* <InputGroup.Text className="search"></InputGroup.Text> */}
                <Form.Control 
                    value={findText} 
                    className="shadow-none" 
                    onChange={(e) => findCategory(e.target.value)}/>
            </InputGroup>  
        </Container>    
    </>                  
    )
})

export default SearchBar