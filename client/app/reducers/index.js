import { combineReducers } from 'redux-immutable'
import { routerReducer as Router } from 'redux-router'

export default function createReducer () {
  return combineReducers({
    [Router]: Router
  })
}

export {
  Router
}
