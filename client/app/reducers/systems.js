import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  systems: Immutable.List()
})

const onFetchSuccess = (state, { systems }) =>
  state.set('systems', Immutable.fromJS(systems))

export default createReducer('systems', {
  [Actions.Data.fetchSystemsSuccess]: onFetchSuccess
}, initialState)
