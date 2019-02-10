import React from 'react'
import PropTypes from 'prop-types'

import loading from '../assets/images/loading.svg'

const Loading = ({ absolute }) => {
  let style

  if (absolute) {
    style = {
      backgroundColor: 'white',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  } else {
    style = {
      display: 'flex',
      justifyContent: 'center'
    }
  }

  return (
    <div style={style}>
      <img src={loading} alt="loading"/>
    </div>
  )
}

Loading.propTypes = {
  absolute: PropTypes.bool
}

Loading.defaultProps = {
  absolute: false
}

export default Loading