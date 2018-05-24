import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  constellations: Immutable.Map()
})

const onFetchSuccess = (state, { constellations }) =>
  state.set('constellations', Immutable.Map(constellations.map(constellation => ([
    constellation.constellation_id,
    Immutable.fromJS(constellation)
  ]))))

export default createReducer('constellations', {
  [Actions.Data.fetchConstellationsSuccess]: onFetchSuccess
}, initialState)
