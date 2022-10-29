import useInput from "components/hooks/useInput"
import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext, useState} from "react"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import OffCanvasModal from "components/modals/OffCanvasModal"
import './searchBar.scss'
import { useEffect } from "react"
import { BarChartSteps, Diagram2, Search } from "react-bootstrap-icons"

const SearchBar = observer(() => {
    const {products} = useContext(Context)
    const {value:findText, setValue:setFindText} = useInput('')

    const [categoriesSrc, setCategoriesSrc] = useState([])
    const [forwardSrc, setForwardSrc] = useState([])
    const [show, setShow] = useState(false);

    const setCategory = (e) => {
        if(!products.selectedCategory.id && !e.id) return
        products.setSelectedCategory(e)
    }

    const findCategory = (value) => {
        setFindText(value)
        const findResult = products.categories.find(category => category.name.toLowerCase().includes(value.toLowerCase())) || {}
        value && findResult.name && setCategory(findResult) 
        !value && setCategory({})
    }

    useEffect(() => {
        const srcArr = [products.selectedCategory]
        let categoriesIds = products.selectedCategory.categoryId
        while (products.categories.find(e => e.id === categoriesIds)) {
            const targetCategory = products.categories.find(e => e.id === categoriesIds)
            srcArr.unshift(targetCategory)
            categoriesIds = targetCategory.categoryId
        }
        setCategoriesSrc(srcArr)
        if(products.selectedCategory.id){
            setForwardSrc(products.categories.filter(e => e.categoryId === products.selectedCategory.id))
        } else {
            setForwardSrc(products.categories.filter(e => !e.categoryId))
        }
    },[products.selectedCategory])
    
    useEffect(() => {
        setForwardSrc(products.categories.filter(e => !e.categoryId))
    },[products.categories])

    return (
    <>
        <OffCanvasModal show={show} setShow={setShow}/>
        <Container className="p-1 my-2">
            <InputGroup size="sm">
                <Button variant="outline-secondary" onClick={() => setShow(true)}><BarChartSteps/></Button>
                <InputGroup.Text><Search/></InputGroup.Text>
                <Form.Control 
                    value={findText} 
                    className="shadow-none" 
                    onChange={(e) => findCategory(e.target.value)}/>
            </InputGroup>  
            <div className='mt-1'>
                <span onClick={() => setCategory({})} role='button'>...</span> 
                {categoriesSrc.map((e,i) => <span key={i} className="srclink" role='button' onClick={() => setCategory(e)}>/{e.name}</span>)}
                <span className="ms-5">
                    <Diagram2 className="me-2"/>
                    {forwardSrc.map(e => 
                        <span 
                            key={e.id} 
                            className="me-2 srclink" 
                            style={{opacity:0.5}} 
                            role='button' 
                            onClick={() => setCategory(e)}>/{e.name}</span>)}
                </span>
            </div>
        </Container>    
    </>                  
    )
})

export default SearchBar