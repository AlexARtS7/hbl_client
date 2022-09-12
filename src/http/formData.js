export const generateFormData = (params) => {
    const {id, name, price, files, filesArray, types, typeName, info, description} = params
    const formData = new FormData()
   
    id && formData.append('id', id)
    name && formData.append('name', name)
    price && formData.append('price', `${price}`)
    filesArray && formData.append('filesArray', JSON.stringify(filesArray))
    files && Object.keys(files).forEach(function (_,i) {
        formData.append(`files`, files[i])
    }, files)
    types && formData.append('typeId', types.filter(type => type.name === typeName)[0].id)
    info && formData.append('info', JSON.stringify(info))
    description && formData.append('description', description)
    return formData
}