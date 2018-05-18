import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withMap = connect(
  (state, ownProps) => ({
    map: Selectors.Maps.getMapByRegionId(state, ownProps)
  })
)
export default withMap(renderPropComponent)
