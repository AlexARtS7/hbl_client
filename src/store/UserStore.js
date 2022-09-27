import jwt_decode from 'jwt-decode';
import {makeAutoObservable} from 'mobx'
import { userCheck, userLoginIn, userRegistration } from "http/requests/userApi";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._data = {}
        makeAutoObservable(this)
    }

    async registration(login, email, password){
        const data = await userRegistration(login, email, password)
        this._data = jwt_decode(data.token)
        this._isAuth = true
        return
    }
    
    async loginIn(email, password){
        const data = await userLoginIn(email, password)
        this._data = jwt_decode(data.token)
        this._isAuth = true
        return
    }
    
    async check(){
        const data = await userCheck()
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