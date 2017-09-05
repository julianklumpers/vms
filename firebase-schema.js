Keep it Shallow !!!! no deep nested trees
Repeat data is OK

/users
	uid
		name
		email
		avatar
		role
		company

customers
	uid
		customerId
			customerId
			uid
			customerNumber
			customerName
			customerLocation
			customerAddress
			customerZipcode
			customerPhone
			customerEmail
			customerDescription
			timestamp

quotations
	customerId
		quotationId
			quotationId
			uid
			customerId
			quotationNumber
			timestamp
			status


departments
	quotationId
		departmentId
			departmentId
			quotationId
			uid
			surface

producten
	quotationId
		afdelingId
			productNaam
			artikelNummer
			aantal
			prijs

quotation-status
	quotationId
		status
		uid
		timeStamp
