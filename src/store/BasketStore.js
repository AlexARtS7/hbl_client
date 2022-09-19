import { $authHost, $host } from "../axios/index";
import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor() {
        this._products = []
        makeAutoObservable(this)
    }

    async addProduct(userId, productId, name){
        const {data} = await $authHost.post('api/basket/addproduct', {userId, productId, name})
        await this.fetchBasketProducts(userId)
        return data
    }
    
    async fetchBasketProducts(userId){
        const {data} = await $authHost.get('api/basket/products?userId=' + userId) 
        this._products = data
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

    get products() {
        return this._products
    }
}