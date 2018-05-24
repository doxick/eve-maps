import { createActionsDomain } from 'redux-helpers'

const createActions = createActionsDomain('character')

export const [
  authenticate,
  authenticateSuccess,
  authenticateFail,
  authenticateExpired
] = createActions('authenticate', {
  init: (...scopes) => ({ scopes }),
  success: (payload) => ({ payload }),
  fail: () => {},
  expired: () => {}
})

export const [
  verify,
  verifyRequest,
  verifySuccess,
  verifyFail
] = createActions('verify', {
  init: () => {},
  request: () => {},
  success: (info) => ({ info }),
  fail: (error) => ({ error })
})

export const [
  fetchLocation,
  fetchLocationRequest,
  fetchLocationSuccess,
  fetchLocationFail
] = createActions('location/fetch', {
  init: () => {},
  request: () => {},
  success: (location) => ({ location }),
  fail: (error) => ({ error })
})

export const [
  startRadar,
  startRadarSuccess,
  stopRadar,
  stopRadarSuccess
] = createActions('radar', {
  start: (second) => ({second}),
  startSuccess: () => {},
  stop: () => {},
  stopSuccess: () => {}
})
