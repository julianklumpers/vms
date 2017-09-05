import { database, authenticate } from 'config/firebase'
import { getMaxQuotationNumber } from 'helpers/helpers'

/*-------------------------------------------------------------------*
	Customers
*-------------------------------------------------------------------*/

export const fetchCustomers = (uid) => {
	return database.ref(`/customers/${uid}`).once('value')
		.then((snapshot) => snapshot.val() || {})
}

export const customersListener = (uid, cb) => {
	const customersRef = database.ref(`/customers/${uid}`)
	customersRef.on('value', (snapshot) => {
		cb(snapshot.val())
	})
}

export const saveCustomer = (uid, customer, date) => {
	const customerId = customer.klantnaam
	const newCustomer = database.ref(`customers/${uid}/${customerId}`)
	return newCustomer.set({
		...customer,
		customerId,
		dateAdded: date,
	}).then(() => customerId)
}

export const editCustomer = (uid, customer, customerId, date) => {
	const customerRef = database.ref(`customers/${uid}/${customerId}`)
	return customerRef.update({
		...customer,
		dateUpdated: date
	})
}

/*-------------------------------------------------------------------*
	/Customers
	Quotations
*-------------------------------------------------------------------*/

export const fetchQuotations = (uid, customerId) => {
	return database.ref(`quotations/${uid}/${customerId}`).once('value')
		.then((snapshot) => snapshot.val() || {})
}

export const fetchRecentQuotations = (uid) => {
	return database.ref(`recentQuotations/${uid}`).limitToLast(10).once('value')
		.then((snapshot) => snapshot.val() || {})
}

export const saveQuotation = (uid, customerId, quotation, quotationNumber) => {
	const newQuotationRef = database.ref(`quotations/${uid}/${customerId}/${quotationNumber}`)

	const newQuotation = {
		...quotation,
		uid,
		customerId,
		quotationNumber,
		quotationId: quotationNumber
	}

	return newQuotationRef.set({
		...newQuotation
	}).then(() => newQuotation)
}

export const saveRecentQuotation = (uid, customerId, quotationId, quotationStatus) => {
	const recentQuotationsRef = database.ref(`recentQuotations/${uid}/${quotationId}`)

	return recentQuotationsRef.set({
		quotation: quotationId,
		customer: customerId,
		quotationStatus
	})
}

export const getNewQuotationNumber = () => {
	const quotationRef = database.ref('quotations')
	return quotationRef.once('value')
		.then((snapshot) => {
			const quotations = snapshot.val()
			return getMaxQuotationNumber(quotations) + 1
		})
}

/*-------------------------------------------------------------------*
	/Quotations
	Departments
*-------------------------------------------------------------------*/

export const fetchDepartments = (uid, quotationId) => {
	return database.ref(`departments/${uid}/${quotationId}`).once('value')
		.then((snapshot) => snapshot.val() || {})
}

export const saveDepartment = (uid, quotationId, department) => {
	const newDepartmentRef = database.ref(`departments/${uid}/${quotationId}/${department.afdelingnaam}`)

	return newDepartmentRef.set({
		...department
	})
}

/*-------------------------------------------------------------------*
	/Departments
	QuotationStatus
*-------------------------------------------------------------------*/

const changeQuotationStatus = (uid, customerId, quotationId, quotationStatus) => {
	const quotationRef = database.ref(`quotations/${uid}/${customerId}/${quotationId}`)

	return quotationRef.update({
		quotationStatus
	})
}

const changeRecentQuotationStatus = (uid, quotationId, quotationStatus) => {
	const recentQuotationRef = database.ref(`recentQuotations/${uid}/${quotationId}`)

	return recentQuotationRef.update({
		quotationStatus
	})
}

export const updateAllQuotationStatuses = (uid, customerId, quotationId, quotationStatus) => {
	return Promise.all([
		changeQuotationStatus(uid, customerId, quotationId, quotationStatus),
		changeRecentQuotationStatus(uid, quotationId, quotationStatus)
	])
}
