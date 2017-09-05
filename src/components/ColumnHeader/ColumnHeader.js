import React from 'react'

import styles from 'components/ColumnHeader/styles.css'

const ColumnHeader = (props) => {
	return (
		<div className={styles.columnHeader}>
			<h2>{props.headerTitle}</h2>
			<div className={styles.headerActions}>
				{props.children}
			</div>
		</div>
	)
}

export default ColumnHeader
    