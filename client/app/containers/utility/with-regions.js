import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withRegions = connect(
  (state, ownProps) => ({
    regions: Selectors.Regions.getRegions(state, ownProps)
  })
)

export default withRegions(renderPropComponent)
