import React, { useContext, useState } from "react"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { useNavigate } from "react-router-dom"
import { PRODUCTS_ROUTE, SHOP_ROUTE} from "utils/const"
import { Button, Modal } from "react-bootstrap"
import AddInfoAccordion from "../../formsComponents/AddInfoAccordion"
import { LabelInput } from "components/formsComponents/LabelInput"
import { SelectInput } from "components/formsComponents/SelectInput"
import { observer } from "mobx-react-lite"

const EditProductModal = observer(() => {
    const navigate = useNavigate()

    const {products, modals, toasts, basket, user} = useContext(Context)
    const {show, product = ''} = modals.editProduct 
    const category = product.id && products.categories.length > 0 ? 
        products.categories.filter(category => category.id === +product.categoryId)[0].name : ''

    const {value:name, setValue:setName, validErr:nameErr} = useInput(product.name || '', {isEmpty:true})
    const {value:price, setValue:setPrice} = useInput(product.price || 0)
    const {value:categoryName, setValue:setCategoryName, validErr:categoryErr} = useInput(category, {isEmpty:true})
    const {value:description, setValue:setDescription} = useInput(product.description || '')    
    const [info, setInfo] = useState(product.product_infos || [])   
    const [showErr, setShowErr] = useState(false)
    
    const onHide = () => modals.setEditProduct(false)  

    const errors = () => {
        setShowErr(true)
        return nameErr || categoryErr ? false:true
    }
     
    const addProduct = () => {
        if(errors()) {
            products.saveProduct(
            {name, price, categoryId:products.categories.find(category => category.name === categoryName).id, categoryName, info, description}) 
            .then(res => {
                toasts.addToast({text:'Продукт успешно добавлен.'})
                navigate(PRODUCTS_ROUTE + '/' + res.id)
                onHide() 
            })  
        }             
    }
    
    const updateProduct = () => {
        if(errors()){
            products.saveProduct(
                {name, id:product.id, price, categoryId:products.categories.find(category => category.name === categoryName).id, categoryName, info, description}) 
            .then(_ => {
                if(product.id) products.fetchOneProduct(product.id)
                onHide()  
            })   
        }             
    }

    const deleteProduct = () => {
        products.destroyProduct(product.id)
        .then(_ => {
            if(product.id) {
                navigate(SHOP_ROUTE)
            } else {                
                products.fetchOneProduct(product.id)
            }
            basket.fetchBasketProducts(user.data.id)
            toasts.addToast({text:'Продукт удален.'})
            onHide()  
        })        
    }

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
            <LabelInput label="Название" value={name} setValue={setName} isInvalid={showErr && nameErr} type="name" className="mb-3"/>
            <SelectInput 
                isInvalid={showErr && categoryErr}
                label='Категория'
                defaultValue='Выберите категорию' value={categoryName} setValue={setCategoryName}
                categories={products.categories} 
            />
            <LabelInput 
                value={description} setValue={setDescription} 
                label='Описание' type="description" textarea="textarea" className="mb-3"
            />
            <AddInfoAccordion info={info} setInfo={setInfo}/>
            <LabelInput label='Стоимость' value={price} setValue={setPrice} type='number' className="mb-3"/>
           
            {product.id && 
                <Button 
                    size="sm"
                    className='mb-3 w-100' 
                    variant='outline-danger'
                    onClick={deleteProduct}
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

