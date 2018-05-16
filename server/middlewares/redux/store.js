import { createStore, applyMiddleware, compose } from 'redux'
import createReducer from 'app/reducers'
import {createMemoryHistory as createHistory} from 'history'
import createRouterMiddleware from './createRouterMiddleware'
import Immutable from 'immutable'

import {Patterns} from 'app/routes'

const history = createHistory()
const middlewares = [
  createRouterMiddleware(history, Patterns)
]
const enhancers = compose(applyMiddleware(...middlewares))

const reducer = createReducer()

export default function(app) {
  app.use((req, res, next) => {
    res.locals.store = createStore(
      reducer,
      Immutable.Map(),
      enhancers
    )
    next()
  })
}
