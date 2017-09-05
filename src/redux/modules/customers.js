import { fetchCustomers, customersListener } from 'api/api'

const FETCHING_CUSTOMERS 					= 'FETCHING_CUSTOMERS'
const FETCHING_CUSTOMERS_FAILED 	= 'FETCHING_CUSTOMERS_FAILED'
const FETCHING_CUSTOMERS_SUCCESS 	= 'FETCHING_CUSTOMERS_SUCCESS'

export const fetchingCustomers = () => {
	return {
		type: FETCHING_CUSTOMERS
	}
}

export const fetchingCustomersFailed = (err) => {
	return {
		type: FETCHING_CUSTOMERS_FAILED,
		error: err
	}
}

export const fetchingCustomersSuccess = (customers) => {
	return {
		type: FETCHING_CUSTOMERS_SUCCESS,
		customers
	}
}

// thunks
export const fetchAndHanleUserCustomers = () => {
	return (dispatch, getState) => {
		dispatch(fetchingCustomers())
		const userUid = getState().users.authedId
		fetchCustomers(userUid)
			.then((customers) => {
				dispatch(fetchingCustomersSuccess(customers))
			})
			.catch((error) => {
				console.log(error)
				dispatch(fetchingCustomersFailed('Failed to fetch Customers'))
			})
	}
}

export const setCustomersListener = () => {
	return (dispatch, getState) => {
		dispatch(fetchingCustomers())
		const userUid = getState().users.authedId
		customersListener(userUid, (snapshot) => {
			dispatch(fetchingCustomersSuccess(snapshot))
			console.log('customers changed!')
		})
	}
}

const initialState = {
	isFetching: true,
	error: '',
	customers: []
}

export default (state=initialState, action) => {
	switch(action.type) {
		case FETCHING_CUSTOMERS:
			return {
				...state,
				isFetching: true
			}
		case FETCHING_CUSTOMERS_FAILED:
			return {
				...state,
				isFetching: false,
				error: action.error
			}
		case FETCHING_CUSTOMERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				customers: action.customers
			}
		default:
			return state
	}
}
