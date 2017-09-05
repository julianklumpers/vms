import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import TextArea from 'components/Forms/TextArea/TextArea'
import Input from 'components/Forms/Input/Input'
import Button from 'components/Forms/Button/Button'
import Message from 'components/Forms/Message/Message'

import tick from './../tick.svg'
import styles from 'components/Forms/styles.css'

class FormInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value ? this.props.value : '',
      isValid: true,
      message: '',
      touched: false,
      isTouched: false,
      disableButton: false,
    }

    this.onSetValue       = this.onSetValue.bind(this)
    this.handleSetValue   = this.props.debounce ? _.debounce(this.handleSetValue.bind(this), this.props.debounce || 0) : this.handleSetValue.bind(this)
    //this.handleKeyup      = this.handleKeyup.bind(this)
  }

  componentWillMount() {
    this.props.bindToForm(this)
  }

  componentDidMount() {
    if(this.props.value) {
      this.setState({
        isTouched: true
      })
    }
  }

  componentWillUnmount() {
    this.props.unbindFromForm(this)
  }

  onSetValue(evt) {
    evt.persist()

    this.setState({
      value: evt.target.value
    }, () => {
      this.handleSetValue(evt)
    })
  }

  handleSetValue(evt) {
    this.setState({
      touched: false,
      isTouched: true
    }, () => {
      this.props.validate(this)
    })
  }

  // handleKeyup(evt) {
  //   evt.persist()
  //
  //   if(evt.target.value) {
  //     this.setState({touched: true}, () => {
  //       this.handleSetValue(evt)
  //     })
  //   }
  // }

  render() {

    const showError = !this.state.isValid && this.state.isTouched
    const confirmation = this.state.isValid && this.state.isTouched

    switch(this.props.type) {

      case 'text': case 'password':
        return (
          <Input {...this.props} confirmation={confirmation} inputValue={this.state.value} onSetValue={this.onSetValue}>
            {
              showError &&
                <Message>{this.state.touched ? 'Validating' : this.state.message}</Message>
            }
          </Input>
        )
      case 'textarea':
        return <TextArea {...this.props} confirmation={confirmation} inputValue={this.state.value} onSetValue={this.onSetValue} />
      case 'button':
        return (
          <Button {...this.props} disabled={this.state.disableButton}>
            {
              this.props.showLoader
              ? this.props.loader
              : this.props.buttonText
            }
          </Button>
        )
      case 'hidden':
        return (
          <input type={this.props.type} name={this.props.name} value={this.state.value} />
        )
    }
  }
}

FormInput.defaultProps = {
  showLoader: false,
  debounce: 0
}

FormInput.propTypes = {
  bindToForm:     PropTypes.func,
  unbindFromForm: PropTypes.func,
  validate:       PropTypes.func,
  disableButton:  PropTypes.bool,
  showLoader:     PropTypes.bool,
  loader:         PropTypes.object,
  buttonText:     PropTypes.string,
  errorMessage:   PropTypes.string,
  type:           PropTypes.string.isRequired
}

export default FormInput
