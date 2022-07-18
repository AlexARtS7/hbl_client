export const generateFormData = (params) => {
    const {id, name, price, specifications, description, files, loadedFiles, types, typeName} = params
    const formData = new FormData()
    
    id && formData.append('id', id)
    name && formData.append('name', name)
    price && formData.append('price', `${price}`)
    specifications && formData.append('specifications', specifications)
    description && formData.append('description', description)
    loadedFiles && formData.append('loadedFiles', JSON.stringify(loadedFiles))
    files && Object.keys(files).forEach(function (_,i) {
        formData.append(`files`, files[i])
    }, files)
    types && formData.append('typeId', types.filter(type => type.name === typeName)[0].id)
    return formData
}