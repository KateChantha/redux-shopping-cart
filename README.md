## Shopping Cart using Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Working Steps
1. In CartContainer.js, we set default value for the cart items that receieve as a props.
```
const CartContainer = ({ cart = [] }) => { ...}
```
- if cartItems(array) is empty (an empty array), then display a message "your cart is empty"
- if there is something in the cartItems array, then map over item and display each CardItem UI.

2. In App.js
- (2.1) createStore
- invoke the createStore from redux api
- and store the value of createStore in variable "store"
- createStore is expected first argument, which is a cb function that used to update store, a.k.a the reducer function.
- createStore second argument is the initail store
- (2.2) shoppingCartReducer function
- expect 2 arguments - state(state before the update) and action
- returns updated or old state (always return state as a default incase there is no action match)
```
const store = createStore( shopingCartReducer, initailStore );

function App() {
  return (
    <Provider store={store}>
      /* children */
    </Provider>
  );
}
```

3. dispatch method - send actions to the store. 
- It's a method from createStore() inherent to variable "store"
- actions (objects) - MUST HAVE type propterty - indicate what kind of action. Optional payload property.
- DO NOT mutate the state - redux built on IMMUTABILITY (copy)
- NOTE: test out console log result of calling...
```
store.getState()
store.dispatch({ type: "DECREASE" })
```
4. In actions.js, store a string of action type as a variable to avoid typo.
```
const DECREASE = "DECREASE"
```
5. now *** connect react to redux store ***
6. react-redux 
- Provider - wraps app at the root component. now every children will able to access store/state, dispatch method for dispatching the actions.
- connect (HOC)- used in component to get value from store/state. 
- connect has a fews arguments most commonly naming are mapStateToProps cb function and mapDispatchToProps cb function. And those cb functions will have an access to the store
- example in the Navbar, will get the "amount" props as the only props that we map in the mapStateToProps function
```
const Navbar = ({ amount }) => { ... }

const mapStateToProps = state => {
  return { amount: state.amount }
}
export default connect(mapStateToProps)(Navbar);
```
7. CartContainer.js
- (7.1) connect react-redux store to CartContainer and map the store props (mapStateToProps) to the returning object with property of cart(all products in the cart) and total
```
function mapStateToProps(store) {
  return {
    cart: store.cart,
    total: store.total
  }
}
export default connect(mapStateToProps)(CartContainer);
```
- (7.2) set up dispatch method
- dispatch method is a props that come from Provider that all the children get automaticly.

```
const CartContainer = ({ cart = [], total, dispatch}) => { ... }
```
- (7.3) import CLEAR_CART action and dispatch the action object with our UI - inline onclick function
```
<button 
  onClick={() => dispatch({ type : CLEAR_CART })}
>clear cart</button>

```
8. CartItem.js
- (8.1) import { DECREASE, INCREASE, REMOVE } form actions
- (8.2) connect CartItem with react-redux store/state by warpping with connect() HOC. 
- Since we get the product item as a props passing from parent(CartContainer), so this time we won't need to use mapStateToProps - assign to null.
```
export default connect(null, mapDispatchToPorps)(CartItem)
```
- (8.3) set up dispatch method
- this time, we set up dispatch method in the mapDispatchToProps. And we don't need to have mapStateToProps
- when we use mapDispatchToProps, we have access to dispatch(from react-redux)-as 1st parameter. And access to the component ownsProps- as a 2nd parameter
```
const CartItem = ({ img, title, price, amount, remove }) => { ... }

const mapDispatchToPorps = (dispatch, ownProps) => {
  const {id} = ownProps
  return {
    remove: () => dispatch({ type: REMOVE, payload: {id} })
  };
}

export default connect(null, mapDispatchToPorps)(CartItem)
```
- implement the mapDispatchToPorps - remove onClick the remove button
```
<button onClick={ () => remove() }>remove</button>
same result as
<button onClick={ remove }>remove</button>
```