import React from 'react'
import { Route } from 'redux-router'
import * as Patterns from './patterns'
import * as Pages from 'app/containers/pages'

export default () => (
  <React.Fragment>
    <Route pattern={Patterns.Homepage} component={Pages.Homepage} />
    <Route pattern={Patterns.MultiMap} component={Pages.MultiMap} />
  </React.Fragment>
)
