import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Logo, Nav, UserAvatar } from 'components'

import 'containers/Header/styles.css'

@withRouter
@connect((store) => ({
	isAuthed: store.users.isAuthed,
	user: store.users.user
}))
class Header extends Component {
	render() {
		return (
			<header>
				<Logo />
				{
					this.props.isAuthed &&
						<UserAvatar
							username={this.props.user.info.name}
							company={this.props.user.info.company} />
				}
				{
					this.props.isAuthed &&
						<Nav />
				}
			</header>
		)
	}
}

export default Header
