import { $authHost, $host } from "./index";

export const createType = async(type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async() => {
    const {data} = await $host.get('api/type')
    return data
}

export const createProduct = async(formData) => {
    const {data} = await $authHost.post('api/products', formData)
    return data
}

export const fetchProducts = async() => {
    const {data} = await $host.get('api/products')
    return data
}

export const fetchOneProduct = async(id) => {
    const {data} = await $host.get('api/products/' + id)
    return data
}
