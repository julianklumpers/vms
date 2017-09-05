import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FormGroup} from 'components'
import styles from 'components/Forms/styles.css'
import rules from 'components/Forms/rules'

class Form extends Component {

  constructor(props) {
    super(props)

    this.state = {
      formValid: true
    }

    this.registerInputs   = this.registerInputs.bind(this)
    this.bindToForm       = this.bindToForm.bind(this)
    this.unbindFromForm   = this.unbindFromForm.bind(this)
    this.updateModel      = this.updateModel.bind(this)
    this.validate         = this.validate.bind(this)
    this.validateForm     = this.validateForm.bind(this)
    this.handleSubmit     = this.handleSubmit.bind(this)
    this.handleFormReset  = this.handleFormReset.bind(this)
  }

  componentWillMount() {

    this.children     = {}
    this.inputs       = {}
    this.model        = {}

    this.registerInputs(this.props.children)
  }

  componentWillReceiveProps(nextProps) {
    // when Form receives new props via children rerun this function to update children props
    this.registerInputs(nextProps.children)
  }

  registerInputs(children) {

    this.children = React.Children.map(children, (child) => {

      const newProps = {
        bindToForm: this.bindToForm,
        unbindFromForm: this.unbindFromForm,
        validate: this.validate,
      }

      if(child.props.type) {
        return React.cloneElement(child, {...newProps})
      }

      if(child.props.children && child.type.name === 'FormGroup') {
        return (
          <FormGroup>
            {React.Children.map(child.props.children, (innerChild) => {
              return React.cloneElement(innerChild, {...newProps})
            })}
          </FormGroup>
        )
      }
      else {
        return child
      }
    })
  }

  bindToForm(component) {
    this.inputs[component.props.name] = component
    this.validate(component)
  }

  unbindFromForm(component) {
    delete this.inputs[component.props.name]
  }

  updateModel() {
    Object.keys(this.inputs).map((name) => {
      if(name !== 'submit') {
        this.model[name] = this.inputs[name].state.value
      }
    })
  }

  validate(component) {

    const { validations } = component.props || null
    const { value } = component.state

    let isValid = true
    let message = ''

    if(validations) {
      validations.forEach(validation => {
        if(isValid) {
          isValid = rules[validation].method(value)
          message = rules[validation].message(value, {...component.props})
        }
      })
    }

    component.setState({
      isValid,
      message
    }, () => {
      this.validateForm()
    })
  }

  validateForm() {

    let inputsValid = true

    Object.keys(this.inputs).map((name) => {
      if(!this.inputs[name].state.isValid) {
        // form is not valid
        inputsValid = false
      }
    })

    // disable submit button if form is not valid
    if(this.inputs['submit']) {
      if(inputsValid) {
        this.inputs['submit'].setState({
          disableButton: false
        })
      }
      else {
        this.inputs['submit'].setState({
          disableButton: true
        })
      }
    }

    this.setState({
      formValid: inputsValid
    }, () => {
      this.updateModel()
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()

    if(this.state.formValid) {
      this.props.onFormSubmit(this.model)
    }
    else {
      Object.keys(this.inputs).map((name) => {
        this.inputs[name].setState({isTouched:true})
      })
    }
  }

  handleFormReset() {
    Object.keys(this.inputs).map((name) => {
      this.inputs[name].setState({
        value: '',
        message: '',
        isValid: false
      })
    })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        onReset={this.handleFormReset}
        className={this.props.formClass}
        ref={(el) => this.props.formRef && this.props.formRef(el)}
      >
        {this.children}
      </form>
    )
  }
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired
}

export default Form
