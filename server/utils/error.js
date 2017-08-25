const errorCodes = {
  SERVER_ERROR: 'There is an error with the server',
  USER_NOT_FOUND: 'User does not exist on the database',
  INVALID_PASSWORD: 'User supplied an invalid password',
  AUTH_REQUIRED: 'Authorization header required',
  INVALID_AUTH_TYPE: 'Invalid authorization type supplied in Authorization header',
  INVALID_AUTH_TOKEN: 'Invalid token supplied in Authorization header',
  USER_ALREADY_EXISTS: 'A user with that email already exists',
  SAVE_FAILED: 'Unable to save/update because of validation errors'
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