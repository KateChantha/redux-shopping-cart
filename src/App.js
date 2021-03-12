import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// items / data
import cartItems from "./cart-items";

// redux stuff
import {createStore} from "redux";
import {DECREASE, INCREASE} from './actions';
  // initail store
const initailStore = { 
  count: 3,
  mame: "john"
}

  // reducer
function shopingCartReducer(state, action) {
  console.log({state, action})
  if (action.type === DECREASE) {
    // return a new object
    return {...state, count: state.count - 1}
  }
  if (action.type === INCREASE) {
    // return a new object
    return {...state, count: state.count + 1}
  }
 
  return state
}

const store = createStore(shopingCartReducer, initailStore)
store.dispatch({type: DECREASE})
store.dispatch({type: INCREASE})


function App() {
  // cart setup

  return (
    <main>
      <Navbar cart={store.getState()}/>
      <CartContainer cart={cartItems} />
    </main>
  );
}

export default App;
