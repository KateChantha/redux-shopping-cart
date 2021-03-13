import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

// redux stuff
import {createStore} from "redux";
// import {DECREASE, INCREASE} from './actions';
import shopingCartReducer from './reducer';
import {Provider} from 'react-redux';

// refactor by removing initail store that was passed as a 2nd argument
const store = createStore(shopingCartReducer)

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
