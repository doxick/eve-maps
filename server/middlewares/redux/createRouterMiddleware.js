import * as Router from 'redux-router'
import Url from 'url'

export default (history, patterns) => (store) => {
  const afterNavigate = () => {
    let payload = Router.parseLocation(history.location, patterns)
    store.dispatch(Router.locationChanged({...history.location}, payload))
  }

  return (next) => (action) => {
    switch (action.type) {
      case String(Router.push):
        history.push(action.payload)
        afterNavigate()
        break
      case String(Router.replace):
        history.replace(action.payload)
        afterNavigate()
        break
      case String(Router.go):
        history.go(action.payload)
        afterNavigate()
        break
      case String(Router.back):
        history.goBack()
        afterNavigate()
        break
      case String(Router.forward):
        history.goForward()
        afterNavigate()
        break
      case String(Router.initializeLocation):
        history.replace(Url.format(action.location))
        afterNavigate()
        break
      default:
        break
    }
    return next(action)
  }
}
