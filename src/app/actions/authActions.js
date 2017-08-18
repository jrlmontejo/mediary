import { client } from '../../config/stitch'
import errors from '../../config/errors'

export const SET_AUTH_STATUS = 'SET_AUTH_STATUS'
export const setAuthStatus = () => ({
  type: SET_AUTH_STATUS,
  authed: !!client.authedId()
})

export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = () => ({
  type: LOGIN_USER
})

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const loginUserSuccess = () => ({
  type: LOGIN_USER_SUCCESS
})

export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL'
export const loginUserFail = message => ({
  type: LOGIN_USER_FAIL,
  message
})

export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
})

export const login = (email, password) => dispatch => {
  dispatch(loginUser())

  return client.login(email, password)
  .then(res => {
    console.log(res)
    dispatch(loginUserSuccess())
    dispatch(setAuthStatus())
  })
  .catch(err => {
    console.log(err)
    dispatch(loginUserFail(errors.AUTH.LOGIN_ERROR))
    dispatch(setAuthStatus())
  })
}

export const logout = () => dispatch => {
  dispatch(logoutUser())

  return client.logout()
  .then(() => {
    dispatch(logoutUserSuccess())
    dispatch(setAuthStatus())
  })
}