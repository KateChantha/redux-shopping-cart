import {DECREASE, INCREASE, CLEAR_CART, REMOVE} from './actions';

function shopingCartReducer(state, action) {
  switch(action.type) {
    case CLEAR_CART:
      return {...state, cart: []};
    case DECREASE:
      console.log(" decrease amount")
      return state;
    case INCREASE:
      console.log(" incresase amount")
      return state;
    case REMOVE:
      console.log(" remove")
      return state;
    default:
      return state;
  }
}

export default shopingCartReducer;

// function shopingCartReducer(state, action) {
//   if (action.type === CLEAR_CART) {
//     // return a new object
//     return {...state, cart: []}
//   }
//   return state;
// }