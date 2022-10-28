import useInput from "components/hooks/useInput"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState} from "react"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import OffCanvasModal from "components/modals/OffCanvasModal"
import './searchBar.scss'
import { useEffect } from "react"

const SearchBar = observer(() => {
    const {products} = useContext(Context)
    const {value:findText, setValue:setFindText} = useInput('')

    const [categoriesSrc, setCategoriesSrc] = useState([])
    const [show, setShow] = useState(false);

    // const setCategory = (e) => {
    //     products.setSelectedCategory(products.categories.find(category => category.name.includes(e.target.textContent)))
    //     setFindText('')
    // }

    // const selectAllCategories = () => {
    //     products.setSelectedCategory({})
    //     setFindText('')
    // }

    const setCategory = (e) => {
        products.setSelectedCategory(e)
        setFindText('')
    }

    const findCategory = (value) => {
        setFindText(value)
        const findResult = products.categories.find(category => category.name.toLowerCase().includes(value.toLowerCase())) || {}
        value && findResult.name && products.setSelectedCategory(findResult) 
        !value && products.setSelectedCategory({}) 
    }

    useEffect(() => {
        if(products.selectedCategory) {
            const srcArr = [products.selectedCategory]
            let categoriesIds = products.selectedCategory.categoryId
            while (products.categories.find(e => e.id === categoriesIds)) {
                const targetCategory = products.categories.find(e => e.id === categoriesIds)
                srcArr.unshift(targetCategory)
                categoriesIds = targetCategory.categoryId
            }
            setCategoriesSrc(srcArr)
        }
    },[products.selectedCategory])
    
    return (
    <>
        <OffCanvasModal show={show} setShow={setShow}/>
        <Container className="p-1 my-2">
            <InputGroup size="sm">
                <Button variant="outline-secondary" className="search" onClick={() => setShow(true)}></Button>
                <Form.Control 
                    value={findText} 
                    className="shadow-none" 
                    onChange={(e) => findCategory(e.target.value)}/>
            </InputGroup>  
            <div className='mt-1'>... 
                {categoriesSrc.map(e => <span role='button' onClick={() => setCategory(e)}>/{e.name}</span>)}
            </div>
        </Container>    
    </>                  
    )
})

export default SearchBar