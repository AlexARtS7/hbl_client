import React, { useContext } from "react"
import Modal from "components/modals/Modal"
import { deleteProduct, fetchProducts } from "http/productApi"
import { Context } from "index"

const DelProductModal = ({setActive, product}) => {
    const {products} = useContext(Context)
    
    const deleteHandler = () => {
        deleteProduct(product.id)
        .then(response => fetchProducts())
        .then(data => {
            products.setProducts(data)
            setActive(false)
        })
    }

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
                    <button className="modal_button" onClick={deleteHandler}>Удалить</button>
                </div>
            </div>
        </Modal>
    )
}

export default DelProductModal

