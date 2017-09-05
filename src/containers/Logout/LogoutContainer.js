import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'redux/modules/users'

@connect((store) => ({
	user: store.user
}), (dispatch) => ({
	action: bindActionCreators(actionCreators, dispatch)
}))
class LogoutContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			count: 0
		}
	}

	componentDidMount() {
		this.props.action.logoutAndUnauthUser()
		this.countDown(3000)
		setTimeout(() => {
			this.props.history.push('/login')
		}, 3000)
	}

	countDown(time) {
		this.setState({count: time})
		let count = time
		setInterval(() => {
			if(count >= 1000) {
				count -= 1000
				this.setState({count: count})
			}
		}, 1000)
	}

	render() {
		return (
			<div>Your logged out now. you will be redirected in {this.state.count / 1000}</div>
		)
	}
}

export default LogoutContainer
    