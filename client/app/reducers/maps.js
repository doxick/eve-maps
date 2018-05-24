import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  maps: Immutable.Map()
})

const onFetchSuccess = (state, { maps }) =>
  state.set('maps', Immutable.Map(maps.map(map => ([
    map.region_id,
    Immutable.fromJS(map)
  ]))))

export default createReducer('maps', {
  [Actions.Data.fetchMapsSuccess]: onFetchSuccess
}, initialState)
