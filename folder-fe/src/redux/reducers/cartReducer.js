const INITIAL_STATE = {
  cart_id: false,
  cart_item: [],
  recipe_image: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type, "Type");
  switch (action.type) {
    case "GET_USER_CART":
      state.cart_id = action.payloads.cart_id;
      state.cart_item = [...action.payloads.cart_items];
      console.log(state, "This is state");
      return { ...state };
    case "ADD_RECIPE":
      state.recipe_image = action.payloads;
      return { ...state };
    case "UPDATE_CART":
      const updatedCart = state.cart_item.map((x) => {
        return x.product_id == action.payloads.product_id
          ? { ...x, quantity: action.payloads.qty }
          : x;
      });
      state.cart_item = [...updatedCart];
      return { ...state };
    default:
      return { ...INITIAL_STATE };
  }
};
