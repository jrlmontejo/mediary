import { combineReducers } from 'redux'
import authReducer from './authReducer'
// import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  authReducer,
  // loginReducer
})

export default rootReducer