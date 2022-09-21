import { $authHost } from "../axios/index";
import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor() {
        this._products = []
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        makeAutoObservable(this)
    }

    async addProduct(userId, productId, name){
        const {data} = await $authHost.post('api/basket/addproduct', {userId, productId, name})
        await this.fetchBasketProducts(userId)
        return data
    }
    
    async fetchBasketProducts(userId){
        const {data} = await $authHost.get('api/basket/products', {params: {userId, page:this._page, limit:this._limit}})
        this._products = data.rows
        this._totalCount = data.count
        return data
    }
    
    async deleteProduct(id, userId){
        const {data} = await $authHost.delete('api/basket/deleteproduct?id=' + id)
        await this.fetchBasketProducts(userId)
        return data
    }

    setProducts(value) {
        this._products = value
    }

    setPage(page) {
        this._page = page
    }

    get products() {
        return this._products
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