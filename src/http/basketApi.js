import { $authHost } from "./index";

export const addProduct = async(userId, productId, name) => {
    const {data} = await $authHost.post('api/basket/addproduct', {userId, productId, name})
    return data
}

export const fetchBasketProducts = async(userId) => {
    const {data} = await $authHost.get('api/basket/products?userId=' + userId) 
    return data
}
