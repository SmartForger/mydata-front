import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { withStyles } from '@material-ui/core'
import AutoSuggestChips from '../auto-suggest-chips'

const ChipField = ({ classes, name, label, list, dataSourceConfig }) => (
  <Field name={name}>
    {({ field: {value, onBlur}, form: { setFieldValue, touched, errors } }) => (
      <div className={classes.root}>
        <div className={classes.label}>{label}</div>
        <div className={classes.control}>
          <AutoSuggestChips
            {...{
              list,
              name,
              value,
              dataSourceConfig,
              onInputBlur: ev => {
                onBlur(name, ev)
              },
              onChipsChange: value => {
                setFieldValue(name, value)
              }
            }}
          />
          {touched[name] && errors[name] && (
            <span className={classes.error}>{errors[name]}</span>
          )}
        </div>
      </div>
    )}
  </Field>
)

ChipField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string
    })
  ),
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  })
}

ChipField.defaultProps = {
  label: '',
  list: [],
  dataSourceConfig: {
    text: 'value',
    value: 'key'
  }
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
    color: 'red',
    fontSize: '0.75rem',
    marginTop: 8
  }
})

export default withStyles(styles)(ChipField)
