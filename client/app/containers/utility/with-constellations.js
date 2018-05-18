import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withConstellations = connect(
  (state, ownProps) => ({
    constellations: Selectors.Constellations.getConstellations(state, ownProps)
  })
)
export default withConstellations(renderPropComponent)
