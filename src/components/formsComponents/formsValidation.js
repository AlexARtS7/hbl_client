
const formsValidation = (value, validations) => {
    let err = ''
    for(const validation in validations) {
        const text = validations[validation].text || '_'
        switch (validation) {
            case 'isEmpty':
                !value ? err = text : null
                break; 
            case 'minLength':
                value.length < validations[validation] ? err = text : null
                break;
            case 'maxLength':
                value.length > validations[validation] ? err = text : null
                break;
            case 'email':
                !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value) ? err = text : null
                break;           
        }
    }
    return err
}

export default formsValidation