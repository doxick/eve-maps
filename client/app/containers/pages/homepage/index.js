import React from 'react'
import { Map } from 'app/components'
import {
  withMap,
  withRegion,
  withRegions,
  withMaps,
  withConstellation,
  withConstellations,
  withRouteParams
} from 'app/containers/utility'
import { compose } from 'redux'
import Page from 'app/components/page'

class Homepage extends React.Component {
  state = {
    region_id: 10000029,
    constellation_id: undefined
  }

  static getDerivedStateFromProps ({ region_id, constellation_id, system_id }, prevState) {
    return {
      ...prevState,
      region_id: Number(region_id),
      constellation_id: Number(constellation_id)
    }
  }

  onChangeRegion = ({ target }) => {
    this.setState({
      region_id: Number(target.value)
    })
  }
  onChangeConstellation = ({ target }) => {
    this.setState({
      constellation_id: Number(target.value)
    })
  }

  render () {
    const { region_id, constellation_id } = this.state
    return (
      <Page>
        <Page.Sidebar>
          <h4>Region</h4>
          <RegionSelect
            onChange={this.onChangeRegion}
            value={region_id}
          />
          <h5>Constellation</h5>
          <ConstellationSelect
            onChange={this.onChangeConstellation}
            value={constellation_id}
            region_id={region_id}
          />
        </Page.Sidebar>
        <Page.Body>
          <ConnectedMap region_id={region_id} constellation_id={constellation_id} />
        </Page.Body>
      </Page>
    )
  }
}

export default withRouteParams(Homepage)

const ConnectedMap = compose(withMap, withRegion, withConstellation)(Map)

const RegionSelect = compose(withMaps, withRegions)(({ maps, regions, onChange, value }) => {
  regions = regions.filter(region => maps.find(map => map.get('region_id') === region.get('region_id')))
  return (
    <div className="form-group">
      <select className="form-control" onChange={onChange} value={String(value)}>
        {regions.sortBy(region => region.get('name')).toArray().map(region => (
          <option key={region} value={region.get('region_id')}>{region.get('name')}</option>
        ))}
      </select>
    </div>
  )
})
const ConstellationSelect = withConstellations(({ constellations, region_id, onChange, value }) => {
  constellations = constellations.filter(constellation => constellation.get('region_id') === region_id)
  return (
    <div className="form-group">
      <select className="form-control" onChange={onChange} value={String(value)}>
        {constellations.sortBy(constellation => constellation.get('name')).toArray().map(constellation => (
          <option key={constellation} value={constellation.get('constellation_id')}>{constellation.get('name')}</option>
        ))}
      </select>
    </div>
  )
})
