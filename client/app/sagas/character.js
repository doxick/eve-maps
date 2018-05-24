import { delay } from 'redux-saga'
import { call, put, race, take, takeLatest, select } from 'redux-saga/effects'

import * as Selectors from 'app/selectors'
import * as Actions from 'app/actions'
import * as Api from 'app/utils/api'

export default function * characterSaga () {
  console.log('characterSaga initialized')

  yield takeLatest(Actions.Character.startRadar, onStartRadar)
  yield takeLatest(Actions.Character.fetchLocation, onFetchLocation)
}

function * onStartRadar ({seconds}) {
  let hasScopes = yield select(Selectors.Character.hasScopes, ['esi-location.read_location.v1'])
  seconds = Math.max(Number(seconds || 0), 10)
  if (!hasScopes) {
    yield put(Actions.Character.authenticate('esi-location.read_location.v1'))
    const { fail } = yield race({
      success: take(Actions.Character.authenticateSuccess),
      fail: take(Actions.Character.authenticateFail)
    })
    if (fail) {
      return
    }
  }
  yield put(Actions.Character.startRadarSuccess())
  while (true) {
    yield put(Actions.Character.fetchLocation())
    const { success } = yield race({
      success: call(delay, seconds * 1000),
      fail: take(Actions.Character.authenticateExpired),
      fail2: take(Actions.Character.stopRadar)
    })
    if (!success) {
      break
    }
  }
  yield put(Actions.Character.stopRadarSuccess())
}

function * onFetchLocation () {
  yield put(Actions.Character.fetchLocationRequest())
  try {
    let characterId = yield select(Selectors.Character.getCharacterId)
    if (!characterId) {
      throw new Error()
    }
    let { solar_system_id } = yield call(Api.Character.fetchLocation, characterId)
    let system = yield select(Selectors.Systems.getSystemById, { system_id: solar_system_id })
    yield put(Actions.Character.fetchLocationSuccess(system.toJS()))
  } catch (error) {
    yield put(Actions.Character.fetchLocationFail(error))
  }
}
