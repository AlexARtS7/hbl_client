import { loginIn, registration } from "http/userApi"

export const authRequest = async(isLoginIn, user, setEmailErr, setPasswordErr, setErrorsVisible, {...props}) => {
    const {email, password, login} = props
    try {
        let userData
        if(isLoginIn) {
            userData = await loginIn(email, password)
        } else {
            userData = await registration(login, email, password)
        }  
        user.setUser(userData)   
        user.setIsAuth(true)
        return true
    } catch (e) {
        setErrorsVisible(true)
        switch(e.response.data.index) {
            case 1: setEmailErr(e.response.data.message)
                break;
            case 2: setPasswordErr(e.response.data.message)
                break;

        }
        
    }   
}