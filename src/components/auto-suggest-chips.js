import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import ChipInput from 'material-ui-chip-input'
import { noop } from '../utils'

const renderInput = ({
  classes, autoFocus, value, onChange, onAdd, onDelete, chips, ref, ...other
}) => (
  <ChipInput
    clearInputValueOnChange
    onUpdateInput={onChange}
    onAdd={onAdd}
    onDelete={onDelete}
    value={chips}
    newChipKeyCodes={[32, 188]}
    {...other}
  />
)

const renderSuggestion = field => (suggestion, { isHighlighted }) => {
  const matches = match(suggestion[field])
  const parts = parse(suggestion[field], matches)

  return (
    <MenuItem
      selected={isHighlighted}
      component='div'
      onMouseDown={(e) => e.preventDefault()} // prevent the click causing the input to be blurred
    >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

const renderSuggestionsContainer = ({ containerProps, children }) => (
  <Paper {...containerProps} square>
    {children}
  </Paper>
)

const getSuggestions = (list, field, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return list.filter(suggestion => {
    const keep =
        count < 5 && suggestion[field].toLowerCase().slice(0, inputLength) === inputValue

    if (keep) {
      count += 1
    }

    return keep
  })
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 999
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  textField: {
    width: '100%'
  }
})

class AutoSuggestChips extends Component {
  state = {
    suggestions: [],
    textFieldInput: ''
  }

  handleSuggestionsFetchRequested = ({ value, reason }) => {
    const { list, dataSourceConfig } = this.props

    this.setState({
      suggestions: getSuggestions(list, dataSourceConfig.text, value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handletextFieldInputChange = (event, { newValue }) => {
    this.setState({
      textFieldInput: newValue
    })
  }

  handleAddChip = chip => {
    this.setState({
      textFieldInput: ''
    })

    const { value, onChipsChange } = this.props
    onChipsChange([...value, chip])
  }

  handleDeleteChip = (chip) => {
    const { value, onChipsChange } = this.props
    onChipsChange(value.filter(v => v.key !== chip))
  }

  render () {
    const {
      classes, value, onInputBlur, onChipsChange, dataSourceConfig, ...rest
    } = this.props
    const { suggestions, textFieldInput } = this.state

    const field = dataSourceConfig.text

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
          input: classes.textField
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={suggestion => suggestion[field]}
        renderSuggestion={renderSuggestion(field)}
        onSuggestionSelected={(e, { suggestion }) => {
          this.handleAddChip(suggestion)
          e.preventDefault()
        }}
        focusInputOnSuggestionClick={false}
        inputProps={{
          classes,
          chips: value,
          onChange: this.handletextFieldInputChange,
          value: textFieldInput,
          onAdd: (chip) => this.handleAddChip(chip),
          onBlur: onInputBlur,
          onDelete: (chip, index) => this.handleDeleteChip(chip, index),
          dataSourceConfig,
          ...rest
        }}
      />
    )
  }
}

AutoSuggestChips.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string
    })
  ).isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.string
    })
  ).isRequired,
  dataSourceConfig: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string
  }),
  onChipsChange: PropTypes.func,
  onInputBlur: PropTypes.func
}

AutoSuggestChips.defaultProps = {
  value: [],
  onChipsChange: noop,
  onInputBlur: noop,
  dataSourceConfig: {
    text: 'text',
    value: 'value'
  }
}

export default withStyles(styles)(AutoSuggestChips)
