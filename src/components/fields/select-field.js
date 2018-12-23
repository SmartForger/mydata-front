import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import {
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  withStyles
} from '@material-ui/core'


const CustomSelectField = ({ classes, name, label, list }) => (
  <Field name={name}>
    {({ field, form: { touched, errors } }) => (
      <div className={classes.root}>
        <div className={classes.label}>{label}</div>
        <FormControl className={classes.control}>
          <Select
            {...field}
            classes={{
              select: classes.select
            }}
            displayEmpty
            name={name}
          >
            {list.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {touched[field.name] && errors[field.name] && (
            <FormHelperText className={classes.error}>
              {errors[field.name]}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    )}
  </Field>
)

CustomSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string
    })
  ),
  getValue: PropTypes.func
}

CustomSelectField.defaultProps = {
  label: '',
  list: [],
  getValue: val => val
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
  select: {
    paddingTop: 8,
    paddingBottom: 8
  },
  error: {
    color: 'red'
  },
})

export default withStyles(styles)(CustomSelectField)
