import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import AppBase from './app-base'

import configureStore from './store'

const store = configureStore()

ReactDOM.render(
  <AppBase store={store} />,
  document.querySelector('#react-root')
)
