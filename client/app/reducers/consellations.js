import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  constellations: Immutable.List()
})

const onFetchSuccess = (state, { constellations }) =>
  state.set('constellations', Immutable.fromJS(constellations))

export default createReducer('constellations', {
  [Actions.Data.fetchConstellationsSuccess]: onFetchSuccess
}, initialState)
