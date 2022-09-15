import { $authHost, $host } from "../axios/index";
import {makeAutoObservable} from 'mobx'

export default class ProductStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._list = []
        this._item = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        this._loading = false
        makeAutoObservable(this)
    }

    async addType(type) {
        const {data} = await $authHost.post('api/type', type)
        this._types = [...this._types, data]
        return
    }
    
    async fetchTypes() {
        const {data} = await $host.get('api/type')
        this._types = data
        return
    }

    async fetchProducts(typeId = this._selectedType.id) {
        this._loading = true
        const {data} = await $host.get('api/products', {params: {typeId, page:this._page, limit:this._limit}})
        this._list = data.rows
        this._totalCount = data.count
        this._loading = false
        return data
    }

    async fetchOneProduct(id) {
        this._loading = true
        const {data} = await $host.get('api/products/' + id)
        this._item = data
        this._loading = false
        return id
    }

    async saveProduct(params) {
        const {data} = await $authHost.post('api/products/create', params)
        this.fetchProducts()
        return data
    }

    async destroyProduct(id) {
        const {data} = await $authHost.delete('api/products/delete?id=' + id)
        this.fetchProducts()
        return data
    }

    async uploadImages(formData){
        const {data} = await $authHost.post('api/images/addfiles', formData)
        return data
    }

    async setPreviewImage(id, productId){
        const {data} = await $authHost.post('api/images/setpreview?id=' + id + '&productId=' + productId)
        return data
    } 

    setItem(item = {}){
        this._item = item
    }
    
    setPage(page) {
        this._page = page
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
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

    get loading() {
        return this._loading
    }
}