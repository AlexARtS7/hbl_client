import {makeAutoObservable} from 'mobx'
import {productsAddType, productsDestroyOne, productsFetchAll, 
        productsFetchOne, productsFetchTypes, productsSaveOne } from "http/requests/productsApi";
import { imagesDelete, imagesSetPreview, imagesUpload } from "http/requests/imagesApi";

export default class ProductStore {
    constructor() {
        this._types = []
        this._selectedType = {}
        this._list = []
        this._item = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        this._loading = false
        makeAutoObservable(this)
    }

    async addType(type) {
        const data = await productsAddType(type)
        this._types = [...this._types, data]
        return
    }
    
    async fetchTypes() {
        const data = await productsFetchTypes()
        this._types = data
        return
    }

    async fetchProducts(typeId = this._selectedType.id) {
        this._loading = true
        const data = await productsFetchAll({typeId, page:this._page, limit:this._limit})
        this._list = data.rows
        this._totalCount = data.count
        this._loading = false
        return data
    }

    async fetchOneProduct(id) {
        this._loading = true
        const data = await productsFetchOne(id)
        this._item = data
        this._loading = false
        return id
    }

    async saveProduct(params) {
        const data = await productsSaveOne(params)
        await this.fetchProducts()
        return data
    }

    async destroyProduct(id) {
        const data = await productsDestroyOne(id)
        await this.fetchProducts()
        return data
    }

    async deleteImages(id, delArray) {
        const data = await imagesDelete(id, delArray)
        await this.fetchProducts()
        return data
    }

    async uploadImages(formData){
        const data = await imagesUpload(formData)
        await this.fetchProducts()
        return data
    }

    async setPreviewImage(id, productId){
        const data = await imagesSetPreview(id, productId)
        await this.fetchProducts()
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