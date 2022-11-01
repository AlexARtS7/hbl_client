import React, { useContext } from "react"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { Button, Modal } from "react-bootstrap"
import InputCategoryGroup from "components/formsComponents/InputCategoryGroup"
import TreeViewList from "components/formsComponents/treeView/TreeViewList"

const EditCategoryModal = () => {
    const {modals, products, toasts} = useContext(Context)
    const {value:сategory, setValue:setCategory} =  useInput('')

    const onHide = () => modals.setEditCategory(false)

    const addCategory = () => {
        products.addCategory({name: сategory})
        .then(_ => {
            products.fetchCategories()
            toasts.addToast({text:'Добавлена новая категория.'})
            setCategory('')            
        })
    }

    return (
        <Modal
            show={modals.editCategory.show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                Редактор категорий
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputCategoryGroup 
                label='Введите название раздела' 
                value={сategory} setValue={setCategory} onButtonClick={addCategory}/>
                <TreeViewList mode='edit'/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} variant='outline-secondary'>Закрыть</Button>       
        </Modal.Footer>
        </Modal>
    )
}

export default EditCategoryModal
