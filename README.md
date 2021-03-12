## Shopping Cart using Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Working Steps
1. In CartContainer.js, we set default value for the cart items that receieve as a props.
```
<CartContainer cart={cartItems} />
```
```
const CartContainer = ({ cart = [] }) => { ...}
```
- if cartItems(array) is empty (an empty array), then display message "your cart is empty"
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

3. dispatch method - send actions to the store. 
- It's a method from createStore() inherent to variable "store"
- actions (objects) - MUST HAVE type propterty - indicate what kind of action. Optional payload property.
- DO NOT mutate the state - redux built on IMMUTABILITY (copy)
- NOTE: test out console log result of calling...
```
store.getState()
store.dispatch({type: "DECREASE"})
```
4. In actions.js, store a string of action type as a variable to avoid typo.
```
const DECREASE = "DECREASE"
```
5. now *** connect react to redux store ***
6. react-redux 
- Provider - wraps app at the root component. now every childrens will able to access store, dispatch method, dispatch the actions.
- connect (HOC)- used in component to get value from state / store. 
- connect has a fews arguments most commonly naming are mapStateToProps cb function and mapdispatchToProps cb function. And those cb functions will have an access to the store
- example in the Navbar, will get the "amount" props as the only props that we map in the mapStateToProps function
```
const Navbar = ({ amount }) => { ... }

const mapStateToProps = state => {
  return { amount: state.amount }
}
export default connect(mapStateToProps)(Navbar);
```
7. set up dispatch method