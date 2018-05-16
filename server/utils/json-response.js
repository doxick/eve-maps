const baseJson = {
  apiVersion: process.env.npm_package_version
}

const object = (data) => ({
  ...baseJson,
  data
})
const array = (array) => ({
  ...baseJson,
  data: {
    items: array,
    totalItems: array.length
  }
})

const error = (error) => ({
  ...baseJson,
  error: {
    code: error.status || 500,
    message: error.message || 'Server went whoopsie',
    errors: error.fields && Object.keys(error.fields).length
      ? (
        Object.entries(error.fields).map(([location, message]) => ({
          location,
          message: String(message)
        }))
      ) : undefined
  }
})

export default (json) => function (obj) {
  if (obj instanceof Error) {
    json.call(this, error(obj))
  } else if (obj instanceof Array) {
    json.call(this, array(obj))
  } else {
    json.call(this, object(obj))
  }
}
