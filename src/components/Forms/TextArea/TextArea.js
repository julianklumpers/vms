import React, { Component } from 'react'
import styles from 'components/Forms/styles.css'

const TextArea = (props) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={props.name} className={styles.formLabel}>{props.label}</label>
      <textarea
        name={props.name}
        rows={props.rows}
        className={styles.formTextArea}
        value={props.inputValue}
        onChange={props.onSetValue}
        //onKeyUp={props.handleKeyup}
        onBlur={props.onSetValue}
        disabled={props.disabled ? 'disabled' : ''}></textarea>
    </div>
  )
}

export default TextArea
