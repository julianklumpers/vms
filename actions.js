actions

{
	type: AUTH_USER,
	uid,
}

{
	type: UNAUTH_USER,
}

{
	type: FETCHING_USER
}

{
	type: FETCHING_USER_FAILED
	error: 'error fetching user'
}

{
	type: FETCHING_USER_SUCCESS
	uid,
	user,
	timestamp
}

customers

{
	type: FETCHING_CUSTOMER
}

{
	type: FETCHING_CUSTOMER_FAILED
	error: 'adasd'
}

{
	type: FETCHING_CUSTOMER_SUCCESS
	customer
}