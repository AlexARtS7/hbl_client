import React from 'react'
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap"

export const AddFilesInput = (props) => {
    const {files, setFiles, addButton, onButtonClick, btnRef} = props
    return (
        <>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <InputGroup className="mb-3">
                <Form.Control ref={btnRef} aria-describedby="basic-addon2" type="file" multiple onChange={e => setFiles(e.target.files)}/>
                {addButton && <Button variant="outline-secondary" id="button-addon2" onClick={onButtonClick}>Загрузить на сервер</Button>}
                </InputGroup>
            </Form.Group>
            <ListGroup variant="flush">              
                {files && files[1] && Object.keys(files).map(function (key,i) {
                return <ListGroup.Item key={i}>{this[key].name}</ListGroup.Item>
                }, files)}   
            </ListGroup>
        </>
    )
}