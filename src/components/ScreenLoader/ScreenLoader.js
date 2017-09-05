import React from 'react'
import styles from 'components/ScreenLoader/styles.css'

import { Loader } from 'components'

const ScreenLoader = (props) => {
	return (
		<div className={styles.container}>
			<Loader
				type="spinner"
				color="#333"
				spinnerWidth={200}
				spinnerHeight={200} />
		</div>
	)
}

export default ScreenLoader
