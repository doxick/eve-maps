import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withMaps = connect(
  (state, ownProps) => ({
    maps: Selectors.Maps.getMaps(state, ownProps)
  })
)
export default withMaps(renderPropComponent)
