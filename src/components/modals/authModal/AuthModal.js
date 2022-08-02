import React, { useContext, useEffect, useState } from "react"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { Button, Modal } from "react-bootstrap"
import { LabelInput } from "components/formsComponents/LabelInput"
import { loginIn, registration } from "http/userApi"

const AuthModal = () => {
    const {products, user, modals} = useContext(Context)
    
    const {value:login, setValue:setLogin, validErr:loginErr} = 
        useInput('', {isEmpty:true, minLength:3, maxLength:50})
    const {value:email, setValue:setEmail, validErr:emailErr, setValidErr:setEmailErr} = 
        useInput('', {isEmpty:true, email:true})
    const {value:password, setValue:setPassword, validErr:passwordErr, setValidErr:setPasswordErr} = 
        useInput('', {isEmpty:true, minLength:6, maxLength:50})

    const [isLoginIn, setIsLoginIn] = useState(true)
    const [errorsVisible, setErrorsVisible] = useState(false)

    const onHide = () => modals.setAuth(false)
    
    const enter = () => {
        if(!isLoginIn && loginErr || emailErr || passwordErr) {
            setErrorsVisible(true)
            return
        }

        try {
            let userData
            if(isLoginIn) {
                userData = loginIn(email, password)
            } else {
                userData = registration(login, email, password)
            }  
            userData.then(response => {
                user.setData(userData)   
                user.setIsAuth(true)
                onHide()
            })       
        } catch (e) {
            setErrorsVisible(true)
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
        setErrorsVisible(false)
    }, [isLoginIn])

    useEffect(() => {
        const onKeypress = e => {if(e.key === 'Enter') enter()}
        
        document.addEventListener('keypress', onKeypress);
        return () => document.removeEventListener('keypress', onKeypress);
    }, [loginErr, emailErr, passwordErr])

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
                    // {errorsVisible && loginErr && <p className='modal_error'>{loginErr}</p>}
                    <LabelInput label='Логин' value={login} setValue={setLogin} type='name' className="mb-3"/>
                }
                {/* {errorsVisible && emailErr && <p className='modal_error'>{emailErr}</p>}  */}
                    <LabelInput label='email' value={email} setValue={setEmail} type='email' className="mb-3"/>
                {/* {errorsVisible && passwordErr && <p className='modal_error'>{passwordErr}</p>} */}
                    <LabelInput label='Пароль' value={password} setValue={setPassword} type='password' className="mb-3"/>
                    {isLoginIn ?
                <div style={{marginLeft:10}}>Нет акаунта? <span style={{color:'blue', cursor:'pointer'}} onClick={() => setIsLoginIn(!isLoginIn)}>Зарегистрируйтесь</span></div> :
                <div style={{marginLeft:10}}>Есть акаунт? <span style={{color:'blue', cursor:'pointer'}} onClick={() => setIsLoginIn(!isLoginIn)}>Войдите</span></div>
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

