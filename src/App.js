import { check } from 'http/userApi'
import { Context } from 'index'
import React, { useContext, useEffect } from 'react'
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
        <div>
            <Navbar/>
        </div>
    )
}

export default App