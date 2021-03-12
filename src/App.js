import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// items / data
import cartItems from "./cart-items";

// redux stuff
import {createStore} from "redux";
// import {DECREASE, INCREASE} from './actions';
import shopingCartReducer from './reducer';
import {Provider} from 'react-redux';

  // initail store 
const initailStore = { 
  cart: cartItems,
  total: 12,
  amount: 5
}

const store = createStore(shopingCartReducer, initailStore)

function App() {
  // cart setup

  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
