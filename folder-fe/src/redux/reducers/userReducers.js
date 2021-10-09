const INITIAL_STATE = {
  userData: {},

}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return { ...state, userData: action.payload }

        default:
            return state
    }
}