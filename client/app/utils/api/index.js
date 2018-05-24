import axios, {localAxios} from './axios'

export const Systems = {
  fetch: () => localAxios.get('/systems')
}
export const Constellations = {
  fetch: () => localAxios.get('/constellations')
}
export const Regions = {
  fetch: () => localAxios.get('/regions')
}
export const Maps = {
  fetch: () => localAxios.get('/maps')
}
export const Character = {
  verify: () => axios.get('https://esi.tech.ccp.is/verify/'),
  fetchLocation: characterId => axios.get(`/characters/${characterId}/location/`)
}
export const setAccessToken = (accessToken) => {
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`
}
export const removeAccessToken = () => {
  axios.defaults.headers.Authorization = undefined
}
