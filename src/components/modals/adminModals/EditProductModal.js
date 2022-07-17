import React, { useContext, useEffect, useState } from "react"
import Modal from "components/modals/Modal"
import { createProduct, deleteProduct, fetchProducts, uploadFiles } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { FullButton, Input, Select, Textarea } from "../modalComponents"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import { generateFormData } from "./generateFormData"
import ImagesHandler from "./ImagesHandler"

const generateDelArray = (Files) => [...Files.map(element => ({name: element.name, status: element.status || true}))]

const EditProductModal = (props) => {
    const navigate = useNavigate()
    const {setActive, product = ''} = props
    const {products} = useContext(Context)
    const {value:name, setValue:setName} = useInput(product.name || '')
    const {value:price, setValue:setPrice} = useInput(product.price || 0)
    const {value:specifications, setValue:setSpecifications} = useInput(product.specifications || '')
    const {value:description, setValue:setDescription} = useInput(product.description || '')
    const type = product ? products._types.filter(type => type.id === +product.typeId)[0].name: ''
    const {value:typeName, setValue:setTypeName} = useInput(type)
    const [loadedFiles, setLoadedFiles] = useState(product.img)
    const [files, setFiles] = useState({})
    const [delArray, setDelArray] = useState({})
    
    const selectFile = e => {
        setFiles(e.target.files)
    }
    
    const addProduct = () => {
        const formData = generateFormData({
            name, price, specifications, description, files, types:products._types, typeName
        })
        createProduct(formData).then(data => {
            products.addOneProduct(data)
            navigate(PRODUCTS_ROUTE + '/' +  data.id)
            setActive(false)
        })          
    }

    const addFiles = () => {
        const formData = generateFormData({id:product.id, files})
        uploadFiles(formData).then(response => {
            const data = JSON.parse(response)
            // setDelArray(generateDelArray(data))
            setLoadedFiles(data)            
            products.setProducts(products._products.map(element => 
                element.id === product.id ? {...element, img: data}:element))
            setFiles({})
            document.getElementById('fileInput').value = ''
        })
    }

    const updateProduct = () => {
        if(product && files[0]) addFiles()
    }

    const deleteHandler = () => {
        const confirmed = confirm(`Продукт с ID: ${product.id} будет удален! Продолжить?`)
        if(confirmed){
            deleteProduct(product.id)
            .then(response => products.deleteOneProduct(product.id))
            setActive(false)
        }        
    }
   
    return (
        <Modal setActive={setActive} width={1024} title={product ? 'Редактор продукта':'Добавить продукт'}>
            {product && <p className='modal_mark'>Id: {product.id}</p>}
            <br/>
            <Input name='name' value={name} setValue={setName} label='Название:'/>
            <Select value={typeName} array={products._types} setValue={setTypeName} label='Категория:'/>
            <Input type='number' value={price} setValue={setPrice} label='Цена:'/>
            <Input value={specifications} setValue={setSpecifications} label='Характеристики:'/>
            <Textarea value={description} setValue={setDescription} label='Описание:'/>
            <ImagesHandler 
                product={product} files={files} loadedFiles={loadedFiles} 
                selectFile={selectFile} onClick={setPreview} 
                onDelSelect={selectDelFiles} delArray={delArray}
                />
            {product && files[0] && <FullButton text='Загрузить на сервер' onClick={addFiles}/>}
            <br/><br/><hr/><br/>
            {product && <><FullButton 
                onClick={deleteHandler} 
                text='Удалить продукт из базы данных' 
                bg='rgb(255, 52, 52)' 
                color='#ffffff'/><br/><br/><hr/></>}          
            <div className="flex_between">
                <div/>
                <div>
                    <button className="modal_button" onClick={() => setActive(false)}>Отмена</button>
                    {product ? 
                        <button className="modal_button" onClick={updateProduct}>Обновить данные</button>
                        :
                        <button className="modal_button" onClick={addProduct}>Добавить продукт в базу данных</button>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default EditProductModal

