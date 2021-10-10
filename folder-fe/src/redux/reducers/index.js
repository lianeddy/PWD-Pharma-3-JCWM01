import { combineReducers } from 'redux'
import { authReducer } from './loginReducers'
import { userReducer } from './userReducers'


export const Reducers = combineReducers({
    authReducer,
    userReducer
})