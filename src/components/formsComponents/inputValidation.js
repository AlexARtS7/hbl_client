
const minLengthErrorText = (value) => `! минимум ${value} символа(ов)`
const maxLengthErrorText = (value) => `! максимум ${value} символа(ов)`
const isEmptyErrorText = '! заполните поле'
const emailCorrectErrorText = '! некорректный email'

const inputValidation = (value, validations) => {
    let checkRes = ''
    for(const validation in validations) {
        if(checkRes) break;
        switch (validation) {
            case 'isEmpty':
                !value ? checkRes = isEmptyErrorText : null
                break; 
            case 'minLength':
                value.length < validations[validation] ? checkRes = minLengthErrorText(validations[validation]) : null
                break;
            case 'maxLength':
                value.length > validations[validation] ? checkRes = maxLengthErrorText(validations[validation]) : null
                break;
            case 'email':
                !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value) ? checkRes = emailCorrectErrorText : null
                break;           
        }
    }
    return checkRes
}

export default inputValidation