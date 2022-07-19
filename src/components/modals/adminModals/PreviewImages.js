import { changeOrderFiles, deleteFiles } from "http/productApi"
import { Context } from "index"
import React, { useContext, useEffect, useState } from "react"
import { FullButton } from "../modalComponents"
import { generateFormData } from "./generateFormData"

const PreviewImages = (props) => {
    const {products} = useContext(Context)
    const {product, loadedFiles, setLoadedFiles} = props
    const [delArray, setDelArray] = useState([...loadedFiles.map(element => ({name: element, status: false}))])
    const [delFilesBtnActive, setDelFilesBtnActive] = useState(false)
    
    const setPreview = (index, element) => {
        setDelArray(delArray.map(item => item.name === element? {...item, status:false}:item))
        setLoadedFiles([...loadedFiles.filter((_,i) => i === index), ...loadedFiles.filter((_,i) => i !== index)])
    }

    const selectDelFiles = (index) => {
        setDelArray(delArray.map(item => item.name === index ? {...item, status:!item.status}:item))
    }
  
    const checked = (element) => {
        const item = delArray.find(item => item.name == element)
        return item ? item.status:false
    }

    const deleteSelectedFiles = () => {
        const formData = generateFormData({id:product.id, 
            filesArray:delArray.filter(item => item.status)})
            const resultArray = loadedFiles.filter(filename => !delArray.find(item => item.name === filename).status)
        deleteFiles(formData)
        .then(response => {
            setLoadedFiles(resultArray)
            products.setProducts(products._products.map(element => 
                element.id === product.id ? {...element, img: resultArray}:element))
        })
    }

    useEffect(() => {
        if(delArray.length !== loadedFiles.length) {
            const addArray = []
            loadedFiles.forEach((filename,i)=> i >= delArray.length && addArray.push({name: filename, status: false}))
            
            setDelArray([
                ...delArray.map(element => ({name: element.name, status: element.status})),
                ...addArray
            ])
        }        
    }, [loadedFiles])

    useEffect(() => {
        delArray.find(item => item.status === true) ? setDelFilesBtnActive(true):setDelFilesBtnActive(false)
    },[delArray])
    
    return (
        <>    
            <p className='modal_label_min'>Фотографии загруженные на сервер:</p>
            <hr/><br/>
            {loadedFiles.map((element,i) => 
                <div key={i}  style={{marginRight:'5px', position:'relative', display:'inline-block'}}>
                    <img 
                    style={{width:'120px',cursor:'pointer'}}
                    onClick={() => setPreview(i, element)}
                    src={process.env.REACT_APP_API_URL + `${product.id}/` + element} title={element}/>
                    
                    {i > 0 && <input 
                        className='modal_checkbox_del' type='checkbox'
                        onChange={() => selectDelFiles(element)}
                        checked={checked(element)}
                        ></input>}
                    {i === 0 && 
                    <div style={{ position:'absolute', 
                                left:'0',
                                width:'100%', 
                                background:'rgba(255, 255, 255, .7)',
                                fontSize:'12px',
                                textAlign:'center',
                                bottom:'18px', }}>ПРЕВЬЮ</div>}
                </div>                        
            )}
            {delFilesBtnActive && 
                <><br/><br/><FullButton 
                    text='Удалить отмеченные изображения' 
                    onClick={deleteSelectedFiles}
                    bg='rgb(255, 52, 52)'
                    color='#ffffff'/></>}
            <br/><br/><hr/><br/>               
        </>
    )
}

export default PreviewImages