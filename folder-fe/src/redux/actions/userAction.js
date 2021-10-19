export const getUserdata = (data) => {
    return {
        type: 'GET_USER_DATA',
        payload: data
    }
}

export const getUserProfile = (data) => {
    console.log(data, "inii data di actionnn")
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