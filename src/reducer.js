import {DECREASE, INCREASE} from './actions';

function shopingCartReducer(state, action) {
  console.log({state, action})
  if (action.type === DECREASE) {
    // return a new object
    return {...state, count: state.count - 1}
  }
  if (action.type === INCREASE) {
    // return a new object
    return {...state, count: state.count + 1}
  }

  return state;
}

export default shopingCartReducer;