import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._list = []
        this._item = {}
        this._itemInfo = []
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
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

    setList(list) {
        this._list = list
    }

    setItem(item) {
        this._item = item
    }

    setItemInfo(info) {
        this._itemInfo = info
    }

    get list() {
        return this._list
    }

    get item() {
        return this._item
    }

    get itemInfo() {
        return this._itemInfo
    }

    get types() {
        return this._types
    }

    get selectedType() {
        return this._selectedType
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}