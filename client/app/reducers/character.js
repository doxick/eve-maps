import { createReducer } from 'redux-helpers'
import Immutable from 'immutable'

import * as Actions from 'app/actions'

const initialState = Immutable.Map()

const onFetchInfoSuccess = (state, {info}) => state.set('info', Immutable.fromJS(info))
const onFetchLocationSuccess = (state, {location}) => state.set('location', Immutable.fromJS(location))
const onAuthenticateExpired = (state) => state

const onStartRadarSuccess = state => state.set('radar', true)
const onStopRadarSuccess = state => state.set('radar', false)

export default createReducer('character', {
  [Actions.Character.verifySuccess]: onFetchInfoSuccess,
  [Actions.Character.authenticateExpired]: onAuthenticateExpired,
  [Actions.Character.fetchLocationSuccess]: onFetchLocationSuccess,
  [Actions.Character.startRadarSuccess]: onStartRadarSuccess,
  [Actions.Character.stopRadarSuccess]: onStopRadarSuccess
}, initialState)
