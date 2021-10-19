import Axios from "axios";
import { Provider } from "react-redux";
import { URL_API } from "helper/helper";

export const getCart = (user_state) => {
  const { role_id } = user_state;
  if (!role_id) return false;
  return (dispatch) => {
    Axios.get(`${URL_API}/users/cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.data.DATA.cart_id) {
          dispatch({
            type: "NOTHING",
            payloads: res.data.DATA,
          });
        } else {
          dispatch({
            type: "GET_USER_CART",
            payloads: res.data.DATA,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const updateCart = (product_id, qty) => {
  return {
    type: "UPDATE_CART",
    payloads: { product_id, qty },
  };
};
export const recipeCart = (image) => {
  return {
    type: "ADD_RECIPE",
    payloads: image,
  };
};
