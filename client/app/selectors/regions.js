import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Regions))
export const getRegions = state => getState(state).get('regions')
export const getRegionById = (state, { region_id }) =>
  getRegions(state).get(Number(region_id))
