import {makeAutoObservable} from 'mobx'

export default class ToastsStore {
    constructor() {
        this._list = []
        makeAutoObservable(this)
    }
    
    addToast(toast) {
        this._list.push(toast)
    }

    shiftToast() {
        this._list.shift()
    }

    setToasts(toasts) {
        this._list = toasts
    }

    get list() {
        return this._list
    }

}
