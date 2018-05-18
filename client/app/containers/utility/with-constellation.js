import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withConstellation = connect(
  (state, ownProps) => ({
    constellation: Selectors.Constellations.getConstellationById(state, ownProps)
  })
)
export default withConstellation(renderPropComponent)
