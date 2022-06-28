import React, { useState } from "react"
import useInput from 'components/hooks/useInput'
import Modal from "components/modal/Modal"

const AddProductModal = ({setActive}) => {
    const {value:name, onChange:setName} = useInput('')
    const {value:price, onChange:setPrice} = useInput(0)
    const [files, setFiles] = useState(null)

    const selectFile = e => {
        const fileList = e.target.files
        let result = []
        for (let fileItem of fileList) {
            result.push(fileItem.name)
        }
        setFiles(result)
    }
    
    return (
        <Modal setActive={setActive} width={1024} title='Добавить продукт'>
            <p>Название</p>
            <input 
                className="modal_input"
                value={name}
                onChange={e => setName(e)}
            />
            <p>Цена</p>
            <input 
                className="modal_input"
                value={price}
                onChange={e => setPrice(e)}
            />
            <p>Характеристики</p>
            <input 
                className="modal_input"
                // onChange={e => setLogin(e)}
            />
            <p>Описание</p>
            <textarea
                style={{resize: 'vertical'}}
                className='modal_input'
                placeholder='описание'
            >
            </textarea>
            <hr/><br/>
            <p>Фотографии:</p>            
            <input 
                className="modal_input_file"
                type='file'
                multiple
                onChange={e => selectFile(e)}
            /> 
            {files && files.map((e,i) => 
               <p key={i}>{e}</p>
            )}
        </Modal>
    )
}

export default AddProductModal