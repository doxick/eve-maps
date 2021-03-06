import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Systems))
export const getSystems = state => getState(state).get('systems')
export const getSystemById = (state, { system_id }) =>
  getSystems(state).get(Number(system_id))
