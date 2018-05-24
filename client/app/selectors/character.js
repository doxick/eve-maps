import * as Reducers from 'app/reducers'

export const getState = state => state.get(String(Reducers.Character))
export const getInfo = (state) => getState(state).get('info')
export const getCharacterId = (state) => {
  const info = getInfo(state)
  return info ? info.get('CharacterID') : null
}
export const getScopes = (state) => {
  const info = getInfo(state)
  return info ? info.get('Scopes').split(' ').filter(Boolean) : []
}
export const hasScopes = (state, scopes) => {
  const _scopes = getScopes(state)
  return (!scopes.some(scope => !_scopes.includes(scope)))
}

export const getLocation = (state) => getState(state).get('location')
export const getSolarSystem = state => {
  let location = getLocation(state)
  return location ? location.get('solar_system_id') : undefined
}

export const hasRadar = state => getState(state).get('radar')
