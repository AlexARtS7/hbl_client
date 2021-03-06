import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._products = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        this._reload = false
        makeAutoObservable(this)
    }

    initReload() {
        this._reload = !this._reload
    }

    setTypes(types) {
        this._types = types
    }
    
    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    addOneType(type) {
        this._types = [...this._types, type]
    }

    setProducts(products) {
        this._products = products
    }
}