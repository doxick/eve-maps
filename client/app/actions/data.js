import { createActionsDomain } from 'redux-helpers'

const createActions = createActionsDomain('data')

export const [
  fetchSystems,
  fetchSystemsRequest,
  fetchSystemsSuccess,
  fetchSystemsFail
] = createActions('systems', {
  init: () => {},
  request: () => {},
  success: (systems) => ({ systems }),
  fail: (error) => ({ error })
})

export const [
  fetchConstellations,
  fetchConstellationsRequest,
  fetchConstellationsSuccess,
  fetchConstellationsFail
] = createActions('constellations', {
  init: () => {},
  request: () => {},
  success: (constellations) => ({ constellations }),
  fail: (error) => ({ error })
})

export const [
  fetchRegions,
  fetchRegionsRequest,
  fetchRegionsSuccess,
  fetchRegionsFail
] = createActions('regions', {
  init: () => {},
  request: () => {},
  success: (regions) => ({ regions }),
  fail: (error) => ({ error })
})

export const [
  fetchMaps,
  fetchMapsRequest,
  fetchMapsSuccess,
  fetchMapsFail
] = createActions('maps', {
  init: () => {},
  request: () => {},
  success: (maps) => ({ maps }),
  fail: (error) => ({ error })
})
