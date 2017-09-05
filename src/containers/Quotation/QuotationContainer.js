import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as quotationsActionCreators from 'redux/modules/quotations'
import * as departmentActionCreators from 'redux/modules/departments'
import { formatSquareMeters, formatCurrency } from 'helpers/helpers'
import { Bar } from 'react-chartjs-2';

import {
  FlexRow,
  FlexColumn,
  BreadCrumbs,
  ColumnHeader,
  Table,
  QuotationDetail,
  QuotationStatusBadge,
  Modal,
  Form,
  FormInput,
  FormButton,
  FormDivider,
  Loader,
  ChartTooltip
} from 'components'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [(Math.floor(Math.random() * 7500) + 750),
        (Math.floor(Math.random() * 7500) + 750), (Math.floor(Math.random() * 7500) + 750), (Math.floor(Math.random() * 7500) + 750), (Math.floor(Math.random() * 7500) + 750), (Math.floor(Math.random() * 7500) + 750), (Math.floor(Math.random() * 7500) + 750)]
    }
  ]
};

@connect((store) => ({
  quotations: store.quotations,
  departments: store.departments
}), (dispatch) => ({
  quotationsAction: bindActionCreators(quotationsActionCreators, dispatch),
  departmentsAction: bindActionCreators(departmentActionCreators, dispatch)
}))
class QuotationContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      badgeOpen: false,
      modalOpen: false,
      chartWidth: 0,
    }

    this.customerId = this.props.match.params.customerId
    this.quotationId = this.props.match.params.quotationId

    this.setQuotationStatus = this.setQuotationStatus.bind(this)
    this.toggleModal        = this.toggleModal.bind(this)
    this.handleSubmit       = this.handleSubmit.bind(this)
    this.departmentRows     = this.departmentRows.bind(this)
    this.goToDepartment     = this.goToDepartment.bind(this)
  }

  componentDidMount() {
    this.props.quotationsAction.fetchAndHandleQuotations(this.customerId)
    this.props.departmentsAction.fetchAndHandleDepartments(this.quotationId)

    console.log(this.refs.chart.chart_instance.ctx)
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  setQuotationStatus(status) {
    this.props.quotationsAction.updateAndHandleQuotationStatus(this.customerId, this.quotationId, status)
  }

  departmentRows() {

    let rows = new Map()

    Object
      .keys(this.props.departments.departments)
      //.sort((a, b) => this.props.quotations.quotations[b].quotationNumber - this.props.quotations.quotations[a].quotationNumber)
      .forEach((department) => {
        const {afdelingnaam, oppervlakte, totaal, totaalpm2} = this.props.departments.departments[department]
        rows.set(
          department,
          {
            afdelingnaam,
            oppervlakte: formatSquareMeters(oppervlakte),
            totaal: formatCurrency(totaal),
            totaalpm2: formatCurrency(totaalpm2),
            PATH: `${this.props.match.url}/${department}`
          }
        )
      })

    return rows
  }

  goToDepartment(row) {
    this.props.history.push(`${row.PATH}`)
  }

  handleSubmit(formValues) {

    const department = {
      ...formValues,
      totaal: 0,
      totaalpm2: 0
    }

    this.props.departmentsAction.saveNewDepartment(this.quotationId, department)
      .then(() => {
        this.form.reset()
        this.toggleModal()
      })
  }

  render() {
    if(!this.props.quotations.isFetching) {

      const quotation = this.props.quotations.quotations[this.quotationId]

      return (
        <div>
          <Modal
            modalOpen={this.state.modalOpen}
            modalClose={() => this.setState({modalOpen: false})}
            modalTitle="Nieuwe afdeling">
            <Form onFormSubmit={this.handleSubmit} formRef={ref => this.form = ref}>
              <FormInput
                type="text"
                label="Afdeling naam"
                name="afdelingnaam"
                placeholder="Afdeling naam"
                validations={['required', 'checkDepartmentName']}/>

              <FormInput
                type="text"
                label="Oppervlakte"
                name="oppervlakte"
                placeholder="Oppervlakte"
                validations={['required', 'number']}/>

              <FormDivider />

							<FormInput
								type="button"
								name="submit"
								buttonText="Maak Afdeling"
								showLoader={false}
								loader={<Loader spinnerText="Afdeling wordt aangemaakt" />} />
            </Form>
          </Modal>
          <BreadCrumbs path={this.props.match} />
          <FlexRow>
            <FlexColumn width="70%">
              <ColumnHeader headerTitle="Afdelingen">
                <a href="#" onClick={this.toggleModal}><i className="material-icons">add</i></a>
              </ColumnHeader>
              <Table
                headerLabels={['Naam', 'Oppervlakte', 'Totaal', 'per m/2']}
                rows={this.departmentRows()}
                noRowsMessage="Er zijn nog geen afdelingen"
                goTo={this.goToDepartment}/>
            </FlexColumn>
            <FlexColumn width="30%">
              <ColumnHeader headerTitle="Overzicht" />
              <QuotationDetail label="Totaal:" input="€ 25.587,78" />
              <QuotationDetail label="Per m2:" input="€ 2.60" />
              <QuotationDetail
                label="status:"
                input={
                  <QuotationStatusBadge
                    dropdown
                    onChange={value => this.setQuotationStatus(value)}
                    open={this.state.badgeOpen}
                    dropdownLabels={['openstaand', 'geaccepteerd', 'geweigerd']}
                    label={quotation.quotationStatus} />
                } />
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <FlexColumn width="100%" height="350">
              <ColumnHeader headerTitle="Facturatie" />
              <Bar
                ref="chart"
                data={data}
                width={100}
                height={100}
                options={{
                  maintainAspectRatio: false,
                  responsive: true
                }}/>
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <FlexColumn>
              <ColumnHeader headerTitle="Producten" />
            </FlexColumn>
          </FlexRow>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}

export default QuotationContainer
