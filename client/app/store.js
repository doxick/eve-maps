import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import Immutable from 'immutable'
import history from 'app/utils/history'
import { createMiddleware as createRouterMiddleware, initializeLocation } from 'redux-router'
import createSagaMiddleware from 'redux-saga'
import createReducer from 'app/reducers'
import { Patterns } from 'app/routes'

import rootSaga from './sagas'

export default function () {
  const preloadedState = Immutable.fromJS(window.__PRELOADED_STATE__ || {})

  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [
    createRouterMiddleware(history, Patterns),
    sagaMiddleware
  ]
  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    createReducer(),
    preloadedState,
    composeWithDevTools(...enhancers)
  )
  sagaMiddleware.run(rootSaga)
  store.dispatch(initializeLocation(history.location))

  return store
}
