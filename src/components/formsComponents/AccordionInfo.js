import { Context } from 'index'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap'

const AccordionInfo = observer(() => {
    const {products} = useContext(Context)
    
    const addInfo = () => {
        products.setItemInfo([...products.itemInfo, {title: '', info: '', idKey: Math.round(Date.now() / 2000)}])
    }
    
    const changeInfo = (key, value, idKey) => {
        products.setItemInfo(products.itemInfo.map(i => i.idKey === idKey ? {...i, [key]: value} : i))
    }

    const removeInfo = (idKey) => {
        products.setItemInfo(products.itemInfo.filter(i => i.idKey !== idKey))
    }
    
    return (
        <Accordion className="mb-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Информация</Accordion.Header>
                <Accordion.Body>
                    {products.itemInfo && products.itemInfo.map((item,i) => 
                        <InputGroup className="mb-3" key={i}>
                        <InputGroup.Text>Название</InputGroup.Text>
                        <Form.Control
                            value={item.title}
                            onChange={(e) => changeInfo('title', e.target.value, item.idKey)}
                        />
                        <InputGroup.Text>Инфо</InputGroup.Text>
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
})

export default AccordionInfo