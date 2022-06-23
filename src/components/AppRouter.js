import React from 'react';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/const';
import { Context } from '../index';

export default function AppRouter () {
    const {user} = useContext(Context)
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} replace />}/>
        </Routes>
    )
}