import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withSystems = connect(
  (state, ownProps) => ({
    systems: Selectors.Systems.getSystems(state, ownProps)
  })
)
export default withSystems(renderPropComponent)
