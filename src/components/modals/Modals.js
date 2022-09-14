import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import EditImagesModal from './adminModals/EditImagesModal'
import EditProductModal from './adminModals/EditProductModal'
import EditTypeModal from './adminModals/EditTypeModal'
import AuthModal from './authModal/AuthModal'

const Modals = observer(() => {
    const {modals} = useContext(Context)

    useEffect(() => {
        if(!modals.editProduct.show) modals.setEditProduct({show:false})
    },[modals.editProduct.show])

    useEffect(() => {
        if(!modals.editImages.show) modals.setEditImages({show:false})
    },[modals.editImages.show])

    useEffect(() => {
        if(!modals.editType.show) modals.setEditType({show:false})
    },[modals.editType.show])

    useEffect(() => {
        if(!modals.auth.show) modals.setAuth({show:false})
    },[modals.auth.show])

    return (
        <>
            {modals.editProduct.show && <EditProductModal/>}   
            {modals.editImages.show && <EditImagesModal/>}  
            {modals.editType.show && <EditTypeModal/>} 
            {modals.auth.show && <AuthModal/>} 
        </>
    )
})

export default Modals