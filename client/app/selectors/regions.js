import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Regions))
export const getRegions = state => getState(state).get('regions')
export const getRegionById = (state, { region_id }) =>
  getRegions(state).find(region => Number(region.get('region_id')) === Number(region_id))
