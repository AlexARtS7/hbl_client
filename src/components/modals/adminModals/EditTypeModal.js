
import React, { useContext } from "react"
import { createType } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { Button, Modal } from "react-bootstrap"
import { LabelInput } from "components/formsComponents/LabelInput"

const EditTypeModal = () => {
    const {products, modals} = useContext(Context)
    const {value:type, setValue:setType} =  useInput('')

    const onHide = () => modals.setEditType(false)

    const addType = () => {
        createType({name: type})
        .then(type => {
            products.setTypes([...products.types, type])
            onHide()
        })
    }

    return (
        <Modal
            show={modals.editType.show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                Добавить тип
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LabelInput label='Введите название нового типа' value={type} setValue={setType} type='name' className="mb-3"/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide} variant='outline-secondary'>Закрыть</Button>
            <Button onClick={addType} variant='success'>Добавить тип</Button>          
        </Modal.Footer>
        </Modal>
    )
}

export default EditTypeModal
