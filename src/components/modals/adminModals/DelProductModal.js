import React from "react"
import Modal from "components/modals/Modal"

const DelProductModal = ({setActive, product}) => {
    
    return (
        <Modal setActive={setActive} width={1024} title='Удалить продукт'>
            <p className='modal_mark'>Id: {product.id}</p>
            <div>Name: {product.name}</div>
            <br/><hr/><br/>
            {product.img.map((element,i) => 
                <img 
                    key={i}  
                    style={{width:'120px', marginRight:'5px'}}
                    src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
            )}
            <br/><br/><hr/><br/>
            <div className="flex_between">
                <div/>
                <div>
                    <button className="modal_button" onClick={() => setActive(false)}>Отмена</button>
                    <button className="modal_button" >Удалить</button>
                </div>
            </div>
        </Modal>
    )
}

export default DelProductModal