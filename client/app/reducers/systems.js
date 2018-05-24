import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'
import * as Actions from 'app/actions'

const initialState = Immutable.Map({
  systems: Immutable.Map()
})

const onFetchSuccess = (state, { systems }) =>
  state.set('systems', Immutable.Map(systems.map(system => ([
    system.system_id,
    Immutable.fromJS(system)
  ]))))

export default createReducer('systems', {
  [Actions.Data.fetchSystemsSuccess]: onFetchSuccess
}, initialState)
