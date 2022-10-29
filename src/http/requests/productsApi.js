import { $authHost, $host } from "http/axios"

export const productsAddCategory = async(category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const productsFetchCategories = async() => {
    const {data} = await $host.get('api/category')
    return data
}

export const productsFetchAll = async({categories, page, limit}) => {
    const {data} = await $host.get('api/products', {params: {categories, page, limit}})
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