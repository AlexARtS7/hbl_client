import React from 'react'

import ProductPage from 'pages/ProductPage'
import Shop from './pages/Shop'

import {
    PRODUCTS_ROUTE, 
    SHOP_ROUTE
} from './utils/const'

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    },
    {
        path: PRODUCTS_ROUTE + '/:id',
        Component: <ProductPage/>
    },
]