import AppRouter from 'components/AppRouter'
import { Context } from 'index'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar/NavBar'
import './styles/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modals from 'components/modals/Modals'
import { observer } from 'mobx-react-lite'
import Toasts from 'components/modals/Toasts'

const App = observer(() => {
    const {user} = useContext(Context)
    
    useEffect(() => {
        user.check()
    },[])
  
    return (
        <BrowserRouter>
            <div className="d-flex flex-column app">
                <Modals/>
                <Toasts/>
                <Navbar/>
                <AppRouter/>
            </div>            
        </BrowserRouter>
    )
})

export default App