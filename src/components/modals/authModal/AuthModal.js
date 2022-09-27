import React, { useContext, useEffect, useState } from "react"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { Button, Modal } from "react-bootstrap"
import { LabelInput } from "components/formsComponents/LabelInput"

const AuthModal = () => {
    const {user, modals} = useContext(Context)
    
    const {value:login, setValue:setLogin} = useInput('')
    const {value:email, setValue:setEmail, validErr:emailErr, setValidErr:setEmailErr} = useInput('',{email:true,isEmpty:true})
    const {value:password, setValue:setPassword, validErr:passwordErr, setValidErr:setPasswordErr} = useInput('', {isEmpty:true})

    const [isLoginIn, setIsLoginIn] = useState(true)
    const [showErr, setShowErr] = useState(false)
    
    const onHide = () => modals.setAuth(false)
    
    const enter = () => {
        setShowErr(true)
        if(emailErr || passwordErr) return

        try {
            let userData
            if(isLoginIn) {
                userData = user.loginIn(email, password)
            } else {
                userData = user.registration(login, email, password)
            }    
            onHide()    
        } catch (e) {
            switch(e.response.data.index) {
                case 1: setEmailErr(e.response.data.message)
                    break;
                case 2: setPasswordErr(e.response.data.message)
                    break;
            }  
        }  
    }  

    useEffect(() => {
        setLogin('')
        setEmail('')
        setPassword('')
        setShowErr(false)
    }, [isLoginIn])

    useEffect(() => {
        const onKeypress = e => {if(e.key === 'Enter') enter()}
        document.addEventListener('keypress', onKeypress);
        return () => document.removeEventListener('keypress', onKeypress);
    }, [emailErr])

    return (
        <Modal 
            show={modals._auth.show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    {isLoginIn ?  'Авторизация':'Регистрация'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!isLoginIn && 
                    <LabelInput label='Логин' value={login} setValue={setLogin} type='name' className="mb-3"/>
                }
                    <LabelInput 
                        label='email' value={email} setValue={setEmail} 
                        isInvalid={showErr && emailErr} type='email' className="mb-3"/>
                    <LabelInput 
                        label='Пароль' value={password} setValue={setPassword} 
                        isInvalid={showErr && passwordErr} type='password' className="mb-3"/>
                    {isLoginIn ?
                        <div style={{marginLeft:10}}>Нет акаунта? 
                            <span style={{color:'blue', cursor:'pointer'}} 
                                onClick={() => setIsLoginIn(!isLoginIn)}>Зарегистрируйтесь</span></div> 
                            :
                        <div style={{marginLeft:10}}>Есть акаунт? 
                            <span style={{color:'blue', cursor:'pointer'}} 
                                onClick={() => setIsLoginIn(!isLoginIn)}>Войдите</span></div>
                    } 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant='outline-secondary'>Закрыть</Button>
                {isLoginIn ? 
                    <Button onClick={enter} variant='success'>Вход</Button> :
                    <Button onClick={enter} variant='success'>Регистрация</Button>}          
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal

