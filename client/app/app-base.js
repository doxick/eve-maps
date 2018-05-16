import React, { Component } from 'react'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import Routes from 'app/routes'
import ModalManager from 'app/components/modal-manager'

class AppBase extends Component {
  static propTypes = {
    store: PropTypes.object
  }

  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <React.Fragment>
          <ModalManager />
          <Routes />
        </React.Fragment>
      </Provider>

    )
  }
}

export default AppBase
