const init_state = {
  cart: [],
};

const user = (state = init_state, actions) => {
  switch (actions.type) {
    case "ADD_CART":
      return state;
    default:
      return state;
  }
};

export default user;
