import React, { useContext, useRef, useState } from "react"
import { changeOrderFiles, createProduct, deleteProduct, updateData, uploadFiles } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { AddFilesInput, LabelInput, SelectInput } from "../modalComponents"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import { generateFormData } from "./generateFormData"
import PreviewImages from "./PreviewImages"
import { Button, Modal } from "react-bootstrap"

const EditProductModal = (props) => {
    const navigate = useNavigate()
    const {products} = useContext(Context)
    const {onHide, product = ''} = props    
    
    const {value:name, setValue:setName} = useInput(product.name || '')
    const {value:price, setValue:setPrice} = useInput(product.price || 0)
    const type = product.id ? products._types.filter(type => type.id === +product.typeId)[0].name : ''
    const {value:typeName, setValue:setTypeName} = useInput(type)
    const [loadedFiles, setLoadedFiles] = useState(product.img)
    const [files, setFiles] = useState({})
    const buttonRef = useRef()

    const addProduct = () => {
        const formData = generateFormData({
            name, price, files, types:products._types, typeName
        })
        createProduct(formData).then(data => {
            navigate(PRODUCTS_ROUTE + '/' +  data.id)
            onHide(false)
        })            
    }

    const addFiles = () => {
        const formData = generateFormData({id:product.id, files, filesArray:loadedFiles})
        uploadFiles(formData).then(response => {
            const data = JSON.parse(response)
            setLoadedFiles(data)            
            setFiles({})
            buttonRef.current.value = ''
            products.initReload()
        })
    }

    const updateProduct = () => {
        if(product && files[0]) addFiles()
        let formData = generateFormData({id:product.id, filesArray:loadedFiles})
        changeOrderFiles(formData)
        formData = generateFormData({
            id:product.id, name, price, types:products._types, typeName})
        updateData(formData)
        .then(response => {
            products.initReload()
            onHide(false)
        })        
    }

    const deleteHandler = () => {
        const confirmed = confirm(`?????????????? ?? ID: ${product.id} ?????????? ????????????! ?????????????????????`)
        if(confirmed){
            deleteProduct(product.id)
            .then(response => {
                products.initReload()
                onHide(false)
            })            
        }        
    }
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                {product ? '???????????????? ????????????????':'???????????????? ??????????????'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LabelInput label='????????????????' value={name} setValue={setName} type='name'/>
            <SelectInput 
                label='??????????????????'
                defaultValue='???????????????? ??????????????????' value={typeName} setValue={setTypeName}
                types={products._types} />
            <LabelInput label='??????????????????' value={price} setValue={setPrice} type='number'/>
            <AddFilesInput 
                files={files} setFiles={setFiles} 
                addButton={product.id && files[0]} onButtonClick={addFiles} buttonRef={buttonRef}/>
            {product.id && 
                <PreviewImages
                    product={product} 
                    loadedFiles={loadedFiles} setLoadedFiles={setLoadedFiles}
                />
            }
            {product.id && 
                <Button 
                    size="sm"
                    className='mb-3 w-100' 
                    variant='outline-danger'
                    onClick={deleteHandler}
                >?????????????? ?????????????? ???? ???????? ????????????</Button>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onHide(false)} variant='outline-secondary'>??????????????</Button>
            {product.id ?
            <Button onClick={updateProduct} variant='success'>????????????????</Button>
            :
            <Button onClick={addProduct} variant='success'>???????????????? ??????????????</Button>
            }            
        </Modal.Footer>
        </Modal>
    )
}

export default EditProductModal

