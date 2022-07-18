import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._products = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setSelectedType(type) {
        // this.setPage(1)
        this._selectedType = type
    }

    addOneType(type) {
        this._types = [...this._types, type]
    }

    setProducts(products) {
        this._products = products
    }

    addOneProduct(product) {
        this._products = [...this._products, product]
    }

    deleteOneProduct(id) {
        this._products = this._products.filter(product => product.id !== id)
    }
}