import Axios from 'axios'
import * as Errors from 'app/utils/errors'

const axios = Axios.create({
  baseURL: 'https://esi.evetech.net/latest'
})
const localAxios = Axios.create({
  baseURL: '/api'
})

const onResolve = response => response.data
const onReject = (error) => {
  const { response } = error
  if (!response) {
    error = new Errors.ApplicationError('Something went wrong with the server')
  } else {
    error = Errors.create(response.data)
  }
  return Promise.reject(error)
}

axios.interceptors.response.use(onResolve, onReject)
localAxios.interceptors.response.use(onResolve, onReject)

export default axios
export {
  localAxios
}
