import { Context } from "index";
import { useContext } from "react";
import { $authHost, $host } from "./index";

const productApi = () => {
    const {loading, products} = useContext(Context)

    const createProduct = async(formData) => {
        const {data} = await $authHost.post('api/products/create', formData)
        return data
    }

    const deleteProduct = async(id) => {
        const {data} = await $authHost.delete('api/products/' + id)
        return data
    }

    const fetchProducts = async(
            typeId = products.selectedType.id, 
            page = products.page, 
            limit = products.limit) => {
        loading.setStatus(true)
        const {data} = await $host.get('api/products', {params: {typeId, page, limit}})
        products.setList(data.rows.map(e => ({ ...e, img: JSON.parse(e.img) })))
        products.setTotalCount(data.count)
        loading.setStatus(false)
        return data
    }

    const fetchOneProduct = async(id) => {
        const {data} = await $host.get('api/products/' + id)
        data.img = JSON.parse(data.img)
        products.setItem(data)
        return data
    }

    const fetchProductInfo = async(id) => {
        const {data} = await $host.get('api/products/info/' + id)
        products.setItemInfo(data)
        return data
    }

    const fetchProductDescription = async(id) => {
        const {data} = await $host.get('api/products/description/' + id)
        products.setItemDescription(data.description)
        return data.description
    }

    const createType = async(type) => {
        const {data} = await $authHost.post('api/type', type)
        products.setTypes([...products.types, data])
        return data
    }

    const fetchTypes = async() => {
        const {data} = await $host.get('api/type')
        products.setTypes(data)
        return data
    }

    const uploadFiles = async(formData) => {
        const {data} = await $authHost.post('api/products/addfiles', formData)
        return data
    }

    const deleteFiles = async(formData) => {
        const {data} = await $authHost.post('api/products/deletefiles', formData)
        return data
    }
    
    const changeOrderFiles = async(formData) => {
        const {data} = await $authHost.post('api/products/orderfiles', formData)
        return data
    }
    
    const updateData = async(formData) => {
        const {data} = await $authHost.post('api/products/updatedata', formData)
        return data
    }

    return {
        createProduct,
        deleteProduct,
        fetchProducts,
        fetchOneProduct,
        fetchProductInfo,
        fetchProductDescription,
        fetchTypes,
        createType,
        uploadFiles,
        deleteFiles,
        changeOrderFiles,
        updateData
    }
}

export default productApi