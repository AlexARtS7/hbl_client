import React, { useContext, useEffect, useRef, useState } from "react"
import productApi from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE, SHOP_ROUTE } from "utils/const"
import { generateFormData } from "./formData"
import PreviewImages from "../../formsComponents/PreviewImages"
import { Button, Modal } from "react-bootstrap"
import AccordionInfo from "../../formsComponents/AccordionInfo"
import { LabelInput } from "components/formsComponents/LabelInput"
import { SelectInput } from "components/formsComponents/SelectInput"
import { AddFilesInput } from "components/formsComponents/AddFiles"
import { observer } from "mobx-react-lite"

const EditProductModal = observer(() => {
    const navigate = useNavigate()
    const { fetchProductInfo, fetchProductDescription,
            fetchProducts, fetchOneProduct, 
            createProduct, uploadFiles, 
            changeOrderFiles, updateData, deleteProduct} = productApi()

    const {products, modals} = useContext(Context)
    const {show, product = ''} = modals.editProduct 
    const type = product.id && products.types.length > 0 ? products.types.filter(type => type.id === +product.typeId)[0].name : ''

    const {value:name, setValue:setName} = useInput(product.name || '')
    const {value:price, setValue:setPrice} = useInput(product.price || 0)
    const {value:typeName, setValue:setTypeName} = useInput(type)
    const {value:description, setValue:setDescription} = useInput('')    
    
    const [loadedFiles, setLoadedFiles] = useState(product.img)
    const [info, setInfo] = useState([])    
    const [files, setFiles] = useState({})
    const buttonRef = useRef()

    const onHide = () => modals.setEditProduct(false)  
    
    const fetching = () => {
        if(products.item.id){
            fetchOneProduct(product.id)
            fetchProductInfo(product.id)
            fetchProductDescription(product.id)
        } else {
            fetchProducts()
        }            
    }
    
    const addProduct = () => {
        const formData = generateFormData({
            name, price, files, types:products.types, typeName, info, description
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
            fetching()
            buttonRef.current.value = ''
        })
    }

    const updateProduct = () => {
        if(product && files[0]) addFiles()
        let formData = generateFormData({id:product.id, filesArray:loadedFiles})
        changeOrderFiles(formData)
        formData = generateFormData({
            id:product.id, name, price, types:products.types, typeName, info, description})
        updateData(formData)
        .then(response => {
            fetching()
            onHide()
        })        
    }

    const deleteHandler = () => {
        const confirmed = confirm(`Продукт с ID: ${product.id} будет удален! Продолжить?`)
        if(confirmed){
            deleteProduct(product.id)
            .then(response => {
                if(products.item.id){
                    navigate(SHOP_ROUTE)
                } else {
                    fetching()
                }
                onHide()
            })            
        }        
    }

    useEffect(() => {
        if(product.id) {
            fetchProductInfo(product.id).then(data => setInfo(data))
            fetchProductDescription(product.id).then(data => setDescription(data))
        }
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
                types={products.types} 
            />
            <LabelInput 
                value={description} setValue={setDescription} 
                label='Описание' type="description" textarea="textarea" className="mb-3"
            />
            <AccordionInfo info={info} setInfo={setInfo}/>
            <LabelInput label='Стоимость' value={price} setValue={setPrice} type='number' className="mb-3"/>
            <AddFilesInput 
                files={files} setFiles={setFiles} 
                addButton={product.id && files[0]} onButtonClick={addFiles} buttonRef={buttonRef}
            />
            {product.id && 
                <PreviewImages
                    product={product} fetching={() => fetching()}
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
})

export default EditProductModal

