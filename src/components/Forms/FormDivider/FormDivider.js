import React, { Component } from 'react'
import styles from 'components/Forms/styles.css'

class FormDivider extends Component {
  render() {
    return (
      <span className={styles.formDivider}>
        {
          this.props.dividerText &&
            <span>{this.props.dividerText}</span>
        }
      </span>
    )
  }
}

export default FormDivider
