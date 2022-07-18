import React, { useEffect, useState } from "react"

// const generateDelArray = (Files) => [...Files.map(element => ({name: element.name, status: element.status || true}))]

const PreviewImages = (props) => {
    const {product, loadedFiles, setLoadedFiles} = props
    const [delArray, setDelArray] = useState([...loadedFiles.map(element => ({name: element, status: true}))])

    const setPreview = (index, element) => {
        setDelArray(delArray.map(item => item.name === element? {...item, status:true}:item))
        setLoadedFiles([...loadedFiles.filter((_,i) => i === index), ...loadedFiles.filter((_,i) => i !== index)])
    }

    const selectDelFiles = (index) => {
        setDelArray(delArray.map(item => item.name === index ? {...item, status:!item.status}:item))
    }
  
    useEffect(() => {
        if(delArray.length !== loadedFiles.length) {
            const addArray = []
            loadedFiles.forEach((filename,i)=> i >= delArray.length && addArray.push({name: filename, status: true}))
            
            setDelArray([
                ...delArray.map(element => ({name: element.name, status: element.status})),
                ...addArray
            ])
        }        
    }, [loadedFiles])

    return (
        <>    
            <p className='modal_label_min'>Фотографии загруженные на сервер:</p>
            <hr/><br/>
            {loadedFiles.map((element,i) => 
                <div key={i}  style={{marginRight:'5px', position:'relative', display:'inline-block'}}>
                    <img 
                    style={{width:'120px',cursor:'pointer'}}
                    onClick={() => setPreview(i, element)}
                    src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
                    {i > 0 && <input 
                        className='modal_checkbox_del' type='checkbox'
                        onChange={() => selectDelFiles(element)}
                        // checked={delArray.find(item => item.name == element).status || true}
                        ></input>}
                    {i === 0 && 
                    <div style={{ position:'absolute', 
                                left:'0',
                                width:'100%', 
                                background:'rgba(255, 255, 255, .7)',
                                fontSize:'12px',
                                textAlign:'center',
                                bottom:'10px', }}>ПРЕВЬЮ</div>}
                </div>                        
            )}
            <br/><br/><hr/><br/>               
        </>
    )
}

export default PreviewImages