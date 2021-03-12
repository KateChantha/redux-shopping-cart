import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// items / data
import cartItems from "./cart-items";

// redux stuff
import {createStore} from "redux";
  // initail store
const initailStore = { count: 3}
  // reducer
function shopingCartReducer(state, action) {
  console.log({state, action})
  return state
}

const store = createStore(shopingCartReducer, initailStore)
store.dispatch({type: "DECREASE"})

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
