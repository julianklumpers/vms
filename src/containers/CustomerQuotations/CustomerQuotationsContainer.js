import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatTimestampToDate, formatCurrency } from 'helpers/helpers'
import * as customersActionCreators from 'redux/modules/customer'
import * as quotationsActionCreators from 'redux/modules/quotations'

import shared from 'shared.css'
import styles from 'containers/CustomerQuotations/styles.css'

import {
  Form,
  FormGroup,
  FormInput,
  Customer,
  ColumnHeader,
  Table,
  BreadCrumbs,
  Loader,
  QuotationStatusBadge
} from 'components'

@connect((store) => ({
  customers: store.customers,
  quotations: store.quotations
}), (dispatch) => ({
  customersAction: bindActionCreators(customersActionCreators, dispatch),
  quotationsAction: bindActionCreators(quotationsActionCreators, dispatch)
}))
class CustomerQuotationsContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      toggleForm: true
    }

    this.handleToggleForm = this.handleToggleForm.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.createNewQuotation = this.createNewQuotation.bind(this)
    this.tableRows = this.tableRows.bind(this)
    this.goToQuotation = this.goToQuotation.bind(this)

    this.customerId = this.props.match.params.customerId
  }

  componentDidMount() {
    this.props.quotationsAction.fetchAndHandleQuotations(this.customerId)
  }

  handleToggleForm() {
    this.setState({
      toggleForm: !this.state.toggleForm
    })
  }

  handleFormSubmit(customer) {
    this.props.customersAction.editCustomerDetails(customer, this.customerId)
      .then(() => {
        this.setState({
          toggleForm: true
        })
      })
  }

  createNewQuotation() {

    // offertenummer wordt automatisch berekend
    const quotation = {
      quotationStatus: 'openstaand',
      dateAdded: Date.now(),
      totaal: 0
    }

    this.props.quotationsAction.saveNewQuotation(this.customerId, quotation)
      .then((quotationId) => {
        this.props.history.push(`/customers/${this.customerId}/${quotationId}`)
      })
  }

  goToQuotation(row) {
    this.props.history.push(`/customers/${this.customerId}/${row.PATH}`)
  }

  tableRows() {

    let rows = new Map()

    Object
      .keys(this.props.quotations.quotations)
      .sort((a, b) => this.props.quotations.quotations[b].quotationNumber - this.props.quotations.quotations[a].quotationNumber)
      .forEach((quotation) => {
        const {quotationNumber, quotationStatus, dateAdded, totaal} = this.props.quotations.quotations[quotation]
        rows.set(
          quotation,
          {
            Offerte: quotationNumber,
            Status: <QuotationStatusBadge label={quotationStatus} />,
            DatumOfferte: formatTimestampToDate(dateAdded),
            Totaal: formatCurrency(totaal),
            PATH: `${quotationNumber}`
          }
        )
      })

    return rows
  }

  render() {
    return (
      <div>
        <BreadCrumbs path={this.props.match} />
        <div className={shared.flexRow}>
          <div className={shared.flexColumn} style={{flex:'0 0 70%'}}>
            <ColumnHeader	headerTitle="Offertes">
              {
                this.props.quotations.isFetching
                ? <Loader color="#fff" text="Fetching quotations" />
                : <a href="#" onClick={this.createNewQuotation}><i className="material-icons">note_add</i></a>
              }
            </ColumnHeader>
            {
              !this.props.quotations.isFetching &&
              <Table
                headerLabels={['Offerte', 'Status', 'Datum offerte', 'Totaal &#8364;']}
                rows={this.tableRows()}
                noRowsMessage="Er zijn nog geen offertes"
                goTo={this.goToQuotation}
                scrollable={true} />
            }
          </div>

          {
            this.props.customers.isFetching
            ? <Loader color="#333" text="Fetching customer" />
            : <Customer
                customer={this.props.customers.customers[this.customerId]}
                onToggleForm={this.handleToggleForm}
                onFormSubmit={this.handleFormSubmit}
                toggleForm={this.state.toggleForm} />
          }
        </div>
      </div>
    )
  }
}

export default CustomerQuotationsContainer
