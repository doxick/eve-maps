import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  maps: Immutable.List()
})

const onFetchSuccess = (state, { maps }) =>
  state.set('maps', Immutable.fromJS(maps))

export default createReducer('maps', {
  [Actions.Data.fetchMapsSuccess]: onFetchSuccess
}, initialState)
