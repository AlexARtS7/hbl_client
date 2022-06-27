import React, { useState } from "react"
import Modal from "components/modal/Modal"

const AddProductModal = ({setActive}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [files, setFiles] = useState([''])
    const [info, setInfo] = useState([])
    
    return (
        <Modal setActive={setActive} width={1024} title='Добавить продукт'>
            
            <input 
                className="modal_input"
                placeholder='название продукта'
                // onChange={e => setLogin(e)}
            />
            <input 
                className="modal_input"
                placeholder='цена'
                // onChange={e => setLogin(e)}
            />
            <hr/>
            <p className='modal_label'>Фотографии:</p>
            {files.map(e => 
                <input 
                    className="modal_input_file"
                    type='file'
                    // onChange={e => setLogin(e)}
                />
            )}
            <button className='modal_button_full' onClick={() => setFiles([...files, ''])}>Добавить Фотографии</button>   
        </Modal>
    )
}

export default AddProductModal