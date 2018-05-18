import React from 'react'
import PropTypes from 'prop-types'

class Page extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return (
      <div className="c-page">
        {this.props.children}
      </div>
    )
  }

  static Body = class Sidebar extends React.Component {
    static propTypes = {
      children: PropTypes.node
    }
    render () {
      return (
        <div className="c-page__body">
          {this.props.children}
        </div>
      )
    }
  }

  static Sidebar = class Sidebar extends React.Component {
    static propTypes = {
      children: PropTypes.node
    }
    render () {
      return (
        <div className="c-page__sidebar">
          {this.props.children}
        </div>
      )
    }
  }
}

export default Page
