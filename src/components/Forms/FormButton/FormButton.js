import React, { Component } from 'react'
import styles from 'components/Forms/styles.css'
import { connect } from 'react-redux'

import { Loader } from 'components'

@connect((store) => ({
  isFetching: store.users.isFetching
}))
class FormButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      buttonDisabled: false
    }
  }

  componentWillMount() {
    this.props.bindSubmit(this)
  }

  componentWillUnmount() {
    this.props.unbindSubmit(this)
  }

  render() {
    return (
      <div className={styles.formGroup}>
        <button className={styles.formButton} disabled={this.props.isFetching || this.state.buttonDisabled ? 'disabled' : ''}>

          {this.props.showLoader && this.props.isFetching
          ? <Loader spinnerText={this.props.loaderText} />
          : this.props.buttonText}

        </button>
      </div>
    )
  }
}

export default FormButton
