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
- if cartItems is an empty array, then display message "your cart is empty"
- if something in the cartItems array, then map over item and display each CardItem UI.
