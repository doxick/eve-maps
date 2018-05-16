import {initializeLocation} from 'redux-router'
import Url from 'url'

export default function(app) {
  app.use((req, res, next) => {
    res.locals.store.dispatch(initializeLocation(Url.parse(req.url)))
    next()
  })
}
