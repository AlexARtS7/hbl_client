import React, { useContext, useEffect, useState } from "react"
import Modal, { OpenModal } from "components/modals/Modal"
import { changeOrderFiles, createProduct, deleteProduct, updateData, uploadFiles } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { AddFilesInput, FullButton, Input, LabelInput, Select, SelectInput, Textarea } from "../modalComponents"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE } from "utils/const"
import { generateFormData } from "./generateFormData"
import PreviewImages from "./components/PreviewImages"
import { Button } from "react-bootstrap"
import { observer } from "mobx-react-lite"

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
            document.getElementById('fileInput').value = ''
            products.initReload()
        })
    }

    // const updateProduct = () => {
    //     if(product && files[0]) addFiles()
    //     let formData = generateFormData({id:product.id, filesArray:loadedFiles})
    //     changeOrderFiles(formData)
    //     formData = generateFormData({
    //         id:product.id, name, price, types:products._types, typeName})
    //     updateData(formData)
    //     .then(response => {
    //         products.initReload()
    //         onHide(false)
    //     })        
    // }

    // const deleteHandler = () => {
    //     const confirmed = confirm(`Продукт с ID: ${product.id} будет удален! Продолжить?`)
    //     if(confirmed){
    //         deleteProduct(product.id)
    //         .then(response => {
    //             products.initReload()
    //             onHide(false)
    //         })            
    //     }        
    // }
    
    return (
        <Modal
            {...props}
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
            <LabelInput label='Название' value={name} setValue={setName} type='name'/>
            <SelectInput 
                label='Категория'
                defaultValue='Выберите категорию' value={typeName} setValue={setTypeName}
                types={products._types} />
            <LabelInput label='Стоимость' value={price} setValue={setPrice} type='number'/>
            {product.id && 
                <PreviewImages
                    product={product} 
                    loadedFiles={loadedFiles} setLoadedFiles={setLoadedFiles}
                />
            }
            <AddFilesInput 
                files={files} setFiles={setFiles} addButton={product.id && files[0]} onButtonClick={addFiles}/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onHide(false)}>Закрыть</Button>
            {product.id ?
            <Button >Обновить</Button>
            :
            <Button onClick={addProduct}>Добавить продукт</Button>
            }            
        </Modal.Footer>
        </Modal>
        // <Modal setActive={setActive} width={1024} title={product ? 'Редактор продукта':'Добавить продукт'}>
        //     {product && <p className='modal_mark'>Id: {product.id}</p>}
        //     <br/>
        //     <Input name='name' value={name} setValue={setName} label='Название:'/>
        //     <Select value={typeName} array={products._types} setValue={setTypeName} label='Категория:'/>
        //     <Input type='number' value={price} setValue={setPrice} label='Цена:'/>
        //     {product && <PreviewImages
        //         product={product} 
        //         loadedFiles={loadedFiles} setLoadedFiles={setLoadedFiles}
        //         />}
        //     <LoadImages files={files} setFiles={setFiles}/>
        //     {product && files[0] && <FullButton text='Загрузить на сервер' onClick={addFiles}/>}
        //     <br/><br/><hr/><br/>
        //     {product && <><FullButton 
        //         onClick={deleteHandler} 
        //         text='Удалить продукт из базы данных' 
        //         bg='rgb(255, 52, 52)' 
        //         color='#ffffff'/><br/><br/><hr/></>}          
        //     <div className="flex_between">
        //         <div/>
        //         <div>
        //             <button className="modal_button" onClick={() => setActive(false)}>Отмена</button>
        //             {product ? 
        //                 <button className="modal_button" onClick={updateProduct}>Обновить данные</button>
        //                 :
        //                 <button className="modal_button" onClick={addProduct}>Добавить продукт в базу данных</button>
        //             }
        //         </div>
        //     </div>
        // </Modal>
    )
}

export default EditProductModal

