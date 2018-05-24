import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  regions: Immutable.Map()
})

const onFetchSuccess = (state, { regions }) =>
  state.set('regions', Immutable.Map(regions.map(region => ([
    region.region_id,
    Immutable.fromJS(region)
  ]))))

export default createReducer('regions', {
  [Actions.Data.fetchRegionsSuccess]: onFetchSuccess
}, initialState)
