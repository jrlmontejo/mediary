import { Map } from 'immutable'
import {
  SET_AUTH_STATUS,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS
} from '../actions'

const initialState = Map({
  authed: false,
  login: Map({
    loading: false,
    message: ''
  }),
  logout: Map({
    loading: false,
    message: ''
  })
})

const setAuthStatus = (state, authed) => (
  state.merge({ authed })
)

const loginUser = state => (
  state.mergeDeep({
    login: {
      loading: true,
      message: ''
    }
  })
)

const loginUserSuccess = state => (
  state.setIn([ 'login', 'loading' ], false)
)

// TODO: Display error message
const loginUserFail = (state, message) => (
  state.mergeDeep({
    login: {
      loading: false,
      message: message
    }
  })
)

const logoutUser = state => (
  state.setIn([ 'logout', 'loading' ], true)
)

const logoutUserSuccess = state => (
  state.setIn([ 'logout', 'loading' ], false)
)

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_STATUS:
      return setAuthStatus(state, action.authed)

    case LOGIN_USER:
      return loginUser(state)
    case LOGIN_USER_SUCCESS:
      return loginUserSuccess(state)
    case LOGIN_USER_FAIL:
      return loginUserFail(state, action.message)

    case LOGOUT_USER:
      return logoutUser(state)
    case LOGOUT_USER_SUCCESS:
      return logoutUserSuccess(state)

    default:
      return state
  }
}

export default authReducer