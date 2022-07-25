import React, { useContext, useEffect, useState } from "react"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { authRequest } from "./authRequest"
import { Button, Modal } from "react-bootstrap"
import { LabelInput } from "../modalsComponents"

const AuthModal = (props) => {
    const {user} = useContext(Context)
    const {onHide} = props
    const [isLoginIn, setIsLoginIn] = useState(true)
    
    const {value:login, setValue:setLogin, validErr:loginErr} = 
        useInput('', {isEmpty:true, minLength:3, maxLength:50})
    const {value:email, setValue:setEmail, validErr:emailErr, setValidErr:setEmailErr} = 
        useInput('', {isEmpty:true, email:true})
    const {value:password, setValue:setPassword, validErr:passwordErr, setValidErr:setPasswordErr} = 
        useInput('', {isEmpty:true, minLength:6, maxLength:50})
    const [errorsVisible, setErrorsVisible] = useState(false)
    
    const enter = () => {
        if(!isLoginIn && loginErr || emailErr || passwordErr) {
            setErrorsVisible(true)
            return
        }        
        authRequest(isLoginIn, user, setEmailErr, setPasswordErr, setErrorsVisible, {email, password, login})
    }  

    useEffect(() => {
        setLogin('')
        setEmail('')
        setPassword('')
        setErrorsVisible(false)
    }, [isLoginIn])

    useEffect(() => {
        if(user._isAuth) {
            onHide(false)
        }
    }, [user._isAuth])

    useEffect(() => {
        const onKeypress = e => {if(e.key === 'Enter') enter()}
        
        document.addEventListener('keypress', onKeypress);
        return () => document.removeEventListener('keypress', onKeypress);
    }, [loginErr, emailErr, passwordErr])

    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    {isLoginIn ?  'Авторизация':'Регистрация'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!isLoginIn && 
                    // {errorsVisible && loginErr && <p className='modal_error'>{loginErr}</p>}
                    <LabelInput label='Логин' value={login} setValue={setLogin} type='name'/>
                }
                {/* {errorsVisible && emailErr && <p className='modal_error'>{emailErr}</p>}  */}
                    <LabelInput label='email' value={email} setValue={setEmail} type='email'/>
                {/* {errorsVisible && passwordErr && <p className='modal_error'>{passwordErr}</p>} */}
                    <LabelInput label='Пароль' value={password} setValue={setPassword} type='password'/>
                    {isLoginIn ?
                <div style={{marginLeft:10}}>Нет акаунта? <span style={{color:'blue', cursor:'pointer'}} onClick={() => setIsLoginIn(!isLoginIn)}>Зарегистрируйтесь</span></div> :
                <div style={{marginLeft:10}}>Есть акаунт? <span style={{color:'blue', cursor:'pointer'}} onClick={() => setIsLoginIn(!isLoginIn)}>Войдите</span></div>
            } 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide(false)} variant='outline-secondary'>Закрыть</Button>
                {isLoginIn ? 
                    <Button onClick={enter} variant='success'>Вход</Button> :
                    <Button onClick={enter} variant='success'>Регистрация</Button>}          
            </Modal.Footer>
        </Modal>
    )
}

export default AuthModal

