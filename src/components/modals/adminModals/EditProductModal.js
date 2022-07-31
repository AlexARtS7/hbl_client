import React, { useContext, useEffect, useRef, useState } from "react"
import { changeOrderFiles, createProduct, deleteProduct, fetchProductInfo, updateData, uploadFiles } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import { generateFormData } from "./generateFormData"
import PreviewImages from "../../formsComponents/PreviewImages"
import { Button, Modal } from "react-bootstrap"
import AccordionInfo from "../../formsComponents/AccordionInfo"
import AccordionDescription from "../../formsComponents/AccordionDescription"
import { LabelInput } from "components/formsComponents/LabelInput"
import { SelectInput } from "components/formsComponents/SelectInput"
import { AddFilesInput } from "components/formsComponents/AddFiles"

const EditProductModal = () => {
    const navigate = useNavigate()
    const {products, modals} = useContext(Context)
    const {show, product = ''} = modals._editProduct 
    const {value:name, setValue:setName} = useInput(product.name || '')
    const {value:price, setValue:setPrice} = useInput(product.price || 0)
    const type = product.id && products._types.length > 0 ? products._types.filter(type => type.id === +product.typeId)[0].name : ''
    const {value:typeName, setValue:setTypeName} = useInput(type)
    const [loadedFiles, setLoadedFiles] = useState(product.img)
    const [files, setFiles] = useState({})
    const [info, setInfo] = useState([])
    const {value:description, setValue:setDescription} = useInput('')
    const buttonRef = useRef()

    const onHide = () => modals.setEditProduct(false)    
    
    const addProduct = () => {
        const formData = generateFormData({
            name, price, files, types:products.types, typeName, info
        })
        createProduct(formData).then(data => {
            navigate(PRODUCTS_ROUTE + '/' +  data.id)
            onHide()
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
            id:product.id, name, price, types:products.types, typeName, info})
        updateData(formData)
        .then(response => {
            products.initReload()
            onHide()
        })        
    }

    const deleteHandler = () => {
        const confirmed = confirm(`Продукт с ID: ${product.id} будет удален! Продолжить?`)
        if(confirmed){
            deleteProduct(product.id)
            .then(response => {
                products.initReload()
                onHide()
            })            
        }        
    }

    useEffect(() => {
        if(product.id) fetchProductInfo(product.id).then(data => setInfo(data))
    }, [product])
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                {product ? 'Редактор продукта':'Добавить продукт'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {product && <div className="border rounded px-3 py-1 mb-3 bg-warning">ID: {product.id}</div>}
            <LabelInput label="Название" value={name} setValue={setName} type="name" className="mb-3"/>
            <SelectInput 
                label='Категория'
                defaultValue='Выберите категорию' value={typeName} setValue={setTypeName}
                types={products.types} />
            <AccordionDescription id={product.id} description={description} setDescription={setDescription}/>
            <AccordionInfo id={product.id} info={info} setInfo={setInfo}/>
            <LabelInput label='Стоимость' value={price} setValue={setPrice} type='number' className="mb-3"/>
            <AddFilesInput 
                files={files} setFiles={setFiles} 
                addButton={product.id && files[0]} onButtonClick={addFiles} buttonRef={buttonRef}/>
            {product.id && 
                <PreviewImages
                    product={product} reload={() => products.initReload()}
                    loadedFiles={loadedFiles} setLoadedFiles={setLoadedFiles}
                />
            }
            {product.id && 
                <Button 
                    size="sm"
                    className='mb-3 w-100' 
                    variant='outline-danger'
                    onClick={deleteHandler}
                >Удалить продукт из базы данных</Button>
            }
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} variant='outline-secondary'>Закрыть</Button>
            {product.id ?
            <Button onClick={updateProduct} variant='success'>Обновить</Button>
            :
            <Button onClick={addProduct} variant='success'>Добавить продукт</Button>
            }            
        </Modal.Footer>
        </Modal>
    )
}

export default EditProductModal

