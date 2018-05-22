import React from 'react'
import { Map } from 'app/components'
import {
  withMap,
  withRegion,
  withConstellation
} from 'app/containers/utility'
import { compose } from 'redux'
import Page from 'app/components/page'
import RegionSelect from 'app/components/region-select'
import ConstellationSelect from 'app/components/constellation-select'

class Homepage extends React.Component {
  state = {
    region_id: 10000029,
    constellation_id: undefined,
    system_id: undefined
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
  onClickSystem = (system) => {
    this.setState({
      region_id: system.get('region_id'),
      constellation_id: system.get('constellation_id'),
      system_id: system.get('system_id')
    })
  }

  render () {
    const { region_id, constellation_id, system_id } = this.state
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
          <ConnectedMap
            region_id={region_id}
            constellation_id={constellation_id}
            system_id={system_id}
            onClickSystem={this.onClickSystem}
          />
        </Page.Body>
      </Page>
    )
  }
}

export default Homepage

const ConnectedMap = compose(withMap, withRegion, withConstellation)(Map)
