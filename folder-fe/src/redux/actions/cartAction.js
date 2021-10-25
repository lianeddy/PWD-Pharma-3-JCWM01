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

export const updateCart = (product_id, qty, cart_id) => {
  return (dispatch) => {
    Axios.patch(
      `${URL_API}/users/cart`,
      {
        cart_id: cart_id,
        product_id: product_id,
        qty: qty,
        remove: qty <= 0 ? true : false,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      dispatch({
        type: "UPDATE_CART",
        payloads: { product_id, qty },
      });
    });
  };
};

export const addCart = (product_id, qty = 1) => {
  return (dispatch) => {
    let items = [
      {
        productId: product_id,
        quantity: qty,
      },
    ];
    Axios.post(
      `${URL_API}/users/cart`,
      {
        items,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => {
      dispatch({
        type: "ADD_CART",
        payloads: { product_id, qty },
      });
    });
  };
};

export const removeCart = (product_id) => {};

export const recipeCart = (image) => {
  return {
    type: "ADD_RECIPE",
    payloads: image,
  };
};
