import { put, call, takeLatest } from 'redux-saga/effects'
import * as Actions from 'app/actions'
import * as Api from 'app/utils/api'

export default function * dataSaga () {
  yield takeLatest(Actions.Data.fetchConstellations, onFetchConstellations)
  yield takeLatest(Actions.Data.fetchSystems, onFetchSystems)
  yield takeLatest(Actions.Data.fetchRegions, onFetchRegions)
  yield takeLatest(Actions.Data.fetchMaps, onFetchMaps)

  yield put(Actions.Data.fetchConstellations())
  yield put(Actions.Data.fetchSystems())
  yield put(Actions.Data.fetchRegions())
  yield put(Actions.Data.fetchMaps())
}

function * onFetchConstellations () {
  yield put(Actions.Data.fetchConstellationsRequest())
  try {
    let { data } = yield call(Api.Constellations.fetch)
    yield put(Actions.Data.fetchConstellationsSuccess(data.items))
  } catch (error) {
    yield put(Actions.Data.fetchConstellationsFail(error))
  }
}

function * onFetchSystems () {
  yield put(Actions.Data.fetchSystemsRequest())
  try {
    let { data } = yield call(Api.Systems.fetch)
    yield put(Actions.Data.fetchSystemsSuccess(data.items))
  } catch (error) {
    yield put(Actions.Data.fetchSystemsFail(error))
  }
}

function * onFetchRegions () {
  yield put(Actions.Data.fetchRegionsRequest())
  try {
    let { data } = yield call(Api.Regions.fetch)
    yield put(Actions.Data.fetchRegionsSuccess(data.items))
  } catch (error) {
    yield put(Actions.Data.fetchRegionsFail(error))
  }
}

function * onFetchMaps () {
  yield put(Actions.Data.fetchMapsRequest())
  try {
    let { data } = yield call(Api.Maps.fetch)
    yield put(Actions.Data.fetchMapsSuccess(data.items))
  } catch (error) {
    yield put(Actions.Data.fetchMapsFail(error))
  }
}
