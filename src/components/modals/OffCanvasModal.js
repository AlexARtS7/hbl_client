import TreeViewList from 'components/formsComponents/treeView/TreeViewList'
import React from 'react'
import { Offcanvas } from 'react-bootstrap'

const OffCanvasModal = ({show, setShow}) => {

    return (
        <Offcanvas show={show} onHide={() => setShow(false)}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Выберите раздел</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body> <hr/>
                <TreeViewList onHide={() => setShow(false)}/>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvasModal