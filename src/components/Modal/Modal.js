import React, { Component } from 'react'

import styles from 'components/Modal/styles.css'

class Modal extends Component {

  render() {
    return (
      <div
        className={`${styles.modalContainer} ${this.props.modalOpen && styles.show}`}
        style={{}}>
        <div className={styles.modalHeader}>
          <p>{this.props.modalTitle}</p>
          <a href="#" onClick={this.props.modalClose}><i className="material-icons">close</i></a>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Modal
