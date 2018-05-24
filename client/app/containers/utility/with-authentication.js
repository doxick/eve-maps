import { connect } from 'react-redux'
import { renderPropComponent } from 'app/utils/react'
import * as Selectors from 'app/selectors'
import * as Actions from 'app/actions'

export const withAuthentication = connect(
  (state, { scopes = [] }) => ({
    isAuthenticated: Selectors.Character.getCharacterId(state) && Selectors.Character.hasScopes(state, scopes),
    character: Selectors.Character.getInfo(state)
  }),
  (dispatch, { scopes = [] }) => ({
    doAuthenticate: () => dispatch(Actions.Character.authenticate(...scopes))
  })
)

export default withAuthentication(renderPropComponent)
