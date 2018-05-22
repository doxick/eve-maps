import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Maybe from 'app/utils/maybe'
import { withRegion, withSystem } from 'app/containers/utility'
import MapSystem from 'app/components/map-system'
import { compose } from 'redux'
import Classnames from 'classnames'

class Map extends React.Component {
  static propTypes = {
    map: PropTypes.instanceOf(Immutable.Map),
    region: PropTypes.instanceOf(Immutable.Map),
    constellation: PropTypes.instanceOf(Immutable.Map),
    system_id: PropTypes.number,
    onClickSystem: PropTypes.func,
    systemComponent: PropTypes.func,

    isSmall: PropTypes.bool
  }
  static defaultProps = {
    systemComponent: compose(withRegion, withSystem)(MapSystem)
  }
  state = {}

  static getDerivedStateFromProps ({ map, region, constellation }, prevState) {
    return {
      ...prevState,
      map: Maybe(map),
      region: Maybe(region),
      constellation: Maybe(constellation),
      activeSystems: Maybe(constellation).map(constellation => constellation.get('systems'))
    }
  }

  onClickSystem = (system) => {
    const {onClickSystem} = this.props
    onClickSystem && onClickSystem(system)
  }

  render () {
    let { map } = this.state
    let { isSmall } = this.props
    return map.bind(map => (
      <div className={Classnames('c-map', isSmall && 'c-map--small')}>
        {map.get('systems').toArray().map(this.renderSystem)}
        <svg viewBox="0 0 1024 768" className="c-map__gates">
          {map.get('gates').toArray().map(this.renderGate)}
        </svg>
      </div>
    ))
  }

  renderSystem = (system) => {
    let x = system.get('x') / 10.24
    let y = system.get('y') / 7.68
    let system_id = system.get('system_id')
    let { region, activeSystems } = this.state
    let isActive = Boolean(activeSystems.bind(systems => systems.includes(system_id)))
    let region_id = region.bind(region => region.get('region_id'))
    let SystemComponent = this.props.systemComponent
    return (
      <div key={`system-${system_id}`} className="c-map__system" style={{ left: `${x}%`, top: `${y}%` }}>
        <SystemComponent
          system_id={system_id}
          region_id={region_id}
          isActive={isActive}
          isSelected={system_id === this.props.system_id}
          onClick={this.onClickSystem}
          className="testing"
        />
      </div>
    )
  }
  renderGate = (gate) => {
    const map = this.props.map
    const systems = map.get('systems')
    const from_id = gate.get(0)
    const to_id = gate.get(1)
    let from = systems.find(system => system.get('system_id') === from_id)
    let to = systems.find(system => system.get('system_id') === to_id)
    return (
      <line
        key={`gate-${from_id}-${to_id}`}
        className="c-map__gate"
        x1={from.get('x')}
        y1={from.get('y')}
        x2={to.get('x')}
        y2={to.get('y')}
      />
    )
  }
}

export default Map
