import React, { useContext, useState } from "react"
import { Context } from "index"
import { useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import { observer } from "mobx-react-lite"
import { AddFilesInput } from "components/formsComponents/AddImages"
import PreviewImages from "components/formsComponents/PreviewImages"

const EditImagesModal = observer(() => {
    const navigate = useNavigate()
    const {modals, products} = useContext(Context)
    const {show, product = ''} = modals.editImages
    
    const [files, setFiles] = useState({})
    const [loadedFiles, setLoadedFiles] = useState([product.imgs.find(e => e.preview), ...product.imgs.filter(e => !e.preview)])
    
    const onHide = () => modals.setEditImages(false)  
    
    const addFiles = () => {
        const formData = new FormData()
        formData.append(`id`, product.id)
        Object.keys(files).forEach(function (_,i) {
            formData.append(`files`, files[i])
        }, files)

        products.uploadImages(formData)
        .then(_ => products.fetchProducts())
    }

    const onExit = () => {
        if(product.id && product.imgs.length > 0) {
            products.setPreviewImage(loadedFiles[0].id, product.id)
            .then(_=> {
                products.fetchProducts()
                onHide()
            })
        } else {
            onHide()
        }
    }
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                Редактор изображений
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AddFilesInput 
                files={files} setFiles={setFiles} 
                addButton={product.id && files[0]} onButtonClick={addFiles}
            />
            {product.imgs.length > 0 &&  
                <PreviewImages
                    product={product} loadedFiles={loadedFiles} setLoadedFiles={setLoadedFiles}
                />
            }
            
        </Modal.Body>
        <Modal.Footer>
            
            <Button  variant='success' onClick={onExit}>Закрыть</Button>
                       
        </Modal.Footer>
        </Modal>
    )
})

export default EditImagesModal

