import AppRouter from 'components/AppRouter'
import { check } from 'http/userApi'
import { Context } from 'index'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar/NavBar'
import './styles/style.scss'

const App = () => {
    const {user} = useContext(Context)

    useEffect(() => {
        check().then(userData => {
          user.setUser(userData)
          user.setIsAuth(true)
        })
    },[])

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App