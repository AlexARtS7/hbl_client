import {makeAutoObservable} from 'mobx'

export default class ModalStore {
    constructor() {
        this._editProduct = {show:false}
        this._editType = {show:false}
        this._auth = {show:false}
        makeAutoObservable(this)
    }
    
    setEditProduct(value) {
        this._editProduct = value
    }

    setEditType(value) {
        this._editType = value
    }

    setAuth(value) {
        this._auth = value
    }

    get editProduct() {
        return this._editProduct
    }

    get editType() {
        return this._editType
    }

    get auth() {
        return this._auth
    }
}
