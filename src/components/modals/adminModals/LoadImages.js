import React from "react"

const LoadImages = (props) => {
    const {files, setFiles} = props

    return (
        <>
            <p className='modal_label_min'>Добавить фотографии:</p>  
            <hr/><br/>  
            <input 
            className="modal_input_file"
            type='file'
            id='fileInput'
            multiple
            onChange={e => setFiles(e.target.files)}
            /> 
            {files && files[1] && Object.keys(files).map(function (key,i) {
            return <p key={i}>{this[key].name}</p>
            }, files)}                 
        </>
    )
}

export default LoadImages