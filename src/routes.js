import React from 'react'

import Shop from './pages/Shop'
import {SHOP_ROUTE} from './utils/const'

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    }
]