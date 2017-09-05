import { combineReducers } from 'redux'

import users from 'redux/modules/users'
import customers from 'redux/modules/customers'
import customer from 'redux/modules/customer'
import quotations from 'redux/modules/quotations'
import recentQuotations from 'redux/modules/recentQuotations'
import departments from 'redux/modules/departments'

export default combineReducers({
	users,
	customers,
	customer,
	quotations,
	recentQuotations,
	departments
})
