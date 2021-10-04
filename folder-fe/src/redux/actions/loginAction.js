export const authLogin = (data) => {
    console.log('Data masuk Action dari component :', data)
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    }
}