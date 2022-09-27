import { $authHost, $host } from "http/axios"

export const productsAddType = async(type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const productsFetchTypes = async() => {
    const {data} = await $host.get('api/type')
    return data
}

export const productsFetchAll = async({typeId, page, limit}) => {
    const {data} = await $host.get('api/products', {params: {typeId, page, limit}})
    return data
}

export const productsFetchOne = async(id) => {
    const {data} = await $host.get('api/products/' + id)
    return data
}

export const productsSaveOne = async(params) => {
    const {data} = await $authHost.post('api/products/create', params)
    return data
}

export const productsDestroyOne = async(id) => {
    const {data} = await $authHost.delete('api/products/delete?id=' + id)
    return data
}