import { $authHost, $host } from "http/axios"

export const userRegistration = async(login, email, password) => {
    const {data} = await $host.post('api/user/registration', {login, email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return data
}

export const userLoginIn = async(email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return data
}

export const userCheck = async() => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return data
}
