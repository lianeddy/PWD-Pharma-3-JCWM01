const INITIAL_STATE = {
    userData: {
        role_id: '',
        address: "",
        email: "",
        full_name: "",
        gender: "",
        user_id: "",
        username: "",
    },

}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return { ...state, userData: action.payload }
        case "API_USER_FAILED":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "API_USER_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "LOGIN":
            return {
                ...state,
                ...action.payload,
            };
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
       
    }
}

