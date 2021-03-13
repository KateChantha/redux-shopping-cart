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
9. in CartContainer.js
- when something updating in the cart, we want to recalculate the total.
- set up dispacth to GET_TOTALS action in useEffect and has cart as dependency (but we include dispatch just for the warning from react)
```
useEffect(() => {
    dispatch({type: GET_TOTALS})
  }, [cart])
```
10. in reducer.js
- fix the price total with minimum total of 2 decimal
```
total = parseFloat(total.toFixed(2));
```
### ==== REFACTOR ====
#### Refactor 1
- change placement of the logic to check item amount === 1 
- remove that logic out off the reducer at DECREASE action (see reducer_refactor.js)
- instead, place the logic at the onClick decrease button in CartItem_refactor
1. in CartItem (see CartItem_refactor.js )
- if the current amount is 1, sipatch with REMOVE action - to remove item from the cart
- if the currenet amount greater than 1, dispatch with DECREASE action
```
   <button 
    onClick={() => {
      return amount === 1
            ? remove()
            : decrease()
    }}
  >

```

#### Refactor 2
- set up TOGGLE_AMOUT action that will taking care of both INCREASE & DECREASE amount
- now, arrow up and down button will dispatch wtih TOGGLE_AMOUNT 
```
 {/* increase amount */}
    <button 
      onClick={() => toggle("inc")}
    >

  {/* decrease amount */}
  <button 
    onClick={() => {
      return amount === 1
            ? remove()
            : toggle("dec")
    }}
  >
```
```
const mapDispatchToPorps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    remove: () => dispatch({ type: REMOVE, payload: {id} }),
    toggle: (delta) => dispatch({ type: TOGGLE_AMOUNT, payload: {id, delta}})
  };
}
```
#### Refactor 3
- in App.js refactor by removing initailStore that was passed as a 2nd argument
```
  // const store = createStore(shopingCartReducer, initailStore )
  const store = createStore(shopingCartReducer)
  
```
- when remove initailStore from create store, then store/state becomes undefined. It will cause the error for example ** cannot read property 'amount' of undefined **
- to fix that
- in reducer.js , pass the initailStore as a defualt state
```
function shopingCartReducer(state = initailStore, action) { ... }

```
- To set up the intialState as a default state in the reducer will helps scale the app by seperating to multiple reducers
- each reducer will set it's own initail state/data to whatever it needs.

#### Refactor 4
- create function - action creator
```
export const REMOVE = "REMOVE" 
export const removeItem = (id) => {
  return {type:REMOVE, payload: {id}}
}
```
- in CartItem_refactor.js - import removeItem action creator
```
import { removeItem } from '../actions';
```
- dispatach the removeItem in mapDispatchToProps
```
const mapDispatchToPorps = (dispatch, ownProps) => {
  const { id } = ownProps;
  return {
    remove: dispatch(removeItem(id))
  };
}

export default connect(null, mapDispatchToPorps)(CartItem);

```
#### set up Redux Dev Tools
[redux-devtools-extension github](https://github.com/zalmoxisus/redux-devtools-extension)

1.1 Basic store
For a basic Redux store simply add:
- in App.js
```
 const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

```
