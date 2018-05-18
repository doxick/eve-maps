import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Router))
export const getParams = state => getState(state).params
