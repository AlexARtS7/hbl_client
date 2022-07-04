import React, { useState } from "react"
import useInput from 'components/hooks/useInput'
import Modal from "components/modal/Modal"
import { createProduct } from "http/productApi"

const AddProductModal = ({setActive}) => {
    const {value:name, setValue:setName} = useInput('')
    const {value:price, setValue:setPrice} = useInput(0)
    const {value:specifications, setValue:setSpecifications} = useInput('')
    const {value:description, setValue:setDescription} = useInput('')
    const [files, setFiles] = useState(null)

    const selectFile = e => {
        const fileList = e.target.files
        let result = []
        for (let fileItem of fileList) {
            result.push(fileItem.name)
        }
        setFiles(result)
    }

    const addProduct = () => {
        const postData = {name, price, specifications, description, img: JSON.stringify(files)}        
        createProduct(postData).then(data => setActive(false))
    }
    
    return (
        <Modal setActive={setActive} width={1024} title='Добавить продукт'>
            <p>Название</p>
            <input 
                className="modal_input"
                value={name}
                name='name'
                onChange={e => setName(e.target.value)}
            />
            <p>Цена</p>
            <input 
                className="modal_input"
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <p>Характеристики</p>
            <input 
                className="modal_input"
                value={specifications}
                onChange={e => setSpecifications(e.target.value)}
            />
            <p>Описание</p>
            <textarea
                style={{resize: 'vertical'}}
                className='modal_input'
                placeholder='описание'
                value={description}
                onChange={e => setDescription(e.target.value)}
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
            {files && files.length > 1 && files.map((e,i) => 
               <p key={i}>{e}</p>
            )}
            <br/><hr/>
            <div className="flex_between">
                <div/>
                <div>
                    <button className="modal_button" onClick={() => setActive(false)}>Отмена</button>
                    <button className="modal_button" onClick={addProduct}>Добавить</button>
                </div>
            </div>            
        </Modal>
    )
}

export default AddProductModal