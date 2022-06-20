import React from 'react';
import './modal.scss';

const Modal = ({setActive, children, ...props}) => {
    const {title, width = 400} = props

    return (
        <div className='modal' onClick={() => setActive(false)}>
            <div className='modal_content' style={{width: width}} onClick={e => e.stopPropagation()}>
                {title && <><h2 className='modal_title'>{title}</h2><hr/><br/></>}
                {children}
            </div>
        </div>
    )
}

export default Modal