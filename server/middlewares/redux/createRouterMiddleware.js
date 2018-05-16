import * as Router from 'redux-router'
import Url from 'url'

export default (history, patterns) => (store) => {
  const afterNavigate = () => {
    let payload = Router.parseLocation(history.location, patterns)
    store.dispatch(Router.locationChanged({...history.location}, payload))
  }

  return (next) => (action) => {
    switch (action.type) {
      case Router.push.toString():
        history.push(action.payload)
        afterNavigate()
        break
      case Router.replace.toString():
        history.replace(action.payload)
        afterNavigate()
        break
      case Router.go.toString():
        history.go(action.payload)
        afterNavigate()
        break
      case Router.back.toString():
        history.goBack()
        afterNavigate()
        break
      case Router.forward.toString():
        history.goForward()
        afterNavigate()
        break
      case Router.initializeLocation.toString():
        history.replace(Url.format(action.location))
        afterNavigate()
        break
      default:
        break
    }
    return next(action)
  }
}
