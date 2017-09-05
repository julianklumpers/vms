import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from 'redux/modules/users'

import shared from 'shared.css'
import styles from 'containers/Login/styles.css'

import {
	Form,
	FormInput,
	FormGroup,
	FormDivider,
 	FormButton,
 	FormServerErrors,
	Loader,
	CrawlingBugsBackground } from 'components'

@connect((store) => ({
  isFetching: store.users.isFetching,
  error: store.users.error
}), (dispatch) => ({
  action: bindActionCreators(actionCreators, dispatch)
}))
class LoginContainer extends Component {

	constructor(props) {
    super(props)

		this.state = {
			bugs: 25
		}
		this.addBugs = this.addBugs.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
  }

	addBugs() {
		this.setState({
			bugs: this.state.bugs + 5
		})
	}

  handleAuth(user) {
    this.props.action.fetchAndHandleUser(user.email, user.password)
  }

	render() {
		console.log(this.state)
    // destruct css classes
		const { flexRow, flexColumn, center} = shared
		const { loginContainer } = styles

		return (
			<CrawlingBugsBackground bugs={this.state.bugs} foodRate={80}>
				<div className={loginContainer}>
	        <div className={flexRow}>
	          <div className={`${flexColumn} ${center}`}>
							<FormServerErrors message={this.props.error} />
	            <Form onFormSubmit={this.handleAuth} formClass={styles.loginForm}>

								<FormGroup>
		              <FormInput
		                type="text"
		                label="Email"
		                name="email"
		                placeholder="Email" />
								</FormGroup>

								<FormGroup>
		              <FormInput
		                type="password"
		                label="password"
		                name="password"
		                placeholder="Password" />
								</FormGroup>

								<FormDivider />

								<FormInput
									type="button"
									name="submit"
									buttonText="Login"
									showLoader={this.props.isFetching}
									loader={<Loader text="Authenticating" />} />

	            </Form>
	            {//<div className={`${formGroup} ${loginButtons}`}>
	              //<button onClick={this.signInWithFacebook} className={facebook}><i className="fa fa-facebook"></i>Log in with Facebook</button>
	              //<button onClick={this.signInWithGoogle} className={google}><i className="fa fa-google"></i>Log in with Google</button>
	            //</div>
							}
	          </div>
	        </div>
	      </div>
			</CrawlingBugsBackground>
		)
	}
}

export default LoginContainer
