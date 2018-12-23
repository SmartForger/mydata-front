import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { Switch, withStyles } from '@material-ui/core'

const SwitchField = ({ classes, name, label }) => (
  <Field name={name}>
    {({ field: { value, onChange } }) => (
      <div className={classes.root}>
        <div className={classes.label}>{label}</div>
        <div className={classes.control}>
          <Switch
            name={name}
            checked={value}
            onChange={onChange}
            color="primary"
          />
        </div>
      </div>
    )}
  </Field>
)

SwitchField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

SwitchField.defaultProps = {
  label: ''
}

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8
  },
  label: {
    width: 120,
    flex: 'none',
  },
  control: {
    flex: 1
  }
})

export default withStyles(styles)(SwitchField)
