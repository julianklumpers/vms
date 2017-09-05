import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as customerActionCreators from 'redux/modules/customers'
import * as recentQuotationsActionCreators from 'redux/modules/recentQuotations'
import { fetchingQuotations } from 'redux/modules/quotations'
import { formatTimestampToDate } from 'helpers/helpers'

import shared from 'shared.css'
import { Table, ColumnHeader, BreadCrumbs, Loader, QuotationStatusBadge } from 'components'

@connect((store) => ({
	customers: store.customers,
	recentQuotations: store.recentQuotations,
	user: store.users
}), (dispatch) => ({
	customerAction: bindActionCreators(customerActionCreators, dispatch),
	recentQuotationsAction: bindActionCreators(recentQuotationsActionCreators, dispatch),
	setQuotationFetching: dispatch(fetchingQuotations())
}))
class CustomersContainer extends Component {

	constructor(props) {
		super(props)

		this.goToCustomer = this.goToCustomer.bind(this)
		this.goToRecentQuotation = this.goToRecentQuotation.bind(this)
		this.customerTableRows = this.customerTableRows.bind(this)
		this.recentQuotationsTableRows = this.recentQuotationsTableRows.bind(this)
	}

	componentDidMount() {
		this.props.setQuotationFetching
		this.props.recentQuotationsAction.fetchAndHandleRecentQuotations()
	}

	goToCustomer(row) {
		this.props.history.push(`/customers/${row.PATH}`)
	}

	goToRecentQuotation(row) {
		this.props.history.push(`/customers/${row.PATH}`)
	}

	customerTableRows() {

		let rows = new Map

		if(this.props.customers.customers) {
	    Object
				.keys(this.props.customers.customers)
				.sort((a, b) => this.props.customers.customers[b].dateAdded - this.props.customers.customers[a].dateAdded)
				.forEach((customer) => {
					const {klantnaam, contactpersoon, dateAdded} = this.props.customers.customers[customer]
					rows.set(
						customer,
						{
			        custumerId: klantnaam,
			        contactpersoon: contactpersoon,
			        offertes: dateAdded,
			        datumLastQuotation: formatTimestampToDate(dateAdded),
							PATH: `${klantnaam}`
						}
					)
		    })
		}

		return rows
  }

	recentQuotationsTableRows() {

		let rows = new Map()

		if(this.props.recentQuotations.recentQuotations) {
			Object
				.keys(this.props.recentQuotations.recentQuotations)
				.sort((a, b) => this.props.recentQuotations.recentQuotations[b].quotation - this.props.recentQuotations.recentQuotations[a].quotation)
				.forEach((recentQuotation) => {
					const {customer, quotation, quotationStatus} = this.props.recentQuotations.recentQuotations[recentQuotation]
					rows.set(
						recentQuotation,
						{
							quotationId: quotation,
							quotationStatus: <QuotationStatusBadge label={quotationStatus} />,
							PATH: `${customer}/${quotation}`
						}
					)
				})
		}

		return rows
	}

	render() {
		return (
			<div>
				<BreadCrumbs path={this.props.match} />
				<div className={shared.flexRow}>
					<div className={shared.flexColumn} style={{flex:'0 0 60%'}}>
						<ColumnHeader	headerTitle="Klanten">
							{
								this.props.customers.isFetching
								? <Loader color="#fff" text="Fetching klanten" />
								: <Link to="/customers/new"><i className="material-icons md-48">person_add</i></Link>
							}
						</ColumnHeader>
						{
							!this.props.customers.isFetching &&
						  <Table
								headerLabels={['Klant', 'Contactpersoon', 'Offertes', 'Datum laatste offerte']}
								rows={this.customerTableRows()}
								goTo={this.goToCustomer}
								scrollable={true} />
						}
					</div>
					<div className={shared.flexColumn}>
						<ColumnHeader	headerTitle="Recente Offertes">
							{
								this.props.recentQuotations.isFetching &&
								<Loader color="#fff" text="Fetching offertes" />
							}
						</ColumnHeader>
						{
							!this.props.recentQuotations.isFetching &&
						 	<Table
								headerLabels={['Offerte', 'Status']}
								rows={this.recentQuotationsTableRows()}
								goTo={this.goToRecentQuotation} />
						}
					</div>
	      </div>
	    </div>
		)
	}
}

export default CustomersContainer
