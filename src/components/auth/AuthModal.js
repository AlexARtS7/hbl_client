import React, { useContext, useEffect, useState } from "react"
import Modal from "components/modal/Modal"
import { Context } from "index"
import useInput from "components/hooks/useInput"
import { emailErrorsHandler, loginErrorsHandler, passwordErrorsHandler } from "./authErrorsHandler"
import { authRequest } from "./authRequest"

const AuthModal = ({setActive}) => {
    const {user} = useContext(Context)
    const [isLoginIn, setIsLoginIn] = useState(true)
    const {value:login, onChange:setLogin} = useInput('')
    const {value:email, onChange:setEmail} = useInput('')
    const {value:password, onChange:setPassword} = useInput('')
    const [loginErr, setLoginErr] = useState(loginErrorsHandler(login))
    const [emailErr, setEmailErr] = useState(emailErrorsHandler(email))
    const [passwordErr, setPasswordErr] = useState(passwordErrorsHandler(password))
    const [errorsVisible, setErrorsVisible] = useState(false)
    
    const enter = () => {
        if(!isLoginIn && loginErr || emailErr !=='' || passwordErr !=='') {
            setErrorsVisible(true)
            return
        }        
        authRequest(isLoginIn, user, setEmailErr, setPasswordErr, setErrorsVisible, {email, password, login})
    }  

    useEffect(() => setLoginErr(loginErrorsHandler(login)),[login])
    useEffect(() => setEmailErr(emailErrorsHandler(email)),[email])
    useEffect(() => setPasswordErr(passwordErrorsHandler(password)),[password])
    useEffect(() => setErrorsVisible(false), [isLoginIn])

    useEffect(() => {
        if(user._isAuth) {
            setActive(false)
        }
    }, [user._isAuth])

    useEffect(() => {
        const onKeypress = e => {if(e.key === 'Enter') enter()}
        
        document.addEventListener('keypress', onKeypress);
      
        return () => {
          document.removeEventListener('keypress', onKeypress);
        }
    }, [])
    
    return (
        <Modal setActive={setActive} title={isLoginIn ? 'Авторизация' : 'Регистрация'} width={800}>
            {!isLoginIn && 
                <>
                    <div className='flex_between'>
                        <p>Логин:</p>
                        {errorsVisible && loginErr && <p className='modal_error'>{loginErr}</p>}                
                    </div>
                    <input 
                        className="modal_input"
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
                type='email'
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

