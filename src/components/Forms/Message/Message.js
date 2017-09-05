import React from 'react'
import PropTypes from 'prop-types'
import styles from 'components/Forms/styles.css'

const Message = (props) => {
  return (
    <div style={{position: 'relative'}}>
      <span className={styles.formError} dangerouslySetInnerHTML={{__html: props.children}}></span>
    </div>
  )
}

export default Message
