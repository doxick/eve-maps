import { delay } from 'redux-saga'
import { call, fork, put, race, take, takeEvery, select } from 'redux-saga/effects'
import { locationChanged } from 'redux-router'
import * as Patterns from 'app/routes/patterns'
import * as Actions from 'app/actions'
import * as Selectors from 'app/selectors'

import * as Api from 'app/utils/api'

export default function * authenticateSaga () {
  console.log('authenticateSaga initialized')
  if (window.opener) {
    yield takeEvery(locationChanged, onLocationChanged)
    return
  }

  yield fork(authenticateLoop)
  yield takeEvery(Actions.Character.authenticateSuccess, onAuthenticateSuccess)
  yield takeEvery(Actions.Character.verify, onVerify)
}

function * onLocationChanged ({ payload }) {
  if (payload.pattern === Patterns.AuthenticateCallback) {
    window.opener.window.AuthenticateSSOCallback(payload.hash)
    window.close()
  }
}

function * authenticateLoop () {
  while (true) {
    const action = yield take(Actions.Character.authenticate)
    const scopes = yield select(Selectors.Character.getScopes)

    const query = {
      response_type: 'token',
      client_id: process.env.SSO_CLIENT_ID,
      redirect_uri: process.env.SSO_CALLBACK_URL,
      scope: [...scopes, ...action.scopes].join(',')
    }
    const url = process.env.SSO_URL + '?' + Object.entries(query).map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)].join('=')).join('&')
    const popup = window.open(url, 'nano-sso', 'width=610,height=610')

    const { success } = yield race({
      success: call(waitForAuthenticate),
      fail: call(waitForWindowClose, popup)
    })
    window.AuthenticateSSOCallback = undefined

    if (success) {
      yield put(Actions.Character.authenticateSuccess(success))
      yield take(Actions.Character.authenticateExpired)
    } else {
      yield put(Actions.Character.authenticateFail())
    }
  }
}

function * waitForWindowClose (window) {
  while (!window.closed) {
    yield call(delay, 50)
  }
  return true
}

async function waitForAuthenticate () {
  return new Promise(resolve => {
    window.AuthenticateSSOCallback = (payload) => resolve(payload)
  })
}

function * onAuthenticateSuccess ({ payload }) {
  yield call(Api.setAccessToken, payload.access_token)
  yield put(Actions.Character.verify())
  yield race([
    call(delay, payload.expires_in * 1000),
    take(Actions.Character.verifyFail)
  ])
  yield put(Actions.Character.authenticateExpired())
  yield call(Api.removeAccessToken)
}

function * onVerify () {
  yield put(Actions.Character.verifyRequest())
  try {
    const data = yield call(Api.Character.verify)
    yield put(Actions.Character.verifySuccess(data))
  } catch (error) {
    yield put(Actions.Character.verifyFail(error))
  }
}
