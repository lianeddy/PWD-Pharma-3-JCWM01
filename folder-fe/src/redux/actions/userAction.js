export const getUserdata = (data) => {
    return {
        type: 'GET_USER_DATA',
        payload: data
    }
}

export const getUserProfile = (data) => {
    return {
        type: 'GET_USER_PROFILE',
        payload: data
    }
}

export const logoutUser = () => {
    return {
        type: 'USER_LOGOUT'
    }
}