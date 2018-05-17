import axios from './axios'

export const fetchSystems = () => axios.get('/systems')
export const fetchConstellations = () => axios.get('/constellations')
export const fetchRegions = () => axios.get('/regions')
export const fetchMaps = () => axios.get('/maps')
