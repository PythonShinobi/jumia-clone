// client/src/redux/reducer/handleCart.js

// Reducers are pure functions that take the current state and an action as arguments and return a 
// new state. They specify how the state changes in response to actions.

const cart = [];

// The 'handleCart' reducer manages the state related to the shopping cart 
// updating it based on the dispatched actions.
const handleCart = (state=cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      // Check if the product is already in the cart
      const exist = state.find((x) => x.id === product.id);

      // If the product is already in the cart
      if (exist) {
          // Increase the quantity of the existing product
          return state.map((x) => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      } else {
          // If the product is not in the cart, add it with a quantity of 1
          return [...state, { ...product, qty: 1 }];
      }            

    case "DELITEM":
      // Find the item in the cart that matches the product ID
      const delItem = state.find((x) => x.id === product.id);
      
      // Check if the quantity of the item to be deleted is 1
      if (delItem.qty === 1) {
          // If the quantity is 1, remove the item from the cart
          return state.filter((x) => x.id !== delItem.id);
      } else {
          // If the quantity is greater than 1, decrement the quantity by 1
          return state.map((x) => x.id === product.id ? {...x, qty: x.qty - 1} : x)
      } 

    default:
      return state
  };
};

export default handleCart;