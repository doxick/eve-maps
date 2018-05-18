import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Classnames from 'classnames'
import Maybe from 'app/utils/maybe'
import { WithSystem, WithConstellation } from 'app/containers/utility'
import { Link } from 'redux-router'
import * as Patterns from 'app/routes/patterns'

class MapSystem extends React.Component {
  static propTypes = {
    system: PropTypes.instanceOf(Immutable.Map),
    region: PropTypes.instanceOf(Immutable.Map),
    isActive: PropTypes.bool
  }
  state = {}

  static getDerivedStateFromProps ({ system, region }, prevState) {
    return {
      ...prevState,
      system: Maybe(system),
      region: Maybe(region)
    }
  }

  render () {
    let { system, region } = this.state
    let { isActive } = this.props
    let isExternal = !system.bind(s => region.bind(r => r.get('constellations').includes(s.get('constellation_id'))))
    return system.bind(system => (
      <WithSystem
        system_id={system.get('system_id')}
        render={({ system }) => Maybe(system).bind(system =>
          <WithConstellation
            constellation_id={system.get('constellation_id')}
            render={({ constellation }) => Maybe(constellation).bind(constellation =>
              <Link
                href={Patterns.Homepage}
                query={{
                  region_id: constellation.get('region_id'),
                  constellation_id: constellation.get('constellation_id')
                }}
                className={Classnames('c-map-system', {
                  'c-map-system--external': isExternal,
                  'is-active': isActive
                })}
              >
                <h6 className="c-map-system__title">{system.get('name')}</h6>
              </Link>
            )}
          />
        )}
      />
    ))
  }
}

export default MapSystem
