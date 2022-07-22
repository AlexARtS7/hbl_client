
import React, { useContext } from "react"
import Modal from "components/modals/Modal"
import { createType } from "http/productApi"
import { Context } from "index"
import useInput from "components/hooks/useInput"

const TypeHandlerModal = ({setActive}) => {
    const {products} = useContext(Context)
    const {value:type, setValue:setType} =  useInput('')

    const addTypeHandle = () => {
        createType({name: type})
        .then(data => {
            products.addOneType(data)
            setActive(false)
        })
    }

    return (
        <Modal setActive={setActive} width={1024} title='Добавить/Удалить тип'>
            <input 
                className='modal_input'
                value={type}
                onChange={e => setType(e.target.value)}/>
            <div className="flex_between">
                <div/>
                <div>
                    <button className="modal_button" onClick={() => setActive(false)}>Отмена</button>
                    <button className="modal_button" onClick={addTypeHandle}>Добавить</button>
                </div>
            </div>
        </Modal>
    )
}

export default TypeHandlerModal
