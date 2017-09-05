import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from 'redux/modules/customer'
import shared from 'shared.css'
import styles from 'containers/NewCustomer/styles.css'
import {
	ColumnHeader,
 	Form,
	FormInput,
	FormButton,
	FormGroup,
	FormDivider,
	FormTextArea,
	Loader,
	BreadCrumbs
} from 'components'

import {saveCustomer} from 'api/api'

@connect((store) => ({
	customer: store.customer,
	user: store.users.user
}), (dispatch) => ({
	action: bindActionCreators(actionCreators, dispatch)
}))
class NewCustomerContainer extends Component {

	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(customer) {
		this.props.action.saveNewCustomer(customer)
			.then((customerId) => {
				this.props.history.push(`/customers/${customerId}`)
			})
	}

	render() {
		return (
			<div>
				<BreadCrumbs path={this.props.match} />
				<div className={shared.flexRow}>
					<div className={shared.flexColumn}>
						<ColumnHeader	headerTitle="Nieuwe klant" />
						<Form onFormSubmit={this.handleSubmit} formClass={styles.newCustomerForm}>

							<FormGroup>
								<FormInput
									type="text"
									width="70%"
									label="Naam klant"
									name="klantnaam"
									value="Valkie"
									placeholder="Klantnaam"
									validations={['required', 'checkCustomer']} />

								<FormInput
									type="text"
									width="30%"
									label="Klant nummer"
									name="klantnummer"
									placeholder="Klantnummer"
									validations={['required', 'number']} />
							</FormGroup>

							<FormGroup>
								<FormInput
									type="text"
									label="Adres + huisnummer"
									name="adres"
									placeholder="Adres + huisnummer"
									validations={['required']} />
							</FormGroup>

							<FormGroup>
								<FormInput
									type="text"
									width="30%"
									label="Postcode"
									name="postcode"
									placeholder="1234 AB"
									debounce={800}
									validations={['required', 'zipcode']} />

								<FormInput
									type="text"
									width="70%"
									label="Woonplaats"
									name="woonplaats"
									placeholder="Woonplaats"
									validations={['required']} />
							</FormGroup>

							<FormGroup>
								<FormInput
									type="text"
									width="70%"
									label="Contactpersoon"
									name="contactpersoon"
									placeholder="Contactpersoon"
									validations={['required']} />

								<FormInput
									type="text"
									width="30%"
									label="Telefoon"
									name="telefoon"
									placeholder="0101234567"
									debounce={800}
									validations={['required', 'phone']} />
							</FormGroup>

							<FormGroup>
								<FormInput
									type="text"
									label="Email"
									name="email"
									placeholder="Email"
									debounce={800}
									validations={['required', 'email']} />
							</FormGroup>

							<FormGroup>
								<FormInput
									type="textarea"
								 	label="Beschrijving"
									name="beschrijving"
									rows="5" />
							</FormGroup>

							<FormDivider />

							<FormInput
								type="button"
								name="submit"
								buttonText="Maak Klant"
								showLoader={this.props.customer.isSaving}
								loader={<Loader spinnerText="Klant wordt aangemaakt" />} />

						</Form>
					</div>
				</div>
			</div>
		)
	}
}

export default NewCustomerContainer
