import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/const';

export default function AppRouter () {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={Component}/>
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} replace />}/>
        </Routes>
    )
}