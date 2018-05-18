import { createPattern } from 'redux-router'

export const Homepage = createPattern('/(:region_id(/:constellation_id(/:system_id)))')
