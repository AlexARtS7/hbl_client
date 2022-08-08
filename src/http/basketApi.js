import { $authHost, $host } from "./index";

export const addProduct = async(userId, productId) => {
    const {data} = await $authHost.post('api/basket/addproduct', {userId, productId})
    return data
}

export const fetchBasketProducts = async() => {
    const {data} = await $authHost.get('api/basket/products') 
    return data
}

// export const check = async() => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }