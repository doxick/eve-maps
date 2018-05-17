import Axios from 'axios'
import * as Errors from 'app/utils/errors'

const axios = Axios.create({
  baseURL: '/api'
})

axios.interceptors.response.use(response => response.data, (error) => {
  const { response } = error
  if (!response) {
    error = new Errors.ApplicationError('Something went wrong with the server')
  } else {
    error = Errors.create(response.data)
  }
  return Promise.reject(error)
})

export default axios
