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
    const {data} = await $authHost.post('api/products/create', formData)
    return data
}

export const uploadFiles = async(formData) => {
    const {data} = await $authHost.post('api/products/addfiles', formData)
    return data
}

export const fetchProducts = async(typeId) => {
    const {data} = await $host.get('api/products', {params: {typeId}})
    return data.rows.map(e => ({ ...e, img: JSON.parse(e.img) }))
}

export const fetchOneProduct = async(id) => {
    const {data} = await $host.get('api/products/' + id)
    data.img = JSON.parse(data.img)
    return data
}

export const deleteFiles = async(formData) => {
    const {data} = await $authHost.post('api/products/deletefiles', formData)
    return data
}

export const changeOrderFiles = async(formData) => {
    const {data} = await $authHost.post('api/products/orderfiles', formData)
    return data
}

export const deleteProduct = async(id) => {
    const {data} = await $authHost.delete('api/products/' + id)
    return data
}
