import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'
import * as Actions from 'app/actions'

export const withLocation = connect(
  (state) => ({
    location: Selectors.Character.getLocation(state),
    hasRadar: Selectors.Character.hasRadar(state)
  }),
  (dispatch) => ({
    doStartRadar: seconds => dispatch(Actions.Character.startRadar(seconds)),
    doStopRadar: () => dispatch(Actions.Character.stopRadar())
  })
)

export default withLocation(renderPropComponent)
