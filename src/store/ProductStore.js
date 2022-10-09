import {makeAutoObservable} from 'mobx'
import {productsAddCategory, productsDestroyOne, productsFetchAll, 
        productsFetchOne, productsFetchCategories, productsSaveOne } from "http/requests/productsApi";
import { imagesDelete, imagesSetPreview, imagesUpload } from "http/requests/imagesApi";

export default class ProductStore {
    constructor() {
        this._categories = []
        this._selectedCategory = {}
        this._list = []
        this._item = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        this._loading = false
        makeAutoObservable(this)
    }

    async addCategory(category) {
        const data = await productsAddCategory(category)
        this._categories = [...this._categories, data]
        return
    }
    
    async fetchCategories() {
        const data = await productsFetchCategories()
        this._categories = data
        return
    }

    async fetchProducts(categoryId = this._selectedCategory.id) {
        this._loading = true
        const data = await productsFetchAll({categoryId, page:this._page, limit:this._limit})
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

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
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

    get categories() {
        return this._categories
    }

    get selectedCategory() {
        return this._selectedCategory
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