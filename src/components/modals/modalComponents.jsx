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

export const Images = (props) => {
    const {product, files, selectFile} = props
    return (
        <>
            {product && 
                <>
                    <p className='modal_label_min'>Фотографии загруженные на сервер:</p>
                    <hr/><br/>
                    {product.img.map((element,i) => 
                        <div style={{marginRight:'5px', position:'relative', display:'inline-block'}}>
                            <img 
                            key={i}  
                            style={{width:'120px'}}
                            src={process.env.REACT_APP_API_URL + `${product.id}/` + element}/>
                            <input type='checkbox'  
                                style={{position:'absolute', 
                                        right:'5px', 
                                        top:'5px', 
                                        width:'18px', 
                                        height:'18px',
                                        cursor:'pointer',
                                        outline:'1px solid #ffffff'}}/>
                            {i === 0 && 
                            <p style={{ position:'absolute', 
                                        left:'5px', 
                                        color:'#ffffff',
                                        bottom:'5px', }}>ПРЕВЬЮ</p>}
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
            multiple
            onChange={e => selectFile(e)}
            /> 
            {files && files[1] && Object.keys(files).map(function (key,i) {
            return <p key={i}>{this[key].name}</p>
            }, files)}                 
        </>
    )
}