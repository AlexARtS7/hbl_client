import React from 'react'

import ProductPage from 'pages/ProductPage'
import BasketPage from 'pages/BasketPage'
import ShopPage from './pages/ShopPage'

import {
    BASKET_ROUTE,
    PRODUCTS_ROUTE, 
    SHOP_ROUTE
} from './utils/const'


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: <BasketPage/>
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <ShopPage/>
    },
    {
        path: PRODUCTS_ROUTE + '/:id',
        Component: <ProductPage/>
    },
]