const errorCodes = {
  SERVER_ERROR: 'There is an error with the server',
  USER_NOT_FOUND: 'User does not exist on the database',
  INVALID_PASSWORD: 'User supplied an invalid password'
}

module.exports = errorCode => {
  const code = errorCodes.hasOwnProperty(errorCode) ? errorCode : 'SERVER_ERROR'
  const message = errorCodes[code]

  return { code, message }
}