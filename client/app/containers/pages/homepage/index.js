import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Maybe from 'app/utils/maybe'
import { Map } from 'app/components'
import {
  withMap,
  withRegion,
  withConstellation,
  WithRegion,
  withLocation
} from 'app/containers/utility'
import { compose } from 'redux'
import Page from 'app/components/page'

class Homepage extends React.Component {
  static propTypes = {
    location: PropTypes.instanceOf(Immutable.Map),
    hasRadar: PropTypes.bool,
    doStartRadar: PropTypes.func,
    doStopRadar: PropTypes.func
  }

  render () {
    const prop = propName => v => v.get(propName)
    let location = Maybe(this.props.location)
    let region_id = location.bind(prop('region_id'))
    let constellation_id = location.bind(prop('constellation_id'))
    let system_id = location.bind(prop('system_id'))

    return (
      <Page>
        <Page.Sidebar>
          {!this.props.hasRadar
            ? <button className="btn btn-primary" onClick={this.props.doStartRadar}>Start radar</button>
            : <button className="btn btn-primary" onClick={this.props.doStopRadar}>Stop radar</button>
          }
        </Page.Sidebar>
        <Page.Body>
          <WithRegion
            region_id={region_id}
            render={({region}) => <h4>{Maybe(region).bind(prop('name'))}</h4>}
          />
          <ConnectedMap
            region_id={region_id}
            constellation_id={constellation_id}
            system_id={system_id}
          />
        </Page.Body>
      </Page>
    )
  }
}

export default withLocation(Homepage)

const ConnectedMap = compose(
  withMap,
  withRegion,
  withConstellation
)(Map)
