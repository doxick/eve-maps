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

class MultiMap extends React.Component {
  state = {}

  onChange = (value, { target }) => {
    this.setState({
      [target.name]: value
    })
  }
  onClickSwap = (region) => {
    this.setState({
      [region]: this.state['region-0'],
      'region-0': this.state[region]
    })
  }

  render () {
    return (
      <Page>
        <Page.Body>
          <div className="c-multi-map">
            <div className="c-multi-map__body">
              {this.renderMap(0)}
            </div>
            <div className="c-multi-map__sidebar">
              {this.renderMap(1)}
              {this.renderMap(2)}
              {this.renderMap(3)}
            </div>
          </div>
        </Page.Body>
      </Page>
    )
  }

  renderMap (idx) {
    const region = `region-${idx}`
    return (
      <div className="c-multi-map__view">
        <div className="form-inline">
          <RegionSelect
            name={region}
            value={this.state[region]}
            onChange={this.onChange}
            label={idx === 0 ? 'Region' : 'R'}
          />
          {idx > 0 && <button className="btn btn-secondary" disabled={!this.state[region]} onClick={() => this.onClickSwap(region)}>Swap</button>}
        </div>
        <div className="c-multi-map__map">
          <ConnectedMap
            region_id={this.state[region]}
            isSmall={idx !== 0}
          />
        </div>
      </div>
    )
  }
}

export default MultiMap

const ConnectedMap = compose(withMap, withRegion, withConstellation)(Map)
