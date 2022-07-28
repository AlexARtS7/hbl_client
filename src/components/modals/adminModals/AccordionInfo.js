import React from 'react'
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap'

const AccordionInfo = (props) => {
    const {info, setInfo, id} = props
    
    const addInfo = () => {
        setInfo([...info, {title: '', info: '', idKey: Math.round(Date.now() / 2000)}])
    }
    
    const changeInfo = (key, value, idKey) => {
        setInfo(info.map(i => i.idKey === idKey ? {...i, [key]: value} : i))
    }

    const removeInfo = (idKey) => {
        setInfo(info.filter(i => i.idKey !== idKey))
    }
    
    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Информация</Accordion.Header>
                <Accordion.Body>
                    {info && info.map((item,i) => 
                        <InputGroup className="mb-3" key={i}>
                        <InputGroup.Text id="basic-addon1">Название</InputGroup.Text>
                        <Form.Control
                            value={item.title}
                            onChange={(e) => changeInfo('title', e.target.value, item.idKey)}
                        />
                        <InputGroup.Text id="basic-addon1">Инфо</InputGroup.Text>
                        <Form.Control
                            value={item.info}
                            onChange={(e) => changeInfo('info', e.target.value, item.idKey)}
                        />
                        <Button onClick={() => removeInfo(item.idKey)} variant="outline-secondary">Удалить</Button>
                        </InputGroup>                            
                    )}
                    <Button onClick={addInfo} variant="outline-success" size="sm" className="w-100">Добавить информацию</Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionInfo