import Axios from "axios";
import { Provider } from "react-redux";
import { URL_API } from "helper/helper";

export const registerHandler = (state) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, {
      ...state,
      role: "user",
    })
      .then((result) => {
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payloads: result.data,
        });
      })
      .catch(() => {
        alert("Not nice");
      });
  };
};
export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
      },
    })
      .then((res) => {
        if (res.data.length) {
          if (password === res.data[0].password) {
            delete res.data[0].password;
            localStorage.setItem("userDataEmerce", JSON.stringify(res.data[0]));
            dispatch({
              type: "USER_LOGIN",
              payloads: res.data[0],
            });
          } else {
            dispatch({
              type: "USER_ERROR",
              payloads: "Wrong password",
            });
          }
        } else {
          dispatch({
            type: "USER_ERROR",
            payloads: "User not found",
          });
        }
        console.log(res.data);
      })
      .catch((err) => {});
  };
};
export const logoutUser = () => {
  localStorage.removeItem("userDataEmerce");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    }).then((res) => {
      localStorage.setItem("userDataEmerce", JSON.stringify(res.data[0]));
      dispatch({
        type: "USER_LOGIN",
        payloads: res.data[0],
      });
    });
  };
};
export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
