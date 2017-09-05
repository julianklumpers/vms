import React from 'react'
import PropTypes from 'prop-types'

import styles from 'components/UserAvatar/styles.css'

const UserAvatar = (props) => {
	return (
		<div className={styles.userAvatar}>
			<i className={`material-icons ${styles.icon}`}>account_box</i>
      <div>
        <h3>{props.username}</h3>
        <span>{props.company}</span>
      </div>
    </div>
	)
}

UserAvatar.propTypes = {
	username: PropTypes.string.isRequired,
	company: PropTypes.string.isRequired
}

export default UserAvatar
