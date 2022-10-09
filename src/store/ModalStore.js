import {makeAutoObservable} from 'mobx'

export default class ModalStore {
    constructor() {
        this._editProduct = {show:false}
        this._editImages = {show:false}
        this._editCategory = {show:false}
        this._auth = {show:false}
        makeAutoObservable(this)
    }
    
    setEditProduct(value) {
        this._editProduct = value
    }

    setEditImages(value) {
        this._editImages = value
    }

    setEditCategory(value) {
        this._editCategory = value
    }

    setAuth(value) {
        this._auth = value
    }

    get editProduct() {
        return this._editProduct
    }

    get editImages() {
        return this._editImages
    }

    get editCategory() {
        return this._editCategory
    }

    get auth() {
        return this._auth
    }
}
