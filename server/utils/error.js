const errorCodes = {
  DB_CONNECTION_ERROR: 'Cannot establish a connection with the database',
  SERVER_ERROR: 'There is an error with the server',
  NOT_FOUND: 'This entry does not exist in the database',
  INVALID_PASSWORD: 'User supplied an invalid password',
  AUTH_REQUIRED: 'Authorization header required',
  INVALID_AUTH_TYPE: 'Invalid authorization type supplied in Authorization header',
  INVALID_AUTH_TOKEN: 'Invalid token supplied in Authorization header',
  AUTH_TOKEN_EXPIRED: 'Token supplied in Authorization header is expired',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token or refresh token might be expired',
  USER_ALREADY_EXISTS: 'A user with that email already exists',
  INVALID_REQUEST: 'There are invalid or missing parameters on your request',
  SAVE_FAILED: 'Unable to save/update because of validation errors',
  UNAUTHORIZED: 'Your user role is not permitted to perform this action'
}

module.exports = (errorCode = '', errorList = null) => {
  const code = errorCode && errorCodes.hasOwnProperty(errorCode) ? errorCode : 'SERVER_ERROR'
  const message = errorCodes[code]

  let errors = null

  if (errorList) {
    errors = {}

    Object.keys(errorList).forEach(prop => {
      errors[prop] = errorList[prop].message
    })
  }

  return { code, message, errors }
}