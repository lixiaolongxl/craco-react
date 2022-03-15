import { combineReducers } from 'redux'
// import reducer from './countReducer'
import countReducer from './countReducer'
import userReducer from './userReducer'

export const reducer = combineReducers({
    // countReducer: countReducer,
    userReducer:userReducer
})