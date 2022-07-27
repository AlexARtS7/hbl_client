import useInput from 'components/hooks/useInput'
import React, { useState } from 'react'
import { Accordion, Button, Col, Row } from 'react-bootstrap'
import { LabelInput } from '../modalsComponents'

const AccordionInfo = () => {
    const [info, setInfo] = useState([])
    const {value:name, setValue:setName} = useInput(info.name || '')
    const {value:price, setValue:setPrice} = useInput(info.description || '')

    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Информация</Accordion.Header>
                <Accordion.Body>
                    {info.map(info => 
                        <Row>
                            <Col>
                                <LabelInput label='Название' value={name} setValue={setName} type='name'/>
                            </Col>
                        </Row>
                    )}
                    <Button variant="outline-success" size="sm" className="w-100">Добавить информацию</Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionInfo