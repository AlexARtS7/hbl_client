import React, { useContext, useEffect, useState } from "react"
import Modal from "components/modal/Modal"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { authRequest } from "./authRequest"
import inputValidation from "components/errorsHandler/inputValidation"

const AuthModal = ({setActive}) => {
    const {user} = useContext(Context)
    const [isLoginIn, setIsLoginIn] = useState(true)
    const {value:login, onChange:setLogin} = useInput('')
    const {value:email, onChange:setEmail} = useInput('')
    const {value:password, onChange:setPassword} = useInput('')
    const [loginErr, setLoginErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [errorsVisible, setErrorsVisible] = useState(false)
    
    const enter = () => {
        if(!isLoginIn && loginErr || emailErr || passwordErr) {
            setErrorsVisible(true)
            return
        }        
        authRequest(isLoginIn, user, setEmailErr, setPasswordErr, setErrorsVisible, {email, password, login})
    }  

    useEffect(() => setLoginErr(inputValidation(login, {isEmpty:true, minLength:3, maxLength:50})),[login])
    useEffect(() => setEmailErr(inputValidation(email, {isEmpty:true, email:true})),[email])
    useEffect(() => setPasswordErr(inputValidation(password, {isEmpty:true, minLength:6, maxLength:50})),[password])
    useEffect(() => setErrorsVisible(false), [isLoginIn])

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
                        onChange={e => setLogin(e)}/>
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
                onChange={e => setEmail(e)}/>

            <div className='flex_between'>
                <p>Пароль:</p>
                {errorsVisible && passwordErr && <p className='modal_error'>{passwordErr}</p>}                
            </div>
            <input 
                className="modal_input"
                value={password}
                type='password'
                onChange={e => setPassword(e)}/>
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

