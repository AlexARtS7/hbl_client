import { $authHost, $host } from "./index";

export const addProduct = async(userId, productId) => {
    const {data} = await $authHost.post('api/basket/addproduct', {userId, productId})
    return data
}

export const fetchBasketProducts = async() => {
    const {data} = await $authHost.get('api/basket/products') 
    return data
}
