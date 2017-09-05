import React, { Component } from 'react'
import styles from 'components/Forms/styles.css'

const Input = (props) => {
  return (
    <div className={props.className ? props.className : styles.inputGroup} style={{width: props.width}}>
      {
        props.label &&
        <label
          htmlFor={props.name}
          className={props.className ? '' : styles.formLabel}>
          {props.label}
        </label>
      }
      <div className={props.confirmation && styles.inputConfirmation}>
        <input
          type={props.type}
          className={props.className ? '' : styles.formInput}
          value={props.inputValue}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onSetValue}
          // onKeyUp={props.handleKeyup}
          onBlur={props.onSetValue}
          disabled={props.disabled ? 'disabled' : ''} />

      </div>
      {props.children}
    </div>
  )
}

export default Input
