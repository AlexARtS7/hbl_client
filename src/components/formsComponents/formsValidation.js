import React from 'react'

const formsValidation = (value, validations) => {
    let err = ''
    for(const validation in validations) {
     
        switch (validation) {
            case 'isEmpty':
                !value ? err=validations[validation].text || 'Поле не может быть пустым' : null
                break; 
            case 'minLength':
                value.length < validations[validation] ? err='f' : null
                break;
            case 'maxLength':
                value.length > validations[validation] ? err='f' : null
                break;
            case 'email':
                !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value) ? err='Некорректный email' : null
                break;           
        }
    }
    return err
}

export default formsValidation