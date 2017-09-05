import React from 'react'
import styles from 'components/Forms/styles.css'

const FormServerErrors = (props) => {
  return (
    props.message
    ?
    <div className={styles.formServerErrors}>
      <p>{props.message}</p>
    </div>
    :
    <div></div>
  )
}

export default FormServerErrors
