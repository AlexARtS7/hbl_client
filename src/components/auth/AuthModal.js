import React, { useContext, useEffect, useState } from "react"
import Modal from "components/modal/Modal"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { authRequest } from "./authRequest"

const AuthModal = ({setActive}) => {
    const {user} = useContext(Context)
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
            setActive(false)
        }
    }, [user._isAuth])

    useEffect(() => {
        const onKeypress = e => {if(e.key === 'Enter') enter()}
        
        document.addEventListener('keypress', onKeypress);
        return () => document.removeEventListener('keypress', onKeypress);
    }, [loginErr, emailErr, passwordErr])

    return (
        <Modal setActive={setActive} width={800} title={isLoginIn ? 'Авторизация':'Регистрация'}>
            {!isLoginIn && 
                <>
                    <div className='flex_between'>
                        <p>Логин:</p>
                        {errorsVisible && loginErr && <p className='modal_error'>{loginErr}</p>}                
                    </div>
                    <input 
                        className='modal_input'
                        name='name'
                        value={login}
                        onChange={e => setLogin(e.target.value)}/>
                </>
              }
            <div className='flex_between'>
                <p>Email:</p>
                {errorsVisible && emailErr && <p className='modal_error'>{emailErr}</p>}                
            </div>
            <input 
                className="modal_input"
                value={email}
                name='email'
                onChange={e => setEmail(e.target.value)}/>

            <div className='flex_between'>
                <p>Пароль:</p>
                {errorsVisible && passwordErr && <p className='modal_error'>{passwordErr}</p>}                
            </div>
            <input 
                className="modal_input"
                value={password}
                type='password'
                onChange={e => setPassword(e.target.value)}/>
            {isLoginIn ?
                <div>Нет акаунта? <span className='modal_link' onClick={() => setIsLoginIn(!isLoginIn)}>Зарегистрируйтесь</span></div> :
                <div>Есть акаунт? <span className='modal_link' onClick={() => setIsLoginIn(!isLoginIn)}>Войдите</span></div>
            }                
            <br/><hr/>
            <div className="flex_between">
                <div/>
                <div>
                    <button className="modal_button" onClick={() => setActive(false)}>Отмена</button>
                    {isLoginIn ? 
                        <button className="modal_button" onClick={enter}>Вход</button> :
                        <button className="modal_button" onClick={enter}>Регистрация</button>}
                </div>
            </div>            
        </Modal>
    )
}

export default AuthModal

