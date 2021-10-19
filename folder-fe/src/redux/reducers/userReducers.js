const INITIAL_STATE = {
    role_id: null,
    address: "",
    email: "",
    full_name: "",
    gender: "",
    user_id: "",
    username: "",

}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return { ...state, ...action.payload }
        case "GET_USER_PROFILE":
            return { ...state, ...action.payload }
        case "USER_LOGOUT":
            return INITIAL_STATE;
        default:
            return state
    }
}

