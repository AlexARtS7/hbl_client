import { $authHost, $host } from "../axios/index";
import jwt_decode from 'jwt-decode';
import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._data = {}
        makeAutoObservable(this)
    }

    async registration(login, email, password){
        const {data} = await $host.post('api/user/registration', {login, email, password, role: 'USER'})
        localStorage.setItem('token', data.token)
        this._data = jwt_decode(data.token)
        this._isAuth = true
        return 
    }
    
    async loginIn(email, password){
        const {data} = await $host.post('api/user/login', {email, password})
        localStorage.setItem('token', data.token)
        this._data = jwt_decode(data.token)
        this._isAuth = true
        return
    }
    
    async check(){
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        this._data = jwt_decode(data.token)
        this._isAuth = true
        return
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setData(data) {
        this._data = data
    }

    get isAuth() {
        return this._isAuth
    }

    get data() {
        return this._data
    }
}