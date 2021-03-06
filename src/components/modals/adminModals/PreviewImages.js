import { deleteFiles } from "http/productApi"
import { Context } from "index"
import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { generateFormData } from "./generateFormData"

const PreviewImages = (props) => {
    const {products} = useContext(Context)
    const {product, loadedFiles, setLoadedFiles} = props
    const [delArray, setDelArray] = useState([...loadedFiles.map(element => ({name: element, status: false}))])
    const [delFilesBtnActive, setDelFilesBtnActive] = useState(false)
    
    const setPreview = (index, element) => {
        setDelArray(delArray.map(item => item.name === element? {...item, status:false}:item))
        setLoadedFiles([...loadedFiles.filter((_,i) => i === index), ...loadedFiles.filter((_,i) => i !== index)])
    }

    const selectDelFiles = (index) => {
        setDelArray(delArray.map(item => item.name === index ? {...item, status:!item.status}:item))
    }
  
    const checked = (element) => {
        const item = delArray.find(item => item.name == element)
        return item ? item.status:false
    }

    const deleteSelectedFiles = () => {
        const formData = generateFormData({id:product.id, 
            filesArray:delArray.filter(item => item.status)})
            const resultArray = loadedFiles.filter(filename => !delArray.find(item => item.name === filename).status)
        deleteFiles(formData)        
        .then(response => {
            setLoadedFiles(resultArray)
            setDelArray(delArray.filter(item => !item.status))
            products.initReload()
        })
    }

    useEffect(() => {
        if(delArray.length !== loadedFiles.length) {
            const addArray = []
            loadedFiles.forEach((filename,i)=> i >= delArray.length && addArray.push({name: filename, status: false}))
            
            setDelArray([
                ...delArray.map(element => ({name: element.name, status: element.status})),
                ...addArray
            ])
        }        
    }, [loadedFiles])

    useEffect(() => {
        delArray.find(item => item.status === true) ? setDelFilesBtnActive(true):setDelFilesBtnActive(false)
    },[delArray])
    
    return (
        <>   
        <Container className='border rounded mb-3 d-flex flex-row'>
            <Row>
                {loadedFiles.map((element,i) => 
                    <Col key={i}>
                        <Card style={{ width: '5rem' }} className='m-1 position-relative'>
                            <Card.Img 
                                onClick={() => setPreview(i, element)}
                                src={process.env.REACT_APP_API_URL + `${product.id}/` + element} 
                                title={element}/>
                            { i === 0 && 
                            <div 
                                className='w-100 text-center' 
                                style={{fontSize: 10}}>????????????
                            </div>}
                            { i > 0 && 
                                <div className='d-flex justify-content-around'>
                                    <span style={{fontSize: 10}}>??????????????</span>
                                    <Form.Check 
                                    onChange={() => selectDelFiles(element)}
                                    checked={checked(element)}
                                    style={{fontSize: 10}}
                                    type='checkbox'
                                    />
                                </div>}
                        </Card>
                    </Col>                      
                )}
            </Row> 
        </Container>
            <Button 
                size="sm"
                disabled={!delFilesBtnActive}
                className='mb-3 w-100' 
                variant='outline-danger'
                onClick={deleteSelectedFiles}
            >?????????????? ???????????????????? ??????????????????????</Button>
        </>
    )
}

export default PreviewImages