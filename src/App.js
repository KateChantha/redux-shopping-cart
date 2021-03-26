import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";

// redux stuff
import {createStore} from "redux";
// import {DECREASE, INCREASE} from './actions';
import shopingCartReducer from './state/reducer';
import {Provider} from 'react-redux';

const store = createStore(shopingCartReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

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
