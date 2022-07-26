import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import ModalStore from 'store/ModalStore';
import ProductStore from 'store/ProductStore';
import UserStore from 'store/UserStore';
import App from './App';

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Context.Provider value={{
    user: new UserStore(),
    products: new ProductStore(),
    modals: new ModalStore()
  }}>
    <App />
  </Context.Provider>
);