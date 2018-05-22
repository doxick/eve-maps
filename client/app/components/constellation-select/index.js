import React from 'react'
import { withConstellations } from 'app/containers/utility'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Maybe from 'app/utils/maybe'

class ConstellationSelect extends React.Component {
  static propTypes = {
    constellations: PropTypes.instanceOf(Immutable.List),
    onChange: PropTypes.func,
    region_id: PropTypes.number,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }
  state = {}
  static getDerivedStateFromProps ({ constellations, region_id }, prevState) {
    return {
      ...prevState,
      constellations: Maybe(constellations)
        .map(constellations => region_id
          ? constellations.filter(constellation => constellation.get('region_id') === Number(region_id))
          : constellations
        ).map(constellations => constellations.sortBy(constellation => constellation.get('name')).toArray())
    }
  }
  onChange = (event) => {
    this.props.onChange(Number(event.target.value), event)
  }

  render () {
    let { label, name, value } = this.props
    let constellations = Maybe(this.state.constellations)
    return (
      <div className="form-group">
        {label && <label>{label} </label>}
        <select className="form-control" name={name} onChange={this.onChange} value={String(value)}>
          <option key={null} value="" />
          {constellations.bind(constellations => constellations.map(constellation => (
            <option key={constellation} value={constellation.get('constellation_id')}>{constellation.get('name')}</option>
          )))}
        </select>
      </div>
    )
  }
}

export default withConstellations(ConstellationSelect)
