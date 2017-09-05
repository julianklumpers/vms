import React from 'react'
import styles from 'components/QuotationDetail/styles.css'

const QuotationDetail = (props) => {
  return (
    <div className={styles.row}>
      <span>{props.label}</span>
      <span>{props.input}</span>
    </div>
  )
}

export default QuotationDetail
