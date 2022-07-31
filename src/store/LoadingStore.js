import {makeAutoObservable} from 'mobx'

export default class LoadingStore {
    constructor() {
        this._status = true
        makeAutoObservable(this)
    }
    
    setStatus(value) {
        this._status = value
    }

    get status() {
        return this._status
    }
}