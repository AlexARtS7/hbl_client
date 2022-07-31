import React from 'react'
import { Accordion, Form} from 'react-bootstrap'

const AccordionDescription = (props) => {
    const {description, setDescription, id} = props
    
    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Описание</Accordion.Header>
                <Accordion.Body>
                    <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionDescription