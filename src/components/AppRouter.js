import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import NotFound404Page from 'pages/NotFound404Page';
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';

 const AppRouter = observer(() => {
    const {user} = useContext(Context)
    
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={Component}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path='*' element={<NotFound404Page/>}/>
            {/* <Navigate to={SHOP_ROUTE} replace/>  
                // возможный вариант с переадресацией (не работают пути юзера, не успевает пройти проверку) */}
        </Routes>
    )
})

export default AppRouter