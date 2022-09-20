import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import './toasts.scss'

const Toasts = observer(() => {
    const {toasts} = useContext(Context)

    const onClose = (index) => {
        toasts.setToasts(toasts.list.filter((_,i) => i!==index))
    }

    useEffect(() => {
        if(toasts.list.length > 0) {
            const timer = setTimeout(() => {
                toasts.shiftToast()
              }, 8000);
              return () => clearTimeout(timer); 
        }
    }, [toasts.list.length])

    return (
        <>
            {toasts.list.length > 0 &&
                <ToastContainer position='bottom-end' className='p-3'>
                    {toasts.list.map((e,i) => 
                         <Toast key={i} onClose={() => onClose(i)} delay={5000} className='toast'>
                            <Toast.Header>
                                <strong className="me-auto">{e.label? e.label:'HobbyLaser'}</strong>
                            </Toast.Header>
                            <Toast.Body>{e.text && e.text}</Toast.Body>
                        </Toast>
                    )} 
                </ToastContainer>
            }
        </>
    );
})

export default Toasts