import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor() {
        this._products = {}
        makeAutoObservable(this)
    }
    
    setProducts(value) {
        this._products = value
    }

    get products() {
        return this._products
    }
}