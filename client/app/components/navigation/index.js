import React from 'react'
import { Link } from 'redux-router'
import * as Patterns from 'app/routes/patterns'

class Navigation extends React.Component {
  render () {
    return (
      <div className="c-navigation navbar navbar-expand-sm navbar-dark bg-dark">
        <Link href={Patterns.Homepage} className="c-navigation__brand navbar-brand">EVE-Maps</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href={Patterns.Homepage}>Map Browser</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={Patterns.MultiMap}>Multi map</Link>
            </li>
          </ul>
        </div>
        <div />
      </div>
    )
  }
}

export default Navigation
