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
            <TreeViewList/>
                {/* <ListGroup variant="flush" >
                    <ListGroup.Item as='ul'>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item as='ul'>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup> */}
                {/* <ul>
                    <li>
                        <div className='el'>Root</div>
                            <ul className='ce'>
                                <li >
                                    <div className='cl el'>Item 1</div>
                                </li>
                                <li >
                                    <div>Item 1</div>
                                </li>
                                    <ul >
                                        <li >
                                            <div>Item 1</div>
                                        </li>
                                        <li >
                                            <div>Item 1</div>
                                        </li>
                                    </ul>
                            </ul>
                    </li>
                </ul> */}

            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvasModal