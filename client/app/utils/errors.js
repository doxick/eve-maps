class HttpError extends Error {
  constructor (status, message, fields) {
    super(message)
    this.constructor = HttpError
    this.status = status
    this.fields = fields || {}
  }
}

HttpError.prototype = Error.prototype

class ValidationError extends HttpError {
  constructor (...args) {
    super(400, ...args)
    this.constructor = ValidationError
  }
}

ValidationError.prototype = HttpError.prototype

class AuthenticationError extends HttpError {
  constructor (...args) {
    super(401, ...args)
    this.constructor = AuthenticationError
  }
}

AuthenticationError.prototype = HttpError.prototype

class ApplicationError extends HttpError {
  constructor (...args) {
    super(500, ...args)
    this.constructor = ApplicationError
  }
}

ApplicationError.prototype = HttpError.prototype

const errorTypes = {
  400: ValidationError,
  401: AuthenticationError,
  500: ApplicationError
}

const create = ({ error: { code, message, errors } }) => {
  const ErrorClass = errorTypes[code]
  let fields = errors
    ? (
      errors.reduce((fields, error) => ({
        ...fields,
        [error.location]: error.message
      }), {})
    ) : undefined

  if (ErrorClass) {
    return new ErrorClass(message, fields)
  } else {
    return new HttpError(code, message, fields)
  }
}

export {
  create,
  HttpError,
  ValidationError,
  AuthenticationError,
  ApplicationError
}
