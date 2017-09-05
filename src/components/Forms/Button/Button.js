import React, { Component } from 'react'
import styles from 'components/Forms/styles.css'

const Button = (props) => {
  return (
    <div className={styles.formGroup}>
      <button className={styles.formButton} disabled={props.isFetching || props.disabled ? 'disabled' : ''}>
      {props.children}
      </button>
    </div>
  )
}
export default Button
