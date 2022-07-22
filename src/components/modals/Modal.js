import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './modal.scss';

// const Modal = ({setActive, children, width = 400, title = ''}) => {

//     return (
//         <div className='modal' onClick={() => setActive(false)}>
//             <div className='modal_content' style={{width: width}} onClick={e => e.stopPropagation()}>
//                 {title && <><h2 className='modal_title'>{title}</h2><hr/><br/></>}
//                 {children}
//             </div>
//         </div>
//     )
// }
export const OpenModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}


export default Modal