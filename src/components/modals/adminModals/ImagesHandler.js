import React from "react"

const ImagesHandler = (props) => {
    const {product, files, selectFile, loadedFiles, onClick, onDelSelect, delArray} = props

    const temp = () => {
        // delArray.filter(item => item.name == element)[0].status
    }

    const setPreview = (index, element) => {
        // setDelArray(delArray.map(item => item.name === element? {...item, status:true}:item))
        // setLoadedFiles([...loadedFiles.filter((_,i) => i === index), ...loadedFiles.filter((_,i) => i !== index)])
    }
    
    const selectDelFiles = (index) => {
        // setDelArray(delArray.map(item => item.name === index ? {...item, status:!item.status}:item))
    }

    return (
        <>
            {product && 
                <>
                    <p className='modal_label_min'>Фотографии загруженные на сервер:</p>
                    <hr/><br/>
                    {loadedFiles.map((element,i) => 
                        <div key={i}  style={{marginRight:'5px', position:'relative', display:'inline-block'}}>
                            <img 
                            style={{width:'120px',cursor:'pointer'}}
                            onClick={() => onClick(i, element)}
                            src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
                            {i > 0 && <input 
                                className='modal_checkbox_del' type='checkbox'
                                onChange={() => onDelSelect(element)}
                                // checked={}
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
            }
            <p className='modal_label_min'>Добавить фотографии:</p>  
            <hr/><br/>  
            <input 
            className="modal_input_file"
            type='file'
            id='fileInput'
            multiple
            onChange={e => selectFile(e)}
            /> 
            {files && files[1] && Object.keys(files).map(function (key,i) {
            return <p key={i}>{this[key].name}</p>
            }, files)}                 
        </>
    )
}

export default ImagesHandler