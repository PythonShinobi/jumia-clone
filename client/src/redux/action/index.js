// client/src/redux/action/index.js
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product
  };
};

export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product
  };
};

export const clearCart = () => {
  return {
    type: "CLEARCART",
    payload: []
  }
}