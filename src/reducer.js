import {DECREASE, INCREASE, CLEAR_CART, REMOVE, GET_TOTALS} from './actions';

// items / data
import cartItems from "./cart-items";
// initail store 
const initailStore = { 
  cart: cartItems,
  total: 0,
  amount: 0
}

/**
 * @param {*} state - { amount: num, cart: [], total: num }
 * @param {*} action 
 */
function shopingCartReducer(state = initailStore, action) {
  switch(action.type) {
    case CLEAR_CART:
      // return a new object
      return {...state, cart: []};
    case DECREASE:
      let decreasedCart = [];
      if (action.payload.amount === 1) {
        // when item amount is 0
        // remove the item from the cart 
        decreasedCart = state.cart.filter(item => item.id !== action.payload.id)
      }
      else {
        decreasedCart = state.cart.map(item => {
          return item.id === action.payload.id
                  // return a new copy of item
                ? {...item, amount: item.amount - 1}
                : item;
        })
      }
      // return a new object cart
      return {...state, cart: decreasedCart};
    case INCREASE:
      const increasedCart = state.cart.map(item => {
        return item.id === action.payload.id 
                // return a new copy of item
              ? {...item, amount: item.amount + 1}
              : item;
      })
      // return a new object cart
      return {...state, cart: increasedCart};
    case REMOVE:
      // filter return the new copy of the array
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
      // return a new object cart
      return {...state, cart: updatedCart };
    case GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, itemAmount) => { 
          const {price, amount} = itemAmount;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal
        }, {total: 0, amount: 0})
      // fix total
      total = parseFloat(total.toFixed(2));
      // return a new object cart
      return {...state, total, amount }
    default:
      return state;
  }
}

export default shopingCartReducer;

