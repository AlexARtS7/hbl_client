import React, { useState } from 'react'
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap'
import { LabelInput } from '../modalsComponents'

const AccordionInfo = () => {
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Информация</Accordion.Header>
                <Accordion.Body>
                    {info.map(i => 
                        <Card className="p-2 mb-3" style={{background:'lightgray'}}>
                            <Row>
                                <Col>
                                    <LabelInput 
                                        label='Название' 
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)} type='name'/>
                                </Col>
                                <Col>
                                    <LabelInput label='Информация' type='name'/>
                                </Col>
                                <Col className='w-25'>
                                    <Button >Удалить</Button>
                                </Col>
                            </Row>
                        </Card>
                        
                            
                    )}
                    <Button onClick={addInfo} variant="outline-success" size="sm" className="w-100">Добавить информацию</Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionInfo