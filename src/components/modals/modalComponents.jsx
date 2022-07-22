import React from "react"
import { Form, FloatingLabel, ListGroup, Button, InputGroup } from "react-bootstrap";

export const FullButton = (props) => {
    const {bg, color, onClick, text} = props
    return (
        <>
            <button 
                className="modal_button_full" 
                style={{background:bg, color:color}} 
                onClick={onClick}>{text}</button>
        </>
    )
}

export const LabelInput = (props) => {
    const {label, type, value, setValue} = props
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={label}
            className="mb-3"
        >
            <Form.Control 
                type={type} 
                placeholder={type} 
                value={value} 
                onChange={e => setValue(e.target.value)}
            />
        </FloatingLabel>
    )
}

export const SelectInput = (props) => {
    const {label, value, defaultValue, setValue, types } = props
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={label}
            className="mb-3"
        >
            <Form.Select 
            className='mb-3'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            <option value={0}>{defaultValue}</option>
            {types.map(e => 
                <option 
                    key={e.id} 
                    value={e.name}  
                >{e.name}</option>
            )} 
            </Form.Select>
        </FloatingLabel>
    )
}

export const AddFilesInput = (props) => {
    const {files, setFiles, addButton, onButtonClick, buttonRef} = props
    return (
        <>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <InputGroup className="mb-3">
                <Form.Control ref={buttonRef} aria-describedby="basic-addon2" type="file" multiple onChange={e => setFiles(e.target.files)}/>
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