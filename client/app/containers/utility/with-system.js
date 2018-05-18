import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withSystem = connect(
  (state, ownProps) => ({
    system: Selectors.Systems.getSystemById(state, ownProps)
  })
)
export default withSystem(renderPropComponent)
