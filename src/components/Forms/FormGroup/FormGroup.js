import React, { Component } from 'react'
import styles from 'components/Forms/styles.css'

class FormGroup extends Component {
  render() {
    return (
      <div className={styles.formGroup}>{this.props.children}</div>
    )
  }
}

export default FormGroup
