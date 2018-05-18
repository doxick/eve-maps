import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Constellations))
export const getConstellations = state => getState(state).get('constellations')
export const getConstellationById = (state, { constellation_id }) =>
  getConstellations(state).find(constellation => Number(constellation.get('constellation_id')) === Number(constellation_id))
