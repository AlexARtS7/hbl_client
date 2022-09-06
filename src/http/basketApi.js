import { $authHost } from "./index";

export const addProduct = async(userId, productId) => {
    const {data} = await $authHost.post('api/basket/addproduct', {userId, productId})
    return data
}

export const fetchBasketProduct = async(userId, productId) => {
    const {data} = await $authHost.get('api/basket/products/getone?userId=' + userId + '&productId=' + productId) 
    return data
}

export const fetchBasketProducts = async(userId) => {
    const {data} = await $authHost.get('api/basket/products?userId=' + userId) 
    return data
}
