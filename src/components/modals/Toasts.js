import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

const Toasts = observer(() => {
    const {toasts} = useContext(Context)

    const onClose = (index) => {
        toasts.setToasts(toasts.list.filter((_,i) => i!==index))
    }

    useEffect(() => {
        if(toasts.list.length > 0) {
            const timer = setTimeout(() => {
                toasts.shiftToast()
              }, toasts.list.length > 1 ? 800:3000);
              return () => clearTimeout(timer); 
        }
    }, [toasts.list.length])
   
    return (
        <>
            {toasts.list.length > 0 &&
                <ToastContainer position='bottom-end' className='p-3'>
                    {toasts.list.map((item,index) => 
                        <Toast key={index} onClose={() => onClose(index)}>
                            <Toast.Header>
                                <strong className="me-auto">{item.label? item.label:'HobbyLaser'}</strong>
                            </Toast.Header>
                            <Toast.Body>{item.text && item.text}</Toast.Body>
                        </Toast>
                    )} 
                </ToastContainer>
            }
        </>
    );
})

export default Toasts