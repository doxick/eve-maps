import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Maybe from 'app/utils/maybe'
import { withRegion, withSystem } from 'app/containers/utility'
import MapSystem from 'app/components/map-system'
import { compose } from 'redux'

class Map extends React.Component {
  static propTypes = {
    map: PropTypes.instanceOf(Immutable.Map),
    region: PropTypes.instanceOf(Immutable.Map),
    constellation: PropTypes.instanceOf(Immutable.Map),
    system_id: PropTypes.number,
    onClickSystem: PropTypes.func
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
    return map.bind(map => (
      <div className="c-map">
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
    return (
      <div key={`system-${system_id}`} className="c-map__system" style={{ left: `${x}%`, top: `${y}%` }}>
        <ConnectedMapSystem
          system_id={system_id}
          region_id={region_id}
          isActive={isActive}
          isSelected={system_id === this.props.system_id}
          onClick={this.onClickSystem}
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

const ConnectedMapSystem = compose(withRegion, withSystem)(MapSystem)
