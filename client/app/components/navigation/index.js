import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Maybe from 'app/utils/maybe'
import { Link } from 'redux-router'
import * as Patterns from 'app/routes/patterns'
import { withAuthentication } from 'app/containers/utility'

class Navigation extends React.Component {
  static propTypes = {
    character: PropTypes.instanceOf(Immutable.Map)
  }

  render () {
    let character = Maybe(this.props.character)
    return (
      <div className="c-navigation navbar navbar-expand-sm navbar-dark bg-dark">
        <Link href={Patterns.Homepage} className="c-navigation__brand navbar-brand">EVE-Maps</Link>
        <div className="d-flex justify-content-between" style={{ flex: 1 }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href={Patterns.Homepage}>Map Browser</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={Patterns.MultiMap}>Multi map</Link>
            </li>
          </ul>
          <div>
            {character.bind(character => (
              <div className="c-navigation-character">
                <h6 className="c-navigation-character__name">{character.get('CharacterName')}</h6>
                <img src={`https://image.eveonline.com//Character/${character.get('CharacterID')}_64.jpg`} alt="" className="c-navigation-character__portrait" />
              </div>
            ))}
          </div>
        </div>
        <div />
      </div>
    )
  }
}

export default withAuthentication(Navigation)
