import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from 'components/Loader/styles.css'

class Loader extends Component {

	render() {

		if(this.props.type === 'spinner') {

			const spinnerStyles = {
				dimensions: {
					width: this.props.spinnerWidth+'px',
					height: this.props.spinnerHeight+'px'
				},
				color: {
					backgroundColor: this.props.color
				}
			}

			return (
				<div className={styles.spinnerContainer}>
					{ this.props.text }

					<div className={styles.spinner} style={spinnerStyles.dimensions}>
					  <div style={spinnerStyles.color} className={styles.bar1}></div>
					  <div style={spinnerStyles.color} className={styles.bar2}></div>
					  <div style={spinnerStyles.color} className={styles.bar3}></div>
					  <div style={spinnerStyles.color} className={styles.bar4}></div>
					  <div style={spinnerStyles.color} className={styles.bar5}></div>
					  <div style={spinnerStyles.color} className={styles.bar6}></div>
					  <div style={spinnerStyles.color} className={styles.bar7}></div>
					  <div style={spinnerStyles.color} className={styles.bar8}></div>
					  <div style={spinnerStyles.color} className={styles.bar9}></div>
					  <div style={spinnerStyles.color} className={styles.bar10}></div>
					  <div style={spinnerStyles.color} className={styles.bar11}></div>
					  <div style={spinnerStyles.color} className={styles.bar12}></div>
					</div>
				</div>
			)
		}
	}
}

Loader.defaultProps = {
	text: '',
	type: 'spinner',
	color: '#fff',
	spinnerWidth: 30,
	spinnerHeight: 30
}

Loader.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string
}

export default Loader
