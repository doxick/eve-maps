import React from 'react'
import PropTypes from 'prop-types'

export function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function renderPropComponent (props) {
  if (props.component) {
    const Component = props.component
    return <Component {...props} />
  }
  return (
    <React.Fragment>
      {(props.render || props.children || (() => null))(props)}
    </React.Fragment>
  )
}
renderPropComponent.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  render: PropTypes.func,
  children: PropTypes.func
}
