import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import BasketStore from 'store/BasketStore';
import ModalStore from 'store/ModalStore';
import ProductStore from 'store/ProductStore';
import ToastsStore from 'store/ToastsStore';
import UserStore from 'store/UserStore';
import App from './App';

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Context.Provider value={{
    user: new UserStore(),
    basket: new BasketStore(),
    products: new ProductStore(),
    modals: new ModalStore(),
    toasts: new ToastsStore()
  }}>
    <App />
  </Context.Provider>
);