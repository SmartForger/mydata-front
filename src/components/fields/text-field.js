import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { TextField, withStyles } from '@material-ui/core'

const CustomTextField = ({ classes, name, label }) => (
  <Field name={name}>
    {({ field, form: { touched, errors } }) => (
      <div className={classes.root}>
        <div className={classes.label}>{label}</div>
        <div className={classes.control}>
          <TextField
            className={classes.textField}
            {...field}
            helperText={
              touched[field.name] && errors[field.name] && (
                <span className={classes.error}>{errors[field.name]}</span>
              )
            }
          />
        </div>
      </div>
    )}
  </Field>
)

CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}

CustomTextField.defaultProps = {
  label: ''
}

const styles = () => ({
  root: {
    display: 'flex',
    marginBottom: 16
  },
  label: {
    width: 120,
    flex: 'none',
    paddingTop: 7
  },
  control: {
    flex: 1
  },
  textField: {
    width: '100%'
  },
  error: {
    color: 'red'
  }
})

export default withStyles(styles)(CustomTextField)
