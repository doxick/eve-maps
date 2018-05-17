import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  regions: Immutable.List()
})

const onFetchSuccess = (state, { regions }) =>
  state.set('regions', Immutable.fromJS(regions))

export default createReducer('regions', {
  [Actions.Data.fetchRegionsSuccess]: onFetchSuccess
}, initialState)
