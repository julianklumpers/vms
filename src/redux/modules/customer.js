import {
	fetchCustomers,
	saveCustomer,
	editCustomer
} from 'api/api'

const ADD_NEW_CUSTOMER 						= 'ADD_NEW_CUSTOMER'
const SAVING_NEW_CUSTOMER 				= 'SAVING_NEW_CUSTOMER'

export const savingCustomer = () => {
	return {
		type: SAVING_NEW_CUSTOMER
	}
}

export const addNewCustomer = (customer, date) => {
	return {
		type: ADD_NEW_CUSTOMER,
		customer,
		dateAdded: date
	}
}

// thunks
export const fetchAndHandleSingleCustomer = (customerId) => {
	return (dispatch, getState) => {

	}
}

export const saveNewCustomer = (customer) => {
	return (dispatch, getState) => {
		const userUid = getState().users.authedId
		const date = Date.now()
		return saveCustomer(userUid, customer, date)
	}
}

export const editCustomerDetails = (customer, customerId) => {
	return (dispatch, getState) => {
		const userUid = getState().users.authedId
		const date = Date.now()
		return editCustomer(userUid, customer, customerId, date)
	}
}

export const saveAndAddNewCustomer = (customer) => {
	return (dispatch, getState) => {
		dispatch(savingCustomer())
		const userUid = getState().users.authedId
		const date = Date.now()
		return saveCustomer(userUid, customer, date).customerPromise
			.then(() => {
				dispatch(addNewCustomer(customer, date))
			})
	}
}

const initialState = {
	isFetching: true,
	isSaving: false,
	error: ''
}

export default (state=initialState, action) => {
	switch(action.type) {
		case SAVING_NEW_CUSTOMER:
			return {
				...state,
				isSaving: true
			}
		case ADD_NEW_CUSTOMER:
			return {
				...state,
				isSaving: false,
				customers: {
					...state.customers,
					[action.customer.klantnaam]: action.customer,
				}
			}
		default:
			return state
	}
}
