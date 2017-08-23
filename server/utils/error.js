const errorCodes = {
  SERVER_ERROR: 'There is an error with the server',
  USER_NOT_FOUND: 'User does not exist on the database',
  INVALID_PASSWORD: 'User supplied an invalid password',
  AUTH_REQUIRED: 'Authorization header required',
  INVALID_AUTH_TYPE: 'Invalid authorization type supplied in Authorization header',
  INVALID_AUTH_TOKEN: 'Invalid token supplied in Authorization header'
}

module.exports = (errorCode = '') => {
  const code = errorCode && errorCodes.hasOwnProperty(errorCode) ? errorCode : 'SERVER_ERROR'
  const message = errorCodes[code]

  return { code, message }
}