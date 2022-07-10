import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._products = []
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }

    addOneProduct(product) {
        this._products = [...this._products, product]
    }
}