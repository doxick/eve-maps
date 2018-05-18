import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'

export const withRouteParams = connect(
  (state, ownProps) => Selectors.Router.getParams(state) || {}
)
export default withRouteParams(renderPropComponent)
