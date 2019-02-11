import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { TextField, withStyles } from '@material-ui/core'

const CustomTextField = ({ classes, name, ...inputProps }) => (
  <Field name={name}>
    {({ field, form: { touched, errors } }) => (
      <TextField
        className={classes.textField}
        {...inputProps}
        {...field}
        helperText={
          touched[field.name] && errors[field.name] && (
            <span className={classes.error}>{errors[field.name]}</span>
          )
        }
      />
    )}
  </Field>
)

CustomTextField.propTypes = {
  name: PropTypes.string.isRequired
}

const styles = () => ({
  textField: {
    width: '100%',
    marginBottom: 16
  },
  error: {
    color: 'red'
  }
})

export default withStyles(styles)(CustomTextField)
