import React from "react"

export const Input = (props) => {
    const {value, setValue, name, label, type} = props
    return (
        <>
            <p className='modal_label_min'>{label}</p>
            <input 
                className="modal_input"
                value={value}
                type={type}
                name={name}
                onChange={e => setValue(e.target.value)}
            />
        </>
    )
}

export const Select = (props) => {
    const {value, array, setValue, label} = props
    return (
        <>
            <p className='modal_label_min'>{label}</p>
            <select 
                className='modal_select'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value={0}>Выберите категорию</option> 
                {array.map(e => 
                    <option 
                        key={e.id} 
                        value={e.name}  
                    >{e.name}</option>
                )} 
            </select>
        </>
        
    )
}

export const Textarea = (props) => {
    const {value, setValue, label} = props
    return (
        <>
            <p className='modal_label_min'>{label}</p>
            <textarea
                style={{resize: 'vertical', minHeight:'100px', maxHeight:'400px'}}
                className='modal_input'
                value={value}
                onChange={e => setValue(e.target.value)}
            >
            </textarea>
        </>
    )
}

export const FullButton = (props) => {
    const {bg, color, onClick, text} = props
    return (
        <>
            <button 
                className="modal_button_full" 
                style={{background:bg, color:color}} 
                onClick={onClick}>{text}</button>
        </>
    )
}

export const Images = (props) => {
    const {product, files, selectFile, loadedFiles, onClick, onDelete} = props
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
                            onClick={() => onClick(i)}
                            src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
                            <div onClick={() => onDelete(i)} className='modal_button_del'>del</div>
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