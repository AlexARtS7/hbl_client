import { $authHost } from "http/axios"

export const basketAddProduct = async(userId, productId, name) => {
    const {data} = await $authHost.post('api/basket/addproduct', {userId, productId, name})
    return data
}

export const basketFetchProducts = async({userId, page, limit}) => {
    const {data} = await $authHost.get('api/basket/products', {params: {userId, page, limit}})
    return data
}

export const basketDeleteProduct = async(id) => {
    const {data} = await $authHost.delete('api/basket/deleteproduct?id=' + id)
    return data
}