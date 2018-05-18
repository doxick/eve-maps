import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBase from 'app/app-base'
import * as Reducers from 'app/reducers'


class HtmlBase extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    commit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  render () {
    const { commit, store } = this.props

    let appBase = <AppBase store={store} />

    return (
      <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Evemaps</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href={`/assets/css/style.css?${commit}`} />
        <script dangerouslySetInnerHTML={{ __html: `
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState().toJS()).replace(/</g, '\\\u003c')}
        ` }}>
        </script>

      </head>
      <body>
      <div id="react-root">
        {appBase}
      </div>
      <script src={`/assets/js/main.js?${commit}`} />
      </body>
      </html>
    )
  }
}

export default HtmlBase
