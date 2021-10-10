const INITIAL_STATE = {
    userData: {
        role_id: '',
        address: "Vila",
        email: "pramptrbgs@gmail.com",
        full_name: "Putra Pram",
        gender: "Male",
        user_id: 1,
        username: "pram",
    },

}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return { ...state, userData: action.payload }

        default:
            return state
    }
}