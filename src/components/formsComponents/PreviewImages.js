import { Context } from "index"
import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { SHOP_ROUTE } from "utils/const"

const PreviewImages = ({product, loadedFiles, setLoadedFiles}) => {
    const {products, modals} = useContext(Context)
    const [delArray, setDelArray] = useState([])
    const [delFilesBtnActive, setDelFilesBtnActive] = useState(false)
    
    const setPreview = (index, element) => {
        setDelArray(delArray.map(item => item.name === element? {...item, delete:false}:item))
        setLoadedFiles([...loadedFiles.filter((_,i) => i === index), ...loadedFiles.filter((_,i) => i !== index)])        
    }

    const selectDelFiles = (index) => {
        setDelArray(delArray.map(item => item.name === index ? {...item, delete:!item.delete}:item))
    }

    const deleteFiles = () => {
        const res = delArray.filter(e => e.delete)
        products.deleteImages(product.id, res.map(e => e.name))
        .then(_ => {
            modals.setEditImages({show:true,product:products.list.find(e => e.id === product.id)})
            if(location.pathname !== SHOP_ROUTE) products.fetchOneProduct(product.id)
        })
    }
  
    const checked = (element) => {
        const item = delArray.find(item => item.name == element)
        return item ? item.delete:false
    }
    
    useEffect(() => {
        delArray.find(item => item.delete === true) ? setDelFilesBtnActive(true):setDelFilesBtnActive(false)
    },[delArray])

    useEffect(() => {
        if(loadedFiles.length !== delArray.length) setDelArray(loadedFiles.map(e => ({name: e.img, delete: false})))
    }, [loadedFiles])
   
    return (
        <>   
        <Container className='border rounded mb-3 d-flex flex-row'>
            <Row>
                {loadedFiles ? loadedFiles.map((e,i) => 
                    <Col key={i}>
                        <Card style={{ width: '5rem' }} className='m-1 position-relative'>
                            <Card.Img 
                                onClick={() => setPreview(i, e.img)}
                                src={process.env.REACT_APP_API_URL + `${product.id}/` + e.img} 
                                title={e.img}
                            />
                            { i === 0 && 
                                <div 
                                    className='w-100 text-center' 
                                    style={{fontSize: 10}}>ПРЕВЬЮ
                                </div>}
                            { i > 0 && 
                                <div className='d-flex justify-content-around'>
                                    <span style={{fontSize: 10}}>Удалить</span>
                                    <Form.Check 
                                    onChange={() => selectDelFiles(e.img)}
                                    checked={checked(e.img)}
                                    style={{fontSize: 10}}
                                    type='checkbox'
                                    />
                                </div>
                            }
                        </Card>
                    </Col>)
                    :
                    <>
                        <div className="text-center my-2">Изображения на сервере отсутствуют...</div>
                    </>
                }
            </Row> 
        </Container>
            <Button 
                size="sm"
                disabled={!delFilesBtnActive}
                className='mb-3 w-100' 
                variant='outline-danger'
                onClick={deleteFiles}
            >Удалить отмеченные изображения</Button>
        </>
    )
}

export default PreviewImages