import React from "react"
import Modal from "components/modal/Modal"

const MainModal = ({setActive}) => {
   
    return (
        <Modal setActive={setActive} width={1024} title='Панель упарвления для администратора'>
            <div className='flex_between'>
                <button className='modal_button_full'>Добавить продукт</button>
               <button className='modal_button_full'>Удалить продукт</button>
            </div>
               
        </Modal>
    )
}

export default MainModal

