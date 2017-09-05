{
	users: {
		isAuthed: false,
		isFetching: true,
		error: '',
		authedId: '213123',
		[uid]: {
			lastUpdated: '21-06-2016 24:17:33 PM'
			info: {
				name,
				email,
				avatarUrl
				uid,
				avatar
			}
		}
	},
	customers: {
		isFetching: true,
		error: '',
		[customerId]: {
			lastUpdated: '21-06-2016 24:17:33 PM'
			info: {
				customerId,
				uid,
				customerNumber,
				customerName,
				customerLocation,
				customerAddress,
				customerZipcode,
				customerPhone,
				customerEmail,
				customerDescription,
				timestamp,
			}
		}
	},
	quotations: {
		isFetching: false,
		error: '',
		[quotationId]: {
			lastUpdated: '21-06-2016 24:17:33 PM'
			info: {
				quotationId
				uid
				customerId
				quotationNumber
				timestamp
			}
		}
	}
	userQuotations: {
		[uid]: {
			lastUpdated: '21-06-2016 24:17:33 PM'
			quotationIds: ['quotationI', 'quotationId', 'quotationId']
		}
	}
	newCustomerModal: {
		isOpen: true,
		customer: {
			name: '',
			address: '',
		}
	},
	listeners: {
		
	}
}