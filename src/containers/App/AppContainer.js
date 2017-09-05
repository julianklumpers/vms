import React, {Component} from 'react'
import { authenticate, database } from 'config/firebase'
import { getUser } from 'auth/auth'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from 'redux/actions'

import shared from 'shared.css'

import {
	HomeContainer,
	HeaderContainer,
	LoginContainer,
	LogoutContainer,
	CustomersContainer,
	NewCustomerContainer,
 	CustomerQuotationsContainer,
	QuotationContainer,
	DepartmentContainer
} from 'containers'

import { PrivateRoute, ScreenLoader, PageNotFound } from 'components'

@connect((store) => ({
	isAuthed: store.users.isAuthed,
	authedId: store.users.authedId
}), (dispatch) => ({
	action: bindActionCreators(actionCreators, dispatch)
}))
class AppContainer extends Component {

	componentDidMount() {
		this.unsubscribeAuthStateChanged = authenticate.onAuthStateChanged((authedUser) => {
			if(authedUser) {
				getUser().then((user) => {
					this.props.action.fetchingUserSuccess(user.info, authedUser.uid, Date.now())
					this.props.action.authUser(authedUser.uid)

					// Set app listeners
					//this.props.action.fetchAndHanleUserCustomers()
					this.props.action.setCustomersListener()
				})
			} else {
				this.props.action.unauthUser(null)
				console.log('your not authed anymore')
			}
		})
	}

	componentWillUnmount() {
		this.unsubscribeAuthStateChanged()
	}

	render() {
		return (
			this.props.isAuthed === undefined
			? <ScreenLoader />
			:
			<div className={shared.mainContainer}>
				<Router>
					<div>
						<HeaderContainer />
						<Switch>
							<Route path="/login" render={() => this.props.isAuthed	? <Redirect to="/home" />	: <LoginContainer />} />
							<Route path="/logout" component={LogoutContainer} />

							<PrivateRoute path="/home" component={HomeContainer} authenticated={this.props.isAuthed} />
							<PrivateRoute exact path="/customers" component={CustomersContainer} authenticated={this.props.isAuthed} />
							<PrivateRoute exact path="/customers/new" component={NewCustomerContainer} authenticated={this.props.isAuthed} />
							<PrivateRoute exact path="/customers/:customerId" component={CustomerQuotationsContainer} authenticated={this.props.isAuthed} />
							<PrivateRoute exact path="/customers/:customerId/:quotationId" component={QuotationContainer} authenticated={this.props.isAuthed} />
							<PrivateRoute exact path="/customers/:customerId/:quotationId/:departmentId" component={DepartmentContainer} authenticated={this.props.isAuthed} />

							<Route component={PageNotFound} />
						</Switch>
					</div>
				</Router>
			</div>
		)
	}
}

export default AppContainer
