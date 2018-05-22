import React from 'react'
import { compose } from 'redux'
import { withMaps, withRegions } from 'app/containers/utility'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Maybe from 'app/utils/maybe'

class RegionSelect extends React.Component {
  static propTypes = {
    maps: PropTypes.instanceOf(Immutable.List),
    regions: PropTypes.instanceOf(Immutable.List),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }
  state = {}
  static getDerivedStateFromProps ({ regions, maps }, prevState = {}) {
    return {
      ...prevState,
      regions: Maybe(regions)
        .map(regions => maps
          ? regions.filter(region => maps.find(map => map.get('region_id') === region.get('region_id')))
          : regions
        ).map(regions => regions.sortBy(region => region.get('name')).toArray())
    }
  }

  onChange = (event) => {
    this.props.onChange(Number(event.target.value), event)
  }

  render () {
    let { label, name, value } = this.props
    let regions = Maybe(this.state.regions)
    return (
      <div className="form-group">
        {label && <label>{label} </label>}
        <select className="form-control" name={name} onChange={this.onChange} value={String(value)}>
          <option key={null} value="" />
          {regions.bind(regions => regions.map(region => (
            <option key={region} value={region.get('region_id')}>{region.get('name')}</option>
          )))}
        </select>
      </div>
    )
  }
}

export default compose(withMaps, withRegions)(RegionSelect)
