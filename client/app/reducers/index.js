import { combineReducers } from 'redux-immutable'
import { routerReducer as Router } from 'redux-router'

import Constellations from './consellations'
import Systems from './systems'
import Regions from './regions'
import Maps from './maps'

export default function createReducer () {
  return combineReducers({
    [Router]: Router,
    [Constellations]: Constellations,
    [Systems]: Systems,
    [Regions]: Regions,
    [Maps]: Maps
  })
}

export {
  Router,
  Constellations,
  Systems,
  Regions,
  Maps
}
