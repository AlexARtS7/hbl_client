import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import EditProductModal from './adminModals/EditProductModal'
import EditTypeModal from './adminModals/EditTypeModal'
import AuthModal from './authModal/AuthModal'

const Modals = observer(() => {
    const {modals} = useContext(Context)

    useEffect(() => {
        if(!modals._editProduct.show) modals.setEditProduct({show:false})
    },[modals._editProduct.show])

    useEffect(() => {
        if(!modals._editType.show) modals.setEditType({show:false})
    },[modals._editType.show])

    useEffect(() => {
        if(!modals._auth.show) modals.setAuth({show:false})
    },[modals._auth.show])

    return (
        <>
            {modals._editProduct.show && <EditProductModal/>}   
            {modals._editType.show && <EditTypeModal/>} 
            {modals._auth.show && <AuthModal/>} 
        </>
    )
})

export default Modals