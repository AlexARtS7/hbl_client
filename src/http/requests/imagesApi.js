import { $authHost } from "http/axios"

export const imagesDelete = async(id, delArray) => {
    const {data} = await $authHost.delete('api/images/delete?id=' + id + '&imgs[]=' + delArray.join('&imgs[]='))
    return data
}

export const imagesUpload = async(formData) => {
    const {data} = await $authHost.post('api/images/add', formData)
    return data
}

export const imagesSetPreview = async(id, productId) => {
    const {data} = await $authHost.post('api/images/setpreview?id=' + id + '&productId=' + productId)
    return data
}