import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Classnames from 'classnames'
import Maybe from 'app/utils/maybe'
import { withSystem } from 'app/containers/utility'

class MapSystem extends React.Component {
  static propTypes = {
    system: PropTypes.instanceOf(Immutable.Map),
    region_id: PropTypes.number,
    isActive: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func
  }
  state = {}

  static getDerivedStateFromProps ({ system, region }, prevState) {
    return {
      ...prevState,
      system: Maybe(system)
    }
  }

  onClick = (event) => {
    event.preventDefault()
    const { onClick, system } = this.props
    onClick && onClick(system)
  }

  render () {
    let { system } = this.state
    let { isActive, isSelected, region_id } = this.props

    return system.bind(system => {
      const className = Classnames('c-map-system', {
        'is-external': system.get('region_id') !== region_id,
        'is-active': isActive,
        'is-selected': isSelected
      })
      return (
        <div className={className} onClick={this.onClick}>
          <h6 className="c-map-system__title">{system.get('name')}</h6>
        </div>
      )
    })
  }
}

export default withSystem(MapSystem)
