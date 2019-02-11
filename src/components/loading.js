import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, CircularProgress } from '@material-ui/core';

const Loading = ({ absolute, classes, size }) => {
  return (
    <div className={absolute ? classes.absolute : classes.relative}>
      <CircularProgress size={size} />
    </div>
  )
}

Loading.propTypes = {
  absolute: PropTypes.bool,
  size: PropTypes.number
}

Loading.defaultProps = {
  absolute: false,
  size: 40
}

const styles = () => ({
  relative: {
    display: 'flex',
    justifyContent: 'center'
  },
  absolute: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
})

export default withStyles(styles)(Loading)