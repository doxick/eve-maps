import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Maps))
export const getMaps = state => getState(state).get('maps')
export const getMapByRegionId = (state, { region_id }) =>
  getMaps(state).get(Number(region_id))
