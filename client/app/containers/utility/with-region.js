import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withRegion = connect(
  (state, ownProps) => ({
    region: Selectors.Regions.getRegionById(state, ownProps)
  })
)

export default withRegion(renderPropComponent)
