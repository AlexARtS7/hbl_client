
import React, { useContext } from "react"
import { createType } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { Button, Modal } from "react-bootstrap"
import { LabelInput } from "../modalsComponents"

const TypeHandlerModal = (props) => {
    const {products} = useContext(Context)
    const {onHide} = props
    const {value:type, setValue:setType} =  useInput('')

    const addType = () => {
        createType({name: type})
        .then(data => {
            products.addOneType(data)
            onHide(false)
        })
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
                Добавить тип
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LabelInput label='Введите название нового типа' value={type} setValue={setType} type='name'/>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onHide(false)} variant='outline-secondary'>Закрыть</Button>
            <Button onClick={addType} variant='success'>Добавить тип</Button>          
        </Modal.Footer>
        </Modal>
    )
}

export default TypeHandlerModal
