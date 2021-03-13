import { CLEAR_CART, REMOVE, GET_TOTALS, TOGGLE_AMOUNT } from './actions';


/**
 * @param {*} state - { amount: num, cart: [], total: num }
 * @param {*} action 
 */
function shopingCartReducer(state, action) {
  switch(action.type) {
    case CLEAR_CART:
      // return a new object
      return {...state, cart: []};
    case TOGGLE_AMOUNT:
      const toggledCart = state.cart.map(item => {
        if (item.id === action.payload.id) {
          if (action.payload.delta === "inc") {
            return {...item, amount: item.amount + 1}
          }
          if (action.payload.delta === "dec") {
            return {...item, amount: item.amount - 1}
          }
        }
        // else
        return item;
      })
      // return a new object cart
      return {...state, cart: toggledCart};
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

