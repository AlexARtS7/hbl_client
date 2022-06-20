
export const loginErrorsHandler = (login) => {
    let checkRes = ''
    if(login.length < 3) checkRes = '! минимум 3 символа'
    if(!login) checkRes = '! поле не может быть пустым'
    if(login.length > 50) checkRes = '! максимум 50 символов'
    return checkRes
}

export const passwordErrorsHandler = (password) => {
    let checkRes = ''
    if(password.length < 6) checkRes = '! минимум 6 символов'
    if(!password) checkRes = '! введите пароль'
    if(password.length > 50) checkRes = '! максимум 50 символов'
    return checkRes
}

export const emailErrorsHandler = (email) => {
    let checkRes = ''
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email)) checkRes = '! некорректный email'
    if(!email) checkRes = '! введите email'    
    return checkRes
}