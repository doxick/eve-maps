import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'app/components/navigation'

class Page extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    return (
      <div className="c-page">
        <div className="c-page__header">
          <Navigation />
        </div>
        <div className="c-page__main">
          {this.props.children}
        </div>
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
