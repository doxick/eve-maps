import { fork } from 'redux-saga/effects'

import dataSaga from './data'
import characterSaga from './character'
import authenticateSaga from './authenticate'

export default function * rootSaga () {
  yield fork(authenticateSaga)
  yield fork(dataSaga)
  yield fork(characterSaga)
}
