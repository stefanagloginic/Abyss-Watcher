import React from 'react'
import Icon from 'react-icon-base'

export default (props) => {
  return (
    <Icon viewBox='0 0 100 100' {...props}>
      <title>{props.title || 'Circle'}</title>
      <g>
  <circle cx="50" cy="50" r="50"/>
</g>
    </Icon>
  )
}
